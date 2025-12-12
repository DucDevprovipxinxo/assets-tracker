'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetNftCollections } from '@/hooks/actions/useNft';
import CollectionGallery from '@/components/CollectionGallery';
import { Navigation } from '@/components/Navigation';

export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const walletAddress = params.address as string;

  const [address, setAddress] = useState(walletAddress);
  const [activeTab, setActiveTab] = useState<'collections' | 'tokens' | 'detail'>('collections');
  const [cursors, setCursors] = useState<{ [key: number]: string }>({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    chain: 'eth',
  });

  const collectionsQuery = {
    address: walletAddress,
    chain: filters.chain,
    limit: filters.limit,
    cursor: cursors[filters.page - 1] || '',
  };

  const { collectionsData, collectionsLoading } = useGetNftCollections(collectionsQuery);

  // Save cursor when data changes
  useEffect(() => {
    if (collectionsData?.cursor && !cursors[filters.page]) {
      setCursors(prev => ({ ...prev, [filters.page]: collectionsData.cursor }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionsData?.cursor, filters.page]);

  const handleSearch = () => {
    if (address.trim() && address !== walletAddress) {
      sessionStorage.setItem('lastWalletAddress', address);
      router.push(`/portfolio/${address}`);
    }
  };

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Search bar */}
        <div className="max-w-[500px] mx-auto flex items-center gap-2 mb-6">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Enter wallet address"
            className="px-3 py-2 rounded bg-[#181C24] border border-gray-700 w-full"
          />
          <button
            onClick={handleSearch}
            disabled={collectionsLoading}
            className="bg-linear-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all whitespace-nowrap"
          >
            {collectionsLoading ? 'Loading...' : 'View'}
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 items-start'>
          <Navigation
            collectionsData={collectionsData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {
            collectionsData ? (
              <div className='p-4 pt-0 rounded-lg'>
                {activeTab === 'collections' && (
                  <div className='mt-4'>
                    <CollectionGallery
                      collections={collectionsData}
                      filters={filters}
                      setFilters={setFilters}
                      walletAddress={walletAddress}
                    />
                  </div>
                )}

                {activeTab === 'tokens' && (
                  <div className='mt-4'>
                    <h2 className="text-xl font-bold mb-4">Tokens</h2>
                    <div className="text-gray-400 text-center py-20">
                      Token list coming soon...
                    </div>
                  </div>
                )}

                {activeTab === 'detail' && (
                  <div className='mt-4'>
                    <h2 className="text-xl font-bold mb-4">Wallet Details</h2>
                    <div className="bg-[#212531] p-6 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">Wallet Address</p>
                          <p className="font-mono text-sm break-all">{walletAddress}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Chain</p>
                          <p className="text-sm">{filters.chain.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Collections</p>
                          <p className="text-2xl font-bold">{collectionsData?.total || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="col-span-full text-center text-gray-400 py-20">
                {collectionsLoading ? 'Loading portfolio...' : 'No collections found. 😭'}
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
