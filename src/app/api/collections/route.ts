import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain") || "eth";
  const cursor = searchParams.get("cursor");
  const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
  const limit = searchParams.get("limit") || "10";

  let url = `https://deep-index.moralis.io/api/v2.2/${address}/nft/collections?chain=${chain}&limit=${limit}`;
  
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

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
  return NextResponse.json(data);
}
