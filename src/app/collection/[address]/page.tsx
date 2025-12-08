'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NFTGallery from '@/components/NFTGallery';
import { useGetNfts } from '@/hooks/actions/useNft';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collectionAddress = params.address as string;
  const [walletAddress, setWalletAddress] = useState('');
  const [collectionInfo, setCollectionInfo] = useState<any>(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    chain: 'eth',
  });

  const query = {
    address: walletAddress,
    chain: filters.chain,
    limit: filters.limit,
    token_addresses: collectionAddress,
  };

  const { nftsData, nftsLoading } = useGetNfts(query);

  useEffect(() => {
    // Get state from sessionStorage (set during navigation)
    const navState = sessionStorage.getItem('collection_nav_state');

    if (navState) {
      const state = JSON.parse(navState);
      setWalletAddress(state.walletAddress || '');
      if (state.collectionInfo) {
        setCollectionInfo(state.collectionInfo);
      }
    } else {
      const savedAddress = localStorage.getItem('lastWalletAddress');
      if (savedAddress) {
        setWalletAddress(savedAddress);
      }
    }
  }, [collectionAddress]);

  // Calculate stats from NFT data
  const totalNFTs = nftsData?.result?.length || 0;
  const uniqueOwners = collectionInfo?.unique_owners || 5; // Placeholder
  const floorPrice = collectionInfo?.floor_price || '--';

  // Calculate rarity stats
  const rarityStats = nftsData?.result?.reduce((acc: any, nft: any) => {
    const rarity = nft.rarity_label || 'Common';
    acc[rarity] = (acc[rarity] || 0) + 1;
    return acc;
  }, {}) || {};

  const totalForRarity = Object.values(rarityStats).reduce((a, b) => Number(a) + Number(b), 0) || 1;

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-transparent text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Collection Details</h1>
        </div>

        {nftsLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Left Sidebar */}
            <div className="bg-[#212531] rounded-lg p-6 h-fit sticky top-6">
              {/* Collection Logo & Name */}
              <div className="mb-6">
                {collectionInfo?.collection_logo && (
                  <img
                    src={collectionInfo.collection_logo}
                    alt={collectionInfo.name}
                    className="w-24 h-24 rounded-lg mb-4 border-4 border-gray-700"
                  />
                )}
                <h2 className="text-xl font-bold mb-1">{collectionInfo?.name || 'Protocol Guardians'}</h2>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">{collectionInfo?.contract_type || 'ERC721'}</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">Gaming</span>
                </div>
              </div>

              {/* Contract Address */}
              <div className="mb-6">
                <p className="text-gray-400 text-xs mb-1">Contract Address</p>
                <p className="font-mono text-xs break-all text-gray-300">{collectionAddress}</p>
              </div>

              {/* Chain */}
              <div className="mb-6">
                <p className="text-gray-400 text-xs mb-1">Chain</p>
                <p className="text-sm font-semibold">{filters.chain === 'eth' ? 'Ethereum' : filters.chain.toUpperCase()}</p>
              </div>

              {/* Total NFTs */}
              <div className="mb-6">
                <p className="text-gray-400 text-xs mb-1">Total NFTs</p>
                <p className="text-2xl font-bold">{totalNFTs}</p>
              </div>

              {/* Unique Owners */}
              <div className="mb-6">
                <p className="text-gray-400 text-xs mb-1">Unique Owners</p>
                <p className="text-2xl font-bold">{uniqueOwners}</p>
              </div>

              {/* Floor Price */}
              <div className="mb-6">
                <p className="text-gray-400 text-xs mb-1">Floor Price</p>
                <p className="text-xl font-bold">{floorPrice}</p>
              </div>

              {/* Stats - Rarity Distribution */}
              <div>
                <p className="text-gray-400 text-xs mb-3">Stats</p>
                <div className="space-y-2">
                  {Object.entries(rarityStats).map(([rarity, count]) => {
                    const percentage = Math.round((Number(count) / totalForRarity) * 100);
                    return (
                      <div key={rarity} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{rarity}</span>
                        <span className="text-sm font-semibold">{percentage}%</span>
                      </div>
                    );
                  })}
                  {Object.keys(rarityStats).length === 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Rare</span>
                        <span className="text-sm font-semibold">12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Epic</span>
                        <span className="text-sm font-semibold">3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Common</span>
                        <span className="text-sm font-semibold">85%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - NFT Grid */}
            <div>
              {nftsData ? (
                <NFTGallery
                  nfts={nftsData}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No NFTs found in this collection
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
