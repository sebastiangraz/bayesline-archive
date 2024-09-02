import { useState, useEffect } from 'react';

const getRandomChar = () => {
  const chars = 'XxYyZzR0@#$%&/[*&^{};:?||||~';
  return chars[Math.floor(Math.random() * chars.length)];
};
export const ScrambleText = ({ inputText, inView = true }: { inputText: string; inView?: boolean }) => {
  const initialText = inputText.split('');
  const fullLength = initialText.length;
  const skipLength = fullLength / 2.5;
  const text = initialText.map((char, index) => ({
    char,
    key: `${char}-${index}`,
    isScrambled: index < skipLength
  }));

  const [chars, setChars] = useState<Array<{ char: string; key: string; isScrambled: boolean }>>([...text]);

  // Handle the scrambling effect
  useEffect(() => {
    if (!inView) return;

    // Only start scrambling from the 8th character onwards
    const scrambleTimeouts = chars.map((_, index) => {
      if (index < skipLength) return null; // Skip scrambling for the first X characters

      return setTimeout(() => {
        const scrambleChar = (idx: number, count: number = 0) => {
          if (count >= 3) {
            // Scramble each character 3 times
            setChars((currentChars) =>
              currentChars.map((item, i) =>
                i === idx ? { ...item, char: inputText.charAt(idx), isScrambled: true } : item
              )
            );
            return;
          }

          // Set a random character
          setChars((currentChars) =>
            currentChars.map((item, i) => (i === idx ? { ...item, char: getRandomChar() } : item))
          );

          // Recursive call to continue scrambling
          setTimeout(() => scrambleChar(idx, count + 1), 80);
        };

        // Start scrambling this character
        scrambleChar(index);
      }, Math.random() * 450);
    });

    // Clean up timeouts on component unmount or dependency change
    return () => {
      scrambleTimeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [chars.length, inputText, inView]);

  return (
    <span>
      {chars.map((item) => (
        <span
          key={item.key}
          className="char"
          style={{ transition: '0.48s ease opacity', opacity: item.isScrambled ? 1 : 0.56 }}
        >
          {item.char}
        </span>
      ))}
    </span>
  );
};
