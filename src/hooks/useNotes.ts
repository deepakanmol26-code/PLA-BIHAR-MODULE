"use client";

import { useState, useEffect, useCallback } from 'react';

export interface Note {
  id: string;
  sectionId: string;
  text: string;
  createdAt: string;
}

const NOTES_KEY = 'pla-notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback((sectionId: string, text: string) => {
    const note: Note = {
      id: crypto.randomUUID(),
      sectionId,
      text,
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  const getNotesForSection = useCallback((sectionId: string) => {
    return notes.filter(n => n.sectionId === sectionId);
  }, [notes]);

  return { notes, addNote, deleteNote, getNotesForSection };
}
