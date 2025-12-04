import { convertIpfs } from "@/app/util/convert";
import { NFT } from "@/app/hooks/interface/Nft";

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
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 justify-between gap-4">
        {nftData && nftData.length > 0 ? nftData.map((nft: NFT, i: number) => {

          const metadata = nft.normalized_metadata || {};
          const image = metadata.image || nft.metadata?.image || nft.collection_logo || '/placeholder.png';
          const name = metadata.name || nft.name || 'Unknown NFT';

          return (
            <div
              className="hover:scale-105 transition-transform duration-300 cursor-pointer"
              key={nft.token_id + i}
            >
              <img src={convertIpfs(image)} alt="nft-img" className="rounded mb-2 w-[120px] h-[120px]" />
              <div className="inline">{name}</div>
            </div>
          );
        }) : <div>Không có NFT nào được tìm thấy.</div>}
      </div>
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
