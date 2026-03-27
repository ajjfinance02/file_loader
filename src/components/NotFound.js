"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="relative max-w-4xl w-full rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-md shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Decorative blob */}
        <svg
          viewBox="0 0 500 500"
          className="absolute -right-36 -top-36 w-96 h-96 opacity-30 pointer-events-none"
          aria-hidden
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#7c3aed" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M421.6,298.3Q391,346,343,372.7Q295,399.3,247,409Q199,418.7,153.4,393Q107.8,367.3,79.1,327.1Q50.3,286.8,60.5,240.2Q70.7,193.7,102.6,157.2Q134.5,120.7,179.6,101.7Q224.8,82.8,271.6,78.6Q318.5,74.3,361.8,93.9Q405,113.6,431.3,150.7Q457.6,187.7,439.1,234.1Q420.6,280.5,421.6,298.3Z"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10">
          {/* Text Section */}
          <motion.section
            className="px-4 md:px-8 py-6 md:py-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
              404
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-prose">
              Oops — we can&apos;t find the page you&apos;re looking for.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition"
              >
                <ArrowLeft size={16} />
                Back home
              </Link>


            </div>
          </motion.section>

          {/* Illustration */}
          <motion.figure
            className="px-4 md:px-8 py-6 md:py-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="w-full max-w-md rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 dark:from-transparent dark:to-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl text-center">
              <svg
                width="220"
                height="160"
                viewBox="0 0 220 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Lost robot illustration"
                className="mx-auto"
              >
                <rect x="0" y="0" width="220" height="160" rx="12" fill="#f8fafc" />
                <g transform="translate(30,18)">
                  <ellipse cx="60" cy="100" rx="50" ry="8" fill="#e6eef8" />
                  <rect x="30" y="10" width="60" height="60" rx="10" fill="#fff" stroke="#e6eef8" />
                  <circle cx="60" cy="35" r="8" fill="#7c3aed" />
                  <rect x="50" y="60" width="20" height="24" rx="6" fill="#7c3aed" />
                  <path
                    d="M10 60 L50 40 L90 60"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <figcaption className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Looks like our little helper lost its way.
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </div>
    </main>
  );
}
