export default function NFTGallery({ nfts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {nfts.map((nft, i) => (
        <div key={i} className="bg-gray-800 p-2 rounded">
          <img src={nft.image} className="rounded mb-2" />
          <div className="text-sm">{nft.name}</div>
          <div className="text-xs text-gray-400">{nft.chain}</div>
        </div>
      ))}
    </div>
  );
}
