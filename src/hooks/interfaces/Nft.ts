interface ListPrice {
  listed: boolean;
  price: string | null;
  price_currency: string | null;
  price_usd: string | null;
  marketplace: string | null;
}

interface LastSale {
  price: string;
  price_currency: string | null;
  token_symbol: string | null;
  timestamp: string;
}

interface NormalizedMetadata {
  name: string | null;
  description: string | null;
  animation_url: string | null;
  external_link: string | null;
  external_url: string | null;
  image: string | null;
  attributes: unknown[] | null;
}

export interface NFT {
  amount: string;
  block_number: string;
  block_number_minted: string | null;
  collection_banner_image: string;
  collection_category: string;
  collection_logo: string;
  contract_type: string;
  discord_url: string;
  floor_price: string | null;
  floor_price_currency: string | null;
  floor_price_usd: string | null;
  instagram_username: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  last_sale: LastSale | null;
  list_price: ListPrice;
  metadata: string | null;
  minter_address: string;
  name: string;
  normalized_metadata: NormalizedMetadata;
  owner_of: string;
  possible_spam: boolean;
  project_url: string;
  rarity_label: string | null;
  rarity_percentage: number | null;
  rarity_rank: number | null;
  symbol: string;
  telegram_url: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
  twitter_username: string | null;
  verified_collection: boolean;
  wiki_url: string;
}

export interface NftCollection {
  token_address: string;
  name: string;
  symbol: string;
  contract_type: string;
  collection_logo: string;
  collection_banner_image: string | null;
  floor_price: string;
  floor_price_currency: string;
  floor_price_usd: string;
  possible_spam: boolean;
  verified_collection: boolean;
}

export interface NftCollectionParams {
  address: string;
  chain: string;
  limit: number;
  cursor?: string;
}

export interface NftParams {
  address: string;
  chain: string;
  limit: number;
  cursor?: string;
  token_addresses?: string;
}
