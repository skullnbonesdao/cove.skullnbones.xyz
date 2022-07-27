import { defineStore } from "pinia";
import { getScoreVarsShipInfo, ScoreVarsShipInfo } from "@staratlas/factory";
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
  },
});
