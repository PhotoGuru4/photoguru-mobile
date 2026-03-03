import { useEffect, useState, useMemo, useCallback } from 'react';
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
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Message } from '@features/chat/types/messages';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { useConceptChatCardQuery } from './queries/useConceptChatCardQuery';
import { PAGE_LIMIT } from '@shared/constants';

export const useChatDetail = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(PAGE_LIMIT.DEFAULT),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setMessages([]);
        return;
      }

      const docs = snapshot.docs;

      const data = docs.map((doc) => {
        const raw = doc.data({
          serverTimestamps: 'estimate',
        });

        return {
          id: doc.id,
          ...raw,
        };
      }) as Message[];

      setMessages(data);
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGE_LIMIT.DEFAULT);
    });

    return () => unsubscribe();
  }, [roomId]);

  const loadMore = useCallback(async () => {
    if (!hasMore || !lastDoc || loadingMore) return;

    setLoadingMore(true);

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(PAGE_LIMIT.DEFAULT),
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docs = snapshot.docs;

      const olderMessages = docs.map((doc) => {
        const raw = doc.data({
          serverTimestamps: 'estimate',
        });

        return {
          id: doc.id,
          ...raw,
        };
      }) as Message[];

      setMessages((prev) => [...prev, ...olderMessages]);
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGE_LIMIT.DEFAULT);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [roomId, lastDoc, hasMore, loadingMore]);

  const conceptId = useMemo(() => {
    const conceptMessage = messages.find(
      (m) => m.type === MESSAGE_TYPES.CONCEPT,
    );

    return conceptMessage?.conceptId;
  }, [messages]);

  const { data: conceptData } =
    useConceptChatCardQuery(conceptId);

  return {
    messages,
    conceptData,
    loadMore,
    loadingMore,
    hasMore,
  };
};
