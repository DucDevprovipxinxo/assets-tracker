'use client';
import { useEffect, useState } from 'react';
import NFTGallery from '@/components/NFTGallery';
import TokenList from '@/components/TokenList';
import WalletSummary from '@/components/WalletSummary';

export default function Home() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  async function fetchNFTs() {
    if (!address) {
      alert("Vui lòng nhập địa chỉ ví!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/portfolio?address=${address}`);
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
    if(!data) return;
    console.log("Fetched data: ", data);
  }, [data])

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Crypto Portfolio Tracker</h1>

        <div className="flex gap-2 mb-8 justify-center">
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
