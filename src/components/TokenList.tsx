export default function TokenList({ tokens }) {
  return (
    <div className="grid gap-3 mt-4">
      {tokens.map((t, i) => (
        <div key={i} className="p-3 bg-gray-800 rounded">
          <div className="font-bold">{t.symbol}</div>
          <div>Balance: {t.balance}</div>
          <div>Chain: {t.chain}</div>
        </div>
      ))}
    </div>
  );
}
