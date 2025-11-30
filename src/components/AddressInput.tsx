'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressInput() {
  const [address, setAddress] = useState('');
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address"
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
      />
      <button
        onClick={() => router.push(`/portfolio/${address}`)}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        View
      </button>
    </div>
  );
}
