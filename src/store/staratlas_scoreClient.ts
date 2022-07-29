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
    async getAprForShip(
      ship_address: string,
      ship_cost_atlas: number
    ): Promise<number> {
      const score_vars = await this.getScoreVarsShipInfo(ship_address);

      const rewards =
        score_vars.rewardRatePerSecond * 60 * 60 * 24 * Math.pow(10, -8);

      return (rewards / ship_cost_atlas / 365) * 365 * 100;
    },
  },
});
