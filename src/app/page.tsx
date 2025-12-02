'use client';
import { useState, useEffect } from 'react';
import NFTGallery from '@/components/NFTGallery';
import TokenList from '@/components/TokenList';
import WalletSummary from '@/components/WalletSummary';
import { ChainSelector } from '@/components/ChainSelector';

export default function Home() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    chain: 'eth',
  })

  async function fetchNFTs() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/portfolio?address=${address}&chain=${filters.chain}&page=${filters.page}&limit=${filters.limit}`);
      if (!res.ok) {
        alert("Không lấy được dữ liệu từ API!");
        return;
      }
      const result = await res.json();
      console.log("Fetched result: ", result);
      setData(result);
    } catch (error) {
      alert("Có lỗi xảy ra khi gọi API!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (address && data) {
      fetchNFTs();
    }
  }, [filters.chain]);

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Crypto Portfolio Tracker</h1>

        <div className="flex flex-col gap-4 mb-8 items-center">
          {/* Address input */}
          <div className="flex gap-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-96"
              onKeyDown={(e) => e.key === 'Enter' && fetchNFTs()}
            />
            <button
              onClick={fetchNFTs}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'View'}
            </button>
          </div>

          {/* Chain selector */}
          {
            address && (
              <ChainSelector
                filters={filters}
                setFilters={setFilters}
              />
            )
          }

        </div>

        {data ? (
          <div>
            <WalletSummary address={address} />

            <h2 className="text-xl font-bold mt-8 mb-4">NFTs</h2>
            <NFTGallery nfts={data || []} />

            {/* <h2 className="text-xl font-bold mt-8 mb-4">Tokens</h2>
            <TokenList tokens={data || []} /> */}
          </div>
        ) : (
          <div className="text-center text-gray-400">Enter a wallet address to view portfolio.</div>
        )}
      </div>
    </main>
  );
}
