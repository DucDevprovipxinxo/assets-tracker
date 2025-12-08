'use client';
import { useState, useEffect } from 'react';
import NFTGallery from '@/components/NFTGallery';
import TokenList from '@/components/TokenList';
import WalletSummary from '@/components/WalletSummary';
import { useGetNftCollections } from '@/hooks/actions/useNft';
import CollectionGallery from '@/components/CollectionGallery';
import { Navigation } from '@/components/Navigation';
import { useGetWallet } from '@/hooks/actions/useWallet';

export default function Home() {
  const [address, setAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState(''); // Address to actually search
  const [activeTab, setActiveTab] = useState<'collections' | 'tokens' | 'detail'>('collections');

  const [cursors, setCursors] = useState<{ [key: number]: string }>({}); // Store cursors for each page

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    chain: 'eth',
  })

  // Restore last searched address on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('lastWalletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      setSearchAddress(savedAddress);
    }
  }, []);

  const collectionsQuery = {
    address: searchAddress,
    chain: filters.chain,
    limit: filters.limit,
    cursor: cursors[filters.page - 1] || '',
  }

  // const walletQuery = {
  //   address: searchAddress,
  //   chain: filters.chain,
  // }

  // const { nftsData, nftsLoading } = useGetNfts(query)
  const { collectionsData, collectionsLoading, collectionsError } = useGetNftCollections(collectionsQuery)
  // const { walletData } = useGetWallet(walletQuery)



  // Save cursor when data changes
  useEffect(() => {
    if (collectionsData?.cursor && !cursors[filters.page]) {
      setCursors(prev => ({ ...prev, [filters.page]: collectionsData.cursor }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionsData?.cursor, filters.page]);

  const handleSearch = () => {
    setSearchAddress(address);
    setCursors({}); // Reset cursors
    setFilters(prev => ({ ...prev, page: 1 }));
    // Save to localStorage to persist on refresh
    localStorage.setItem('lastWalletAddress', address);
  };

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Crypto Portfolio Tracker</h1>
        <div className="max-w-[500px] mx-auto flex items-center gap-2">
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
            className="bg-[#212531] cursor-pointer px-[20px] py-[10px] rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            {collectionsLoading ? 'Loading...' : 'View'}
          </button>
        </div>
        {collectionsData ? (
          <div className='grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start'>
            {/* left */}
            <Navigation
              collectionsData={collectionsData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {/* right */}
            <div className='p-4 pt-0 rounded-lg'>
              {collectionsLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                  <p className="text-gray-400 mt-4">Loading collections...</p>
                </div>
              ) : (
                <div>
                  {activeTab === 'collections' && (
                    <div className='mt-4'>
                      <CollectionGallery
                        collections={collectionsData}
                        filters={filters}
                        setFilters={setFilters}
                        walletAddress={searchAddress}
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
                            <p className="font-mono text-sm break-all">{searchAddress}</p>
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
              )}
            </div>
          </div>
        ) : collectionsError ? (
          <div className="mt-5 text-center text-red-500">Error loading portfolio: {collectionsError.message}</div>
        ) : (
          <div className="mt-5 text-center text-gray-400">Enter a wallet address to view portfolio.</div>
        )}
      </div>
    </main>
  );
}
