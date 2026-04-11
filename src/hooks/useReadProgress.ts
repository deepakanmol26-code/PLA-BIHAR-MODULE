"use client";

import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'pla-read-progress';

export function useReadProgress() {
  const [readSections, setReadSections] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        setReadSections(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(readSections));
    }
  }, [readSections, isMounted]);

  const markAsRead = useCallback((id: string) => {
    setReadSections(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const isRead = useCallback((id: string) => readSections.includes(id), [readSections]);

  return { readSections, markAsRead, isRead };
}
