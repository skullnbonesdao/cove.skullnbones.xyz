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
      /*const score_vars = await this.getScoreVarsShipInfo(ship_address);

      const cost_ammoPerDay =
        (score_vars.millisecondsToBurnOneArms / 1000 / 60 / 60) *
        prices_resources.tool_price;
      const cost_fuelPerDay =
        (score_vars.millisecondsToBurnOneFuel / 1000 / 60 / 60) *
        prices_resources.tool_price;
      const cost_toolsPerDay =
        (score_vars.millisecondsToBurnOneToolkit / 1000 / 60 / 60) *
        prices_resources.tool_price;
      const cost_foodPerDay =
        (score_vars.millisecondsToBurnOneFood / 1000 / 60 / 60) *
        prices_resources.food_price;

      console.log("COST FOOD");
      console.log(score_vars.millisecondsToBurnOneFood);
      console.log(cost_foodPerDay);
      console.log("COST TOOL");
      console.log(score_vars.millisecondsToBurnOneToolkit);
      console.log(cost_toolsPerDay);

      const cost_sumResourcesDay =
        cost_ammoPerDay + cost_fuelPerDay + cost_toolsPerDay + cost_foodPerDay;

      console.log("COST daly");
      console.log(cost_sumResourcesDay);
      console.log(score_vars.rewardRatePerSecond * 60 * 60 * 24);

      const rewards_day =
        score_vars.rewardRatePerSecond * 60 * 60 * 24 * Math.pow(10, -8);
*/
      return 0;
    },
  },
});
