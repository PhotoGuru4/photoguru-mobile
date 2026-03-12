import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';

import { db } from '@lib/firebase';
import {
  Message,
  ConceptMessage,
} from '@features/chat/types/messages';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { PAGE_LIMIT } from '@shared/constants';
import { useConceptChatCardQueries } from '@features/chat/hooks/queries/useConceptChatCardQuery';
import { markMessagesAsRead } from '@features/chat/services/markMessagesAsRead';

export const useChatDetail = (
  roomId: string,
  currentUserId: number,
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [firstUnreadMessageId, setFirstUnreadMessageId] =
    useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(PAGE_LIMIT.DEFAULT),
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        setMessages([]);
        setLastDoc(null);
        setHasMore(false);
        return;
      }

      const docs = snapshot.docs;

      const newMessages = docs.map((doc) => ({
        id: doc.id,
        ...doc.data({
          serverTimestamps: 'estimate',
        }),
      })) as Message[];

      setMessages((prev) => {
        const map = new Map<string, Message>();

        [...prev, ...newMessages].forEach((msg) => {
          map.set(msg.id, msg);
        });

        return Array.from(map.values());
      });

      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGE_LIMIT.DEFAULT);

      const hasNewMessagesFromOthers = newMessages.some(
        (msg) => msg.senderId !== currentUserId && !msg.isRead,
      );

      if (hasNewMessagesFromOthers) {
        await markMessagesAsRead(
          roomId,
          currentUserId,
          newMessages,
        );
      }
    });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      where('isRead', '==', false),
      orderBy('createdAt', 'asc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unreadMessages = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

      const filteredUnread = unreadMessages.filter(
        (msg) => msg.senderId !== currentUserId,
      );

      setUnreadCount(filteredUnread.length);

      const firstUnread = filteredUnread[0];

      setFirstUnreadMessageId(firstUnread?.id ?? null);
    });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  const loadMore = useCallback(async () => {
    if (!roomId || !hasMore || !lastDoc || loadingMore) return;

    setLoadingMore(true);

    try {
      const q = query(
        collection(db, 'chatRooms', roomId, 'messages'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(PAGE_LIMIT.DEFAULT),
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docs = snapshot.docs;

        const olderMessages = docs.map((doc) => ({
          id: doc.id,
          ...doc.data({
            serverTimestamps: 'estimate',
          }),
        })) as Message[];

        setMessages((prev) => {
          const map = new Map<string, Message>();

          [...prev, ...olderMessages].forEach((msg) => {
            map.set(msg.id, msg);
          });

          return Array.from(map.values());
        });

        setLastDoc(docs[docs.length - 1]);
        setHasMore(docs.length === PAGE_LIMIT.DEFAULT);

        const hasUnreadFromOthers = olderMessages.some(
          (msg) => msg.senderId !== currentUserId && !msg.isRead,
        );

        if (hasUnreadFromOthers) {
          await markMessagesAsRead(
            roomId,
            currentUserId,
            olderMessages,
          );
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [roomId, lastDoc, hasMore, loadingMore, currentUserId]);

  const conceptIds = useMemo(() => {
    return Array.from(
      new Set(
        messages
          .filter(
            (m): m is ConceptMessage =>
              m.type === MESSAGE_TYPES.CONCEPT,
          )
          .map((m) => m.conceptId),
      ),
    );
  }, [messages]);

  const conceptQueries = useConceptChatCardQueries(conceptIds);

  const conceptMap = useMemo(() => {
    const map: Record<number, ConceptChatCard | undefined> = {};

    conceptIds.forEach((id, index) => {
      map[id] = conceptQueries[index]?.data;
    });

    return map;
  }, [conceptIds, conceptQueries]);

  return {
    messages,
    conceptMap,
    loadMore,
    loadingMore,
    hasMore,
    firstUnreadMessageId,
    unreadCount,
  };
};
