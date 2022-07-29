import { defineStore } from "pinia";
import {
  getScoreVarsInfo,
  getScoreVarsShipInfo,
  ScoreVarsShipInfo,
} from "@staratlas/factory";
import { Connection, PublicKey } from "@solana/web3.js";
import { GENESYSGO, SOLANRPC } from "@/typescipt/const/solana";
import { SCORE_PROGRAM, TRADE_PROGRAM } from "@/typescipt/const/staratlas";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";

export interface ResourcePrices {
  food_price: number;
  fuel_price: number;
  ammo_price: number;
  tool_price: number;
}

export const staratlas_scoreClientStore = defineStore({
  id: "staratlas_scoreClient",

  state: () => ({
    connection: {} as Connection,
  }),

  actions: {
    async getScoreVarsShipInfo(mint: string): Promise<ScoreVarsShipInfo> {
      return await getScoreVarsShipInfo(
        new Connection(GENESYSGO),
        SCORE_PROGRAM,
        new PublicKey(mint)
      );
    },
    async getAprForShipAtlas(
      ship_address: string,
      ship_cost_atlas: number,
      prices_resources: ResourcePrices
    ): Promise<number> {
      const score_vars = await this.getScoreVarsShipInfo(ship_address);

      const cost_ammoPerSecond =
        score_vars.millisecondsToBurnOneArms *
        1000 *
        prices_resources.ammo_price *
        Math.pow(10, -8);
      const cost_fuelPerSecond =
        score_vars.millisecondsToBurnOneFuel *
        1000 *
        prices_resources.fuel_price *
        Math.pow(10, -8);
      const cost_toolsPerSecond =
        score_vars.millisecondsToBurnOneToolkit *
        1000 *
        prices_resources.tool_price *
        Math.pow(10, -8);
      const cost_foodPerSecond =
        score_vars.millisecondsToBurnOneFood *
        1000 *
        prices_resources.food_price *
        Math.pow(10, -8);

      console.log("COST FOOD");
      console.log(cost_foodPerSecond);

      const cost_sumResourcesDay =
        ((cost_ammoPerSecond +
          cost_fuelPerSecond +
          cost_toolsPerSecond +
          cost_foodPerSecond) /
          60 /
          60 /
          24) *
        Math.pow(10, -8);

      console.log("COST daly");
      console.log(prices_resources.ammo_price);
      console.log(cost_sumResourcesDay);

      const rewards_day =
        score_vars.rewardRatePerSecond * 60 * 60 * 24 * Math.pow(10, -8);

      return (
        (rewards_day - cost_sumResourcesDay / ship_cost_atlas / 365) * 365 * 100
      );
    },
  },
});
