"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MatrixTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function MatrixText({ text, delay = 0, className = "", style }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(
    Array(text.length).fill(" ").join("")
  );

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Controls speed of reveal
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
    >
      {displayText}
    </motion.span>
  );
}
