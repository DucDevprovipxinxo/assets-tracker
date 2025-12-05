'use client';
import { useState, useEffect } from 'react';
import NFTGallery from '@/components/NFTGallery';
import TokenList from '@/components/TokenList';
import WalletSummary from '@/components/WalletSummary';
import { ChainSelector } from '@/components/ChainSelector';
import { useGetNftCollections, useGetNfts } from '@/hooks/actions/useNft';
import CollectionGallery from '@/components/CollectionGallery';

export default function Home() {
  const [address, setAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState(''); // Address to actually search

  const [cursors, setCursors] = useState<{ [key: number]: string }>({}); // Store cursors for each page

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    chain: 'eth',
  })

  const query = {
    address: searchAddress,
    chain: filters.chain,
    limit: filters.limit,
    cursor: cursors[filters.page - 1] || '',
  }

  // const { nftsData, nftsLoading } = useGetNfts(query)
  const { collectionsData, collectionsLoading, collectionsError } = useGetNftCollections(query)

  const handleSearch = () => {
    setSearchAddress(address);
    setCursors({}); // Reset cursors
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  // Save cursor when data changes
  useEffect(() => {
    if (collectionsData?.cursor && !cursors[filters.page]) {
      setCursors(prev => ({ ...prev, [filters.page]: collectionsData.cursor }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionsData?.cursor, filters.page]);

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Crypto Portfolio Tracker</h1>
        <div className='grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start'>
          {/* left */}
          <div className='bg-[#212531] p-4 rounded-lg flex flex-col gap-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]'>
            <div className="flex items-center gap-2">
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
                className="cursor-pointer px-[5px] py-0.5 rounded-xl text-sm bg-[#181C24] disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                {collectionsLoading ? 'Loading...' : 'View'}
              </button>
            </div>
            <div>
              <div className="text-gray-400 text-sm">NFTs</div>
              <div className="text-2xl font-bold">{collectionsData?.result?.length || 0} NFTs</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Tokens</div>
              <div className="text-2xl font-bold">$2,345</div>
            </div>
          </div>
          {/* right */}
          <div className='p-4 pt-0 rounded-lg'>
            {collectionsLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 mt-4">Loading collections...</p>
              </div>
            ) : collectionsData ? (
              <div>
                {/* <WalletSummary address={address} /> */}
                <CollectionGallery
                  collections={collectionsData}
                  filters={filters}
                  setFilters={setFilters}
                  walletAddress={searchAddress}
                />
                {/* <NFTGallery
                  nfts={nftsData || []}
                  filters={filters}
                  setFilters={setFilters}
                /> */}
              </div>
            ) : (
              collectionsError ? (
                <div className="text-center text-red-500">Error loading portfolio: {collectionsError.message}</div>
              ) :
              <div className="text-center text-gray-400">Enter a wallet address to view portfolio.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
