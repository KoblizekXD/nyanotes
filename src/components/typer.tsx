"use client";

import { type HTMLAttributes, useEffect, useState } from "react";

const TypingEffect = ({
  text,
  speed = 100,
  delay = 1000,
  typingEnd,
  ...other
}: {
  text: string;
  speed?: number;
  delay?: number;
  typingEnd?: () => void;
} & HTMLAttributes<HTMLSpanElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (!isDeleting && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
    if (!isDeleting && index === text.length) {
      setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && index > 0) {

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
      typingEnd?.();
    }
  }, [index, isDeleting, text, speed, delay, typingEnd]);

  return (
    <span {...other}>
      {displayedText}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

export default TypingEffect;