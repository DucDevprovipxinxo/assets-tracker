export const convertIpfs = (url: string) => {
  if (!url) return "/placeholder.png";
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};
