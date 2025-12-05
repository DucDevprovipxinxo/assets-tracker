import { convertIpfs } from "@/app/util/convert";
import { NFT } from "@/hooks/interfaces/Nft";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  nfts: any,
  filters: any,
  setFilters: (updater: (prev: any) => any) => void,
}

export default function NFTGallery({ nfts, filters, setFilters }: Props) {
  const nftData = nfts.result
  const currentPage = filters.page || 1;
  const hasNextPage = !!nfts.cursor; // If there's a cursor, there's a next page
  const hasPrevPage = currentPage > 1;

  return (
    <>
      <AnimatePresence mode="wait">
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

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              key={nft.token_id + i}
            >
              <img src={convertIpfs(image)} alt="nft-img" className="rounded mb-2 w-[120px] h-[120px]" />
              <div className="inline">{name}</div>
            </motion.div>
          );
        }) : <div>Không có NFT nào được tìm thấy.</div>}
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
