import './globals.css';
import { Inter } from "next/font/google";
import AppProvider from '@/providers/AppProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFT & Token Tracker",
  description: "Track your crypto assets easily.",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`bg-gray-950 text-white ${inter.className}`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
