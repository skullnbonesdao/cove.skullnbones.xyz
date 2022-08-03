import { defineStore } from "pinia";
import { StarAtlasNFT } from "@/typescipt/interfaces/StarAtlasNFT";
import { STAR_ATLAS_API } from "@/typescipt/const/urls";

export const use_staratlasStore = defineStore({
  id: "staratlas_store",
  state: () => ({
    status: "",
    nfts: [] as Array<StarAtlasNFT>,
  }),

  actions: {
    async fetchFullData() {
      this.status = "init";
      console.info("Fetching StarAtlas Assets");
      await fetch(STAR_ATLAS_API)
        .then((response) => response.json() as Promise<StarAtlasNFT[]>)
        .then((data) => (this.nfts = data))
        .then(() => {
          console.info("SA-API-Data fetched!");
          this.status = "fetched";
        })
        .catch((err) => {
          console.error(err);
          this.status = "error";
        });
      this.nfts.sort((a, b) => a.tradeSettings.vwap - b.tradeSettings.vwap);
    },
  },
});
