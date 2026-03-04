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

export const useChatDetail = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      setLastDoc(null);
      setHasMore(true);
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
        setLastDoc(null);
        setHasMore(false);
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
        } as Message;
      });

      setMessages(data);
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGE_LIMIT.DEFAULT);
    });

    return () => unsubscribe();
  }, [roomId]);

  const loadMore = useCallback(async () => {
    if (!roomId || !hasMore || !lastDoc || loadingMore) return;

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
        } as Message;
      });

      setMessages((prev) => [...prev, ...olderMessages]);
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGE_LIMIT.DEFAULT);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [roomId, lastDoc, hasMore, loadingMore]);

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

  const conceptQueries =
    useConceptChatCardQueries(conceptIds);

  const conceptMap = useMemo(() => {
    const map: Record<
      number,
      ConceptChatCard | undefined
    > = {};

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
  };
};
