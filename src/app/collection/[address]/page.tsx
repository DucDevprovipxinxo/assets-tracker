'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NFTGallery from '@/components/NFTGallery';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collectionAddress = params.address as string;
  const [walletAddress, setWalletAddress] = useState('');
  const [nftsData, setNftsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    chain: 'eth',
  });

  useEffect(() => {
    // Get wallet address from URL query or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const wallet = urlParams.get('wallet') || localStorage.getItem('lastWalletAddress') || '';
    setWalletAddress(wallet);
  }, []);

  useEffect(() => {
    if (!walletAddress || !collectionAddress) return;

    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/nft?address=${walletAddress}&chain=${filters.chain}&limit=${filters.limit}&token_addresses=${collectionAddress}`
        );
        const data = await response.json();
        setNftsData(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress, collectionAddress, filters.chain, filters.limit, filters.page]);

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Collection Details</h1>
        </div>

        <div className="bg-[#212531] p-6 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Collection Address</p>
            <p className="font-mono text-sm">{collectionAddress}</p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading NFTs...</div>
          ) : nftsData ? (
            <>
              <h2 className="text-xl font-bold mb-4">NFTs ({nftsData?.result?.length || 0})</h2>
              <NFTGallery
                nfts={nftsData}
                filters={filters}
                setFilters={setFilters}
              />
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              Enter a wallet address to view collection NFTs
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
