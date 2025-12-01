import TokenList from '@/components/TokenList';
import NFTGallery from '@/components/NFTGallery';
import WalletSummary from '@/components/WalletSummary';

async function getData(address: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/portfolio?address=${address}`, { cache: 'no-store' });
  if (!res.ok) {
    return { tokens: [], nfts: [] };
  }
  return res.json();
}

export default async function PortfolioPage({ params }: any) {
  const resolvedParams = await params;
  const address = resolvedParams.address;
  const data = await getData(address);

  return (
    <main className="p-6">
      <WalletSummary address={address} />
      <h2 className="text-xl font-bold mt-8">Tokens</h2>
      <TokenList tokens={data.tokens} />
      <h2 className="text-xl font-bold mt-8">NFTs</h2>
      <NFTGallery nfts={data.nfts} />
    </main>
  );
}
