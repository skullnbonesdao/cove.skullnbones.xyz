export interface StarAtlasNFT {
  _id: string;
  deactivated: boolean;
  name: string;
  description: string;
  image: string;
  media: Media;
  attributes: Attributes;
  symbol: string;
  markets: Market[];
  totalSupply?: number;
  mint: string;
  network?: Network;
  tradeSettings: TradeSettings;
  airdrops: Airdrop[];
  primarySales: PrimarySale[];
  updatedAt: Date;
  collection: Collection;
  slots?: Slots;
  id: string;
  createdAt?: Date;
}

export interface Airdrop {
  _id: string;
  supply: number;
  id: number;
}

export interface Attributes {
  itemType: Category;
  tier?: number;
  class: string;
  category: Category;
  score?: number;
  rarity: Rarity;
  musician?: string;
  spec?: string;
  make?: string;
  model?: string;
  unitLength?: number;
  unitWidth?: number;
  unitHeight?: number;
}

export enum Category {
  Access = "access",
  Collectible = "collectible",
  Cosmetic = "cosmetic",
  Crew = "crew",
  Equipment = "equipment",
  Rebirth = "rebirth",
  Resource = "resource",
  Ship = "ship",
  Structure = "structure",
}

export enum Rarity {
  Anomaly = "anomaly",
  Common = "common",
  Epic = "epic",
  Legendary = "legendary",
  Rare = "rare",
  Uncommon = "uncommon",
}

export interface Collection {
  name: string;
  family: Family;
}

export enum Family {
  StarAtlas = "Star Atlas",
}

export interface Market {
  _id?: string;
  id: string;
  quotePair: QuotePair;
  serumProgramId?: SerumProgramID;
}

export enum QuotePair {
  Atlas = "ATLAS",
  Usdc = "USDC",
}

export enum SerumProgramID {
  The9XQeWvG816BUx9EPjHMAT23YvVM2ZWbrrpZb9PusVFin = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
}

export interface Media {
  qrInstagram?: string;
  qrFacebook?: string;
  sketchfab?: string;
  audio?: string;
  thumbnailUrl: string;
  gallery?: string[] | null;
}

export enum Network {
  MainnetBeta = "mainnet-beta",
}

export interface PrimarySale {
  listTimestamp: number;
  id: null | string;
  _id?: string;
  supply?: number;
  price?: number;
  isMinted?: boolean;
  isListed?: boolean;
  mintTimestamp?: number | null;
  orderId?: null;
  expireTimestamp?: number;
  targetPair?: QuotePair;
  quotePrice?: number;
}

export interface Slots {
  crewSlots: Slot[] | null;
  componentSlots: Slot[] | null;
  moduleSlots: Slot[] | null;
}

export interface Slot {
  type: string;
  size: Size;
  quantity: number;
}

export enum Size {
  Capital = "capital",
  Commander = "commander",
  Crew = "crew",
  Large = "large",
  Medium = "medium",
  SizeLarge = "Large",
  Small = "small",
  XSmall = "x-small",
  XXSmall = "XX-Small",
  XxSmall = "xx-small",
  XxxSmall = "xxx-small",
}

export interface TradeSettings {
  expireTime?: number;
  saleTime?: number;
  vwap: number;
  msrp?: Msrp;
}

export interface Msrp {
  value: number;
  currencySymbol: QuotePair;
}
