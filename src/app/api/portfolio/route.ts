import { NextResponse } from 'next/server';

export async function GET(req) {
  const address = req.nextUrl.searchParams.get('address');

  const tokens = [
    { chain: 'eth', symbol: 'ETH', balance: '1.23' },
    { chain: 'bsc', symbol: 'BNB', balance: '5.00' }
  ];

  const nfts = [
    { chain: 'eth', name: 'Demo NFT', image: 'https://via.placeholder.com/200' },
    { chain: 'polygon', name: 'Sample NFT', image: 'https://via.placeholder.com/200' }
  ];

  return NextResponse.json({ tokens, nfts });
}
