'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressInput() {
  const [address, setAddress] = useState('');
  const router = useRouter();

  async function fetchNFTs(address: string) {
    if (!address) {
      alert("Vui lòng nhập địa chỉ ví!");
      return;
    }
    try {
      const res = await fetch(`/api/portfolio?address=${address}`);
      if (!res.ok) {
        alert("Không lấy được dữ liệu từ API!");
        return;
      }
      const data = await res.json();
      // Xử lý data ở đây
      console.log(data);
      router.push(`/portfolio/${address}`);
    } catch (error) {
      alert("Có lỗi xảy ra khi gọi API!");
      console.error(error);
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address"
        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
      />
      <button
        onClick={() => fetchNFTs(address)}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        View
      </button>
    </div>
  );
}
