import { convertIpfs } from "@/app/util/convert";
import { NFT } from "@/hooks/interfaces/Nft";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

interface Props {
  nfts: any,
  filters: any,
  setFilters: (updater: (prev: any) => any) => void,
}

export default function NFTGallery({ nfts, filters, setFilters }: Props) {
  const router = useRouter();
  const nftData = nfts.result
  const currentPage = filters.page || 1;
  const hasNextPage = !!nfts.cursor; // If there's a cursor, there's a next page
  const hasPrevPage = currentPage > 1;

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-transparent text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Collection Details</h1>
        </div>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 mt-4 justify-between gap-4"
        >
          {nftData && nftData.length > 0 ? nftData.map((nft: NFT, i: number) => {

            const metadata = nft.normalized_metadata || {};
            const image = metadata?.image || nft.collection_logo || '/placeholder.png';
            const name = metadata?.name || nft.name || 'Unknown NFT';
            const tokenId = nft.token_id || '--';
            const lastSale = nft.last_sale?.price
              ? `${parseFloat(nft.last_sale.price).toFixed(4)} ${nft.last_sale.token_symbol || 'ETH'}`
              : '--';
            const lastSaleDate = nft.last_sale?.timestamp
              ? new Date(nft.last_sale.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '';

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer bg-[#212531] rounded-lg overflow-hidden border border-gray-700"
                key={nft.token_id + i}
              >
                {/* NFT Image */}
                <div className="relative aspect-square bg-gray-800">
                  <img
                    src={convertIpfs(image)}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NFT Info */}
                <div className="p-3">
                  {/* NFT Name */}
                  <h3 className="font-bold text-sm mb-2 truncate">{name}</h3>

                  {/* Token ID Row */}
                  <div className="text-xs mb-2">
                    <p className="text-gray-400">Token ID</p>
                    <p className="text-white truncate">{tokenId.length > 20 ? `${tokenId.slice(0, 20)}...` : tokenId}</p>
                  </div>

                  {/* Last Sale Row */}
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-700">
                    <div>
                      <p className="text-gray-400">Last Sale</p>
                      <p className="text-white">{lastSale}</p>
                    </div>
                    {lastSaleDate && (
                      <p className="text-gray-400">{lastSaleDate}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          }) : <div className="text-center">No NFTs found.</div>}
        </motion.div>
      </AnimatePresence>
      {
        (hasPrevPage || hasNextPage) && (
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={!hasPrevPage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-300">Page {currentPage}</span>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={!hasNextPage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )
      }
    </>
  );
}
