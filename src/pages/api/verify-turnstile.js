export const runtime = 'edge'
import { NextResponse } from "next/server";

export default async function POST(request) {
  console.log("API route hit!"); // Add this debug line
  try {


    const { token } = await request.json();

    console.log('token: ', token)

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);

    // Optional: Add the visitor's IP address for stricter verification
    console.log('ip:',request.headers.get("x-forwarded-for"))
    const ip = request.headers["x-forwarded-for"] ||
               request.headers["x-real-ip"];

    console.log('ip: ', ip)
    if (ip) {
      formData.append("remoteip", ip);
      // Use "relaxed" leniency to handle IPv4/IPv6 mismatches
      formData.append("remoteip_leniency", "relaxed");
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await verifyResponse.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Turnstile verification failed:", data["error-codes"]);
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}