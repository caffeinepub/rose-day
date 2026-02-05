import { useEffect, useState } from 'react';
import { useEmojiRain } from './hooks/useEmojiRain';
import { Button } from '@/components/ui/button';

export default function App() {
  const { emojis, handleClick } = useEmojiRain();
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  useEffect(() => {
    document.title = 'Rose Day';
  }, []);

  const toggleSpecialMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSpecialMessage(!showSpecialMessage);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" onClick={() => handleClick(60)}>
      {/* Falling emoji rain */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="rain"
          style={{
            left: emoji.left,
            fontSize: emoji.size,
            animationDuration: emoji.duration,
          }}
          onAnimationEnd={() => emoji.onRemove()}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* Hero rose emoji */}
      <div className="hero">🌹</div>

      {/* Main card */}
      <div className="card">
        <h1 className="text-[#ff4d6d] text-3xl font-semibold mb-6">
          🌹 Happy Rose Day, baby
        </h1>

        <p className="text-[17px] leading-[2.2] text-[#555] italic">
          "Some flowers are given because they're beautiful.
          <br />
          Some are given because they mean something.
          <br />
          <br />
          You were never just a passing season in my life.
          <br />
          You were something that grew slowly and quietly inside my heart.
          <br />
          <br />
          The way we laughed.
          <br />
          The way we understood each other without explaining.
          <br />
          The way ordinary days felt softer together.
          <br />
          <br />
          Some feelings don't disappear.
          <br />
          They simply settle deeper. 🤍"
        </p>

        <div className="signature">
          Yours,
          <br />
          Baby 🤍
        </div>

        {/* Toggle button for special message */}
        <div className="mt-6">
          <Button
            onClick={toggleSpecialMessage}
            variant="outline"
            className="bg-[#ff4d6d] text-white hover:bg-[#ff3355] hover:text-white border-[#ff4d6d] transition-all duration-300"
          >
            {showSpecialMessage ? '✨ Hide special message' : '💝 Show a special message'}
          </Button>
        </div>

        {/* Special message section */}
        {showSpecialMessage && (
          <div className="special-message">
            <p className="text-[16px] leading-[2] text-[#ff4d6d] italic font-medium">
              Every rose has its own story,
              <br />
              but this one is ours.
              <br />
              <br />
              Through every season, every moment,
              <br />
              my heart chose you.
              <br />
              <br />
              And it always will. 🌹💕
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
