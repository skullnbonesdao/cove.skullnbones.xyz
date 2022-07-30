import { defineStore } from "pinia";
import {
  getParsedNftAccountsByOwner,
  resolveToWalletAddress,
} from "@nfteyez/sol-rayz";
import { SolRayzType } from "@/typescipt/interfaces/SolRayzType";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SOLANANETWORK } from "@/typescipt/const/solana";
import { useWallet } from "solana-wallets-vue";
import {
  status_message_enum,
  StatusMessage,
} from "@/typescipt/interfaces/StatusMessage";

export const solana_burnerStore = defineStore({
  id: "solana_burnerStore",

  state: () => ({
    nftArray: [] as SolRayzType[],
    message: {} as StatusMessage,
  }),

  actions: {
    async fetch_baseInfoNFTs(wallet_address: string) {
      this.message.type = status_message_enum.info;
      this.message.message = "...fetching nft data";
      console.info("{fetch_baseInfoNFTs} called!");

      const publicAddress = await resolveToWalletAddress({
        text: wallet_address,
      });

      this.nftArray = await getParsedNftAccountsByOwner({ publicAddress });
    },

    async fetch_additionData() {
      this.message.type = status_message_enum.info;
      this.message.message = "...fetching nft images";
      console.info("{fetch_additionData} called!");
      for (const nft in this.nftArray) {
        await fetch(this.nftArray[nft].data.uri)
          .then((response) => response.json())
          .then((data) => {
            this.nftArray[nft].data.img_url = data.image;
          })
          .catch((err) => console.log(err));
      }
    },

    async burnToken(token_address: string) {
      console.log("Start TokenBurn!");
      console.log(token_address);

      try {
        const mintPublickey = new PublicKey(token_address);
        const { publicKey } = useWallet();

        if (publicKey.value) {
          const associatedAddress = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            publicKey.value
          );
          const burnInstruction = await Token.createBurnInstruction(
            TOKEN_PROGRAM_ID,
            mintPublickey,
            associatedAddress,
            publicKey.value,
            [],
            1
          );

          const closeInstruction = await Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            associatedAddress,
            publicKey.value,
            publicKey.value,
            []
          );

          const BurnandCloseTransaction = new Transaction().add(
            burnInstruction,
            closeInstruction
          );

          const connection = new Connection(clusterApiUrl(SOLANANETWORK));

          const BurnandCloseSignature = await useWallet().sendTransaction(
            BurnandCloseTransaction,
            connection
          );

          const confirmed = await connection.confirmTransaction(
            BurnandCloseSignature,
            "processed"
          );
          if (confirmed) {
            this.message.type = status_message_enum.success;
            this.message.message = "NFT has been burned!";
            console.log("deleted NFT");
          } else {
            this.message.type = status_message_enum.error;
            this.message.message = "NFT-TX has not been confirmed!";
            console.log("Error DELETE");
          }
        } else {
          this.message.type = status_message_enum.info;
          this.message.message = "Please connect wallet first!";
          console.log("Wallet not connetded");
        }
      } catch (error) {
        this.message.type = status_message_enum.error;
        this.message.message = "Error burning NFT";
        console.log(error);
      }
    },
  },
});
