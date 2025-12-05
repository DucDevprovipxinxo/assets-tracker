import { convertIpfs } from "@/app/util/convert";
import { NftCollection } from "@/hooks/interfaces/Nft";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  collections: any;
  filters: any;
  setFilters: (updater: (prev: any) => any) => void;
  walletAddress?: string;
}

export default function CollectionGallery({ collections, filters, setFilters, walletAddress }: Props) {
  const router = useRouter();
  const collectionData = collections?.result || [];
  const currentPage = filters.page || 1;
  const hasNextPage = !!collections?.cursor;
  const hasPrevPage = currentPage > 1;

  const handleCollectionClick = (collectionAddress: string) => {
    // Save wallet address to localStorage for collection detail page
    if (walletAddress) {
      localStorage.setItem('lastWalletAddress', walletAddress);
    }
    router.push(`/collection/${collectionAddress}?wallet=${walletAddress || ''}`);
  };

  return (
    <>
      <h2 className="text-xl font-bold ">Collections</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
        >
        {collectionData && collectionData.length > 0 ? (
          collectionData.map((collection: NftCollection, i: number) => {
            const logo = convertIpfs(collection.collection_logo || '/placeholder.png');
            const floorPrice = collection.floor_price ? parseFloat(collection.floor_price).toFixed(4) : 'N/A';
            const floorPriceUSD = collection.floor_price_usd ? `$${parseFloat(collection.floor_price_usd).toFixed(2)}` : 'N/A';

            return (
              <motion.div
                key={collection.token_address + i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCollectionClick(collection.token_address)}
                className="bg-[#212531] rounded-lg overflow-hidden cursor-pointer border border-gray-700"
              >
                {/* Banner or colored header */}
                <div className="h-24 bg-gradient-to-r from-purple-900/50 to-blue-900/50 relative">
                  {collection.collection_banner_image && (
                    <img
                      src={convertIpfs(collection.collection_banner_image)}
                      alt="banner"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Logo overlay */}
                  <div className="absolute -bottom-8 left-4">
                    <img
                      src={logo}
                      alt={collection.name}
                      className="w-16 h-16 rounded-lg border-4 border-[#181C24] bg-[#212531]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 pt-10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg truncate">{collection.name}</h3>
                      <p className="text-gray-400 text-sm">{collection.symbol}</p>
                    </div>
                    {collection.verified_collection && (
                      <span className="text-blue-500 text-xs">✓</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm mt-4">
                    <div>
                      <p className="text-gray-400 text-xs">Floor Price</p>
                      <p className="font-semibold">
                        {floorPrice} {collection.floor_price_currency?.toUpperCase() || 'ETH'}
                      </p>
                      <p className="text-gray-400 text-xs">{floorPriceUSD}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Type</p>
                      <p className="font-semibold text-xs">{collection.contract_type}</p>
                    </div>
                  </div>

                  {collection.possible_spam && (
                    <div className="mt-3 px-2 py-1 bg-yellow-900/20 border border-yellow-700/50 rounded text-yellow-500 text-xs text-center">
                      ⚠️ Possible Spam
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            No collections found 😭.
          </div>
        )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {(hasPrevPage || hasNextPage) && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setFilters((prev: any) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={!hasPrevPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-300">Page {currentPage}</span>
          <button
            onClick={() => setFilters((prev: any) => ({ ...prev, page: prev.page + 1 }))}
            disabled={!hasNextPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
