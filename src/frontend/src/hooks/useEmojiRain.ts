import { useState, useEffect, useCallback } from 'react';

interface EmojiItem {
  id: number;
  emoji: string;
  left: string;
  size: string;
  duration: string;
  onRemove: () => void;
}

const EMOJIS = ['🌹', '🌸', '💗', '💞', '🌷', '✨', '🤍'];

export function useEmojiRain() {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [nextId, setNextId] = useState(0);

  const createEmoji = useCallback(() => {
    const id = Date.now() + Math.random();
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const left = `${Math.random() * 100}vw`;
    const size = `${16 + Math.random() * 30}px`;
    const duration = `${4 + Math.random() * 5}s`;

    const newEmoji: EmojiItem = {
      id,
      emoji,
      left,
      size,
      duration,
      onRemove: () => {
        setEmojis((prev) => prev.filter((e) => e.id !== id));
      },
    };

    setEmojis((prev) => [...prev, newEmoji]);
  }, []);

  const burst = useCallback(
    (count: number) => {
      for (let i = 0; i < count; i++) {
        setTimeout(createEmoji, i * 30);
      }
    },
    [createEmoji]
  );

  const handleClick = useCallback(
    (count: number) => {
      burst(count);
    },
    [burst]
  );

  // Initial burst on mount
  useEffect(() => {
    burst(120);
  }, [burst]);

  // Continuous emoji spawn
  useEffect(() => {
    const interval = setInterval(createEmoji, 120);
    return () => clearInterval(interval);
  }, [createEmoji]);

  return { emojis, handleClick };
}
