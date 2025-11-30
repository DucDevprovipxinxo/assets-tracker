import TokenList from '@/components/TokenList';
import NFTGallery from '@/components/NFTGallery';
import WalletSummary from '@/components/WalletSummary';

async function getData(address: any) {
  const res = await fetch(`/api/portfolio?address=${address}`, { cache: 'no-store' });
  return res.json();
}

export default async function PortfolioPage({ params }: any) {
  const { address } = params;
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
