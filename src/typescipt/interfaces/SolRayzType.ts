export interface SolRayzType {
  mint: string;
  updateAuthority: string;
  data: {
    creators: any[];
    name: string;
    img_url?: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
  };
  key?: any;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  masterEdition?: string;
  edition?: string;
}
