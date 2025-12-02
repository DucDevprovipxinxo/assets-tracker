import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain") || "eth";
  const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
  const limit = searchParams.get("limit") || "10";

  const res = await fetch(
    `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&limit=${limit}`,
    {
      headers: {
        "X-API-Key": MORALIS_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from Moralis" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
