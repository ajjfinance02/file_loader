"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function File({redirect}) {
  const textRounds = [
    ["Initializing security protocols...", "Checking System Integrity...", "Verifying network security..."],
    ["Analyzing connection...", "Scanning for malware...", "Finalizing Security Checks..."],
    ["All security checks passed...", "System secure...", "Ready for access"],
  ];

  const [displayedTexts, setDisplayedTexts] = useState(["", "", ""]);
  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [heading, setHeading] = useState("Security Scan in Progress");
  const [subText, setSubText] = useState("Scanning for threats and verifying your connection.");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const speed = 10;

    const revealText = async (text, index) => {
      let display = "";
      for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < 3; j++) {
          display = text
            .split("")
            .map((_, k) => (k <= i ? text[k] : chars[Math.floor(Math.random() * chars.length)]))
            .join("");
          setDisplayedTexts((prev) => {
            const copy = [...prev];
            copy[index] = display;
            return copy;
          });
          await new Promise((r) => setTimeout(r, speed));
        }
      }
      setDisplayedTexts((prev) => {
        const copy = [...prev];
        copy[index] = text;
        return copy;
      });
    };

    (async () => {
      for (let round = 0; round < textRounds.length; round++) {
        const currentSet = textRounds[round];
        for (let i = 0; i < currentSet.length; i++) {
          await revealText(currentSet[i], i);
          await new Promise((r) => setTimeout(r, 400));
        }

        if (round < textRounds.length - 1) {
          await new Promise((r) => setTimeout(r, 800));
          setDisplayedTexts(["", "", ""]);
        }
      }

      await new Promise((r) => setTimeout(r, 600));

      // Fade out loader
      setShowLoader(false);

      // Change heading + paragraph
      setHeading("Security Scan Complete");
      setSubText("Your Connection is Secured and Verified");

      await new Promise((r) => setTimeout(r, 800));
      setShowButton(true);
    })();
  }, []);

  const move = () => {

    window.location = redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20">

        {/* Loader (visible until scan complete) */}
        {showLoader && (
          <motion.div
            className="flex justify-center items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Heading */}
        <motion.h2
          key={heading}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-2"
        >
          {heading}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          key={subText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white/80 text-sm md:text-base mb-6"
        >
          {subText}
        </motion.p>

        {/* Animated lines */}
        <div className="text-sm md:text-sm text-white mb-6 space-y-3 flex flex-col justify-center min-h-[110px]">
          {displayedTexts.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: text ? 1 : 0, y: text ? 0 : 10 }}
              transition={{ duration: 0.4 }}
              className="tracking-wide font-mono"
            >
              {"> " + text}
            </motion.div>
          ))}
        </div>

        {/* Continue button */}
        {showButton && (
          <motion.button
            onClick={move}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 bg-blue-500/30 hover:bg-blue-500/50 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            ACCESS YOUR FILE
          </motion.button>
        )}
      </div>
    </div>
  );
}
