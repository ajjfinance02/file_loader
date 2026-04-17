"use client";

import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function PageProtection({ children, onVerified }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check if user was previously verified (session persistence)
  useEffect(() => {
    const wasVerified = sessionStorage.getItem("turnstile_verified");
    if (wasVerified === "true") {
      setIsVerified(true);
      onVerified?.();
    }
  }, [onVerified]);

  const handleSuccess = async (token) => {
    setIsVerifying(true);

    try {
      // Send token to your backend for verification
      const response = await fetch(`/api/verify-turnstile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        // Store verification in session storage to remember for this session
        sessionStorage.setItem("turnstile_verified", "true");
        setIsVerified(true);
        onVerified?.();
      } else {
        console.error("Verification failed on server");
        // Optionally reset the widget on failure
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleError = () => {
    console.error("Turnstile challenge failed");
    setIsVerifying(false);
  };

  const handleExpire = () => {
    // Token expired - user would need to verify again
    sessionStorage.removeItem("turnstile_verified");
    setIsVerified(false);
  };

  // If verified, show the actual page content
  if (isVerified) {
    return <>{children}</>;
  }

  // console.log('key: ',process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

  // Otherwise, show the protection gate
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Verifying you are human</h1>
        <p className="text-gray-600 text-sm dark:text-gray-400 mb-6">
          This site uses Cloudflare Turnstile to protect against bots. Please complete the verification below.
        </p>
        <div className="flex justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={handleSuccess}
            onError={handleError}
            onExpire={handleExpire}
            options={{
              theme: "auto", // auto, light, or dark
              size: "normal", // normal, compact, or invisible
              appearance: "interaction-only"
            }}
          />
        </div>
        {isVerifying && (
          <p className="mt-4 text-sm text-gray-500">Verifying...</p>
        )}
      </div>
    </div>
  );
}