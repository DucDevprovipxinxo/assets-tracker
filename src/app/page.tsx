'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (address.trim()) {
      sessionStorage.setItem('lastWalletAddress', address);
      router.push(`/portfolio/${address}`);
    }
  };

  return (
    <main className="bg-[#181C24] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 mt-12">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Track Your Crypto Portfolio
          </h1>
          <p className="text-gray-400 text-lg">
            Monitor your NFT collections and digital assets in one place
          </p>
        </div>

        {/* Search Input */}
        <div className="text-center mb-12">
          <div className="max-w-[600px] mx-auto flex items-center gap-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Enter wallet address (0x...)"
              className="px-4 py-3 rounded-lg bg-[#212531] border border-gray-700 w-full text-sm focus:border-purple-500 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={!address.trim()}
              className="bg-linear-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 cursor-pointer px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all whitespace-nowrap shadow-lg shadow-purple-500/30"
            >
              Track Portfolio
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#212531] p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="text-xl font-bold mb-2">NFT Collections</h3>
            <p className="text-gray-400 text-sm">
              View all your NFT collections with floor prices, verified status, and detailed metadata
            </p>
          </div>

          <div className="bg-[#212531] p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">⛓️</div>
            <h3 className="text-xl font-bold mb-2">Multi-Chain Support</h3>
            <p className="text-gray-400 text-sm">
              Track assets across Ethereum, Polygon, BSC, and other major blockchain networks
            </p>
          </div>

          <div className="bg-[#212531] p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Portfolio Analytics</h3>
            <p className="text-gray-400 text-sm">
              Get insights into your holdings with real-time pricing and transaction history
            </p>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-[#212531] p-8 rounded-lg border border-gray-700 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">How to Get Started</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Enter Wallet Address</h4>
                <p className="text-gray-400 text-sm">Paste any Ethereum wallet address in the search box above</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 text-purple-400 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Browse Collections</h4>
                <p className="text-gray-400 text-sm">Explore all NFT collections associated with the wallet</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-pink-500/20 text-pink-400 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">View Details</h4>
                <p className="text-gray-400 text-sm">Click on any collection to see individual NFTs and their details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Example Address */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">Try with an example address:</p>
          <button
            onClick={() => {
              const exampleAddress = '0xb8898bb87b07bac7ba9c2268e6d0640d5a208a7a';
              setAddress(exampleAddress);
              sessionStorage.setItem('lastWalletAddress', exampleAddress);
              router.push(`/portfolio/${exampleAddress}`);
            }}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-mono transition-colors border border-gray-700"
          >
            0xb889...08a7a
          </button>
        </div>
      </div>
    </main>
  );
}
