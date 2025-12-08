import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain") || "eth";
  const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

  const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/stats?chain=${chain}`;

  const res = await fetch(url, {
    headers: {
      "X-API-Key": MORALIS_API_KEY!,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from Moralis" },
      { status: res.status }
    );
  }
  const data = await res.json();

  console.log("Wallet stats data:", data);

  return NextResponse.json(data);
}
