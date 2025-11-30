export default function WalletSummary({ address }) {
  return (
    <div className="p-4 bg-gray-900 rounded">
      <h2 className="text-lg font-bold">Wallet</h2>
      <div className="text-gray-400">{address}</div>
    </div>
  );
}
