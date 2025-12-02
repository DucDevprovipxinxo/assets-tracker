import { convertIpfs } from "@/app/util/convert";

export default function NFTGallery({ nfts }) {
  const nftData = nfts.result

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-4 justify-between gap-4">

      {nftData && nftData.map((nft, i) => {
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
      })}
    </div>
  );
}
