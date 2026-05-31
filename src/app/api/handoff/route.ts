import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const velomedApiUrl = process.env.VELOMED_API_URL;
    const velomedApiKey = process.env.VELOMED_API_KEY;

    if (!velomedApiUrl || !velomedApiKey) {
      // If VeloMED API isn't configured yet, return a mock token for development
      return NextResponse.json({
        token: `demo-${crypto.randomUUID()}`,
        message: "Demo mode — VeloMED API not configured",
      });
    }

    const res = await fetch(`${velomedApiUrl}/api/v1/handoff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": velomedApiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`VeloMED API error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Handoff error:", err);
    return NextResponse.json(
      { error: "Failed to create handoff token" },
      { status: 500 }
    );
  }
}
