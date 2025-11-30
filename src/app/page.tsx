import AddressInput from '@/components/AddressInput';

export default function Home() {
  return (
    <main className="bg-[#181C24] flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Crypto Portfolio Tracker</h1>
      <AddressInput />
    </main>
  );
}
