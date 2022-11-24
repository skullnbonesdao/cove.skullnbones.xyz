import { defineStore } from "pinia";
import { getScoreVarsShipInfo, ScoreVarsShipInfo } from "@staratlas/factory";
import { Connection, PublicKey } from "@solana/web3.js";
import { PORTALRPC, ANKRRPC } from "@/typescipt/const/solana";
import { SCORE_PROGRAM } from "@/typescipt/const/staratlas";

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
        new Connection(ANKRRPC),
        SCORE_PROGRAM,
        new PublicKey(mint)
      );
    },

    async getAprForShipAtlas(
      ship_address: string,
      ship_cost_atlas: number,
      prices_resources: ResourcePrices
    ): Promise<number> {
      if (ship_cost_atlas < 0) return 0;

      const score_vars = await this.getScoreVarsShipInfo(ship_address);

      const rewards_per_s: number = parseFloat(
        score_vars.rewardRatePerSecond.toString()
      );
      const rewards_day = rewards_per_s * Math.pow(10, -8) * 60 * 60 * 24;

      const used_ammo_day =
        1 / (score_vars.millisecondsToBurnOneArms / 1000 / 60 / 60 / 24);
      const used_fuel_day =
        1 / (score_vars.millisecondsToBurnOneFuel / 1000 / 60 / 60 / 24);
      const used_tool_day =
        1 / (score_vars.millisecondsToBurnOneToolkit / 1000 / 60 / 60 / 24);
      const used_food_day =
        1 / (score_vars.millisecondsToBurnOneFood / 1000 / 60 / 60 / 24);

      const maintained_cost_in_atlas =
        used_ammo_day * prices_resources.ammo_price +
        used_fuel_day * prices_resources.fuel_price +
        used_tool_day * prices_resources.tool_price +
        used_food_day * prices_resources.food_price;

      const atlas_rewards_day = rewards_day - maintained_cost_in_atlas;

      //APR
      return (atlas_rewards_day / ship_cost_atlas) * 365 * 100;
    },
  },
});
