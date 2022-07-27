<template>
  <div class="bg-base-100 p-4 rounded-xl">
    <h1 class="pb-4">Score Stats</h1>
    <div class="space-y-3">
      <div>
        <h2>Supply and Burn Rates</h2>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="border p-2 rounded-xl">
            <h4>Food</h4>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Reserve:</h5>
              <div>{{ score_vars_ship_info.foodMaxReserve }}</div>
            </div>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Burn:</h5>
              <div>
                {{
                  (
                    (score_vars_ship_info.millisecondsToBurnOneFood /
                      1000 /
                      60 /
                      60) *
                    score_vars_ship_info.foodMaxReserve
                  ).toFixed(2)
                }}h
              </div>
            </div>
          </div>
          <div class="border p-2 rounded-xl">
            <h4>Arms</h4>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Reserve:</h5>
              <div>{{ score_vars_ship_info.armsMaxReserve }}</div>
            </div>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Burn:</h5>
              <div>
                {{
                  (
                    (score_vars_ship_info.millisecondsToBurnOneArms /
                      1000 /
                      60 /
                      60) *
                    score_vars_ship_info.armsMaxReserve
                  ).toFixed(2)
                }}h
              </div>
            </div>
          </div>
          <div class="border p-2 rounded-xl">
            <h4>Fuel</h4>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Reserve:</h5>
              <div>{{ score_vars_ship_info.fuelMaxReserve }}</div>
            </div>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Burn:</h5>
              <div>
                {{
                  (
                    (score_vars_ship_info.millisecondsToBurnOneFuel /
                      1000 /
                      60 /
                      60) *
                    score_vars_ship_info.fuelMaxReserve
                  ).toFixed(2)
                }}h
              </div>
            </div>
          </div>
          <div class="border p-2 rounded-xl">
            <h4>Tool</h4>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Reserve:</h5>
              <div>{{ score_vars_ship_info.toolkitMaxReserve }}</div>
            </div>
            <div class="flex flex-row space-x-1">
              <h5 class="grow">Burn:</h5>
              <div>
                {{
                  (
                    (score_vars_ship_info.millisecondsToBurnOneToolkit /
                      1000 /
                      60 /
                      60) *
                    score_vars_ship_info.toolkitMaxReserve
                  ).toFixed(2)
                }}h
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Supply and Burn Rates</h2>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="border p-2 rounded-xl">
            <h4>Rewards</h4>
            <div class="flex flex-row space-x-1">
              <atlas-icon class="grow"></atlas-icon>
              <div>
                {{
                  parseFloat(score_vars_ship_info.rewardRatePerSecond).toFixed(
                    2
                  )
                }}
                <sup>1</sup>/<sub>s</sub>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScoreTab",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";
import { staratlas_scoreClientStore } from "@/store/staratlas_scoreClient";
import { ScoreVarsShipInfo } from "@staratlas/factory";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";

const props = defineProps({
  mint_address: {
    type: String,
    default: "",
  },
});

const staratlas_scoreClient = staratlas_scoreClientStore();

let score_vars_ship_info = ref({} as ScoreVarsShipInfo);

async function load_score_data() {
  score_vars_ship_info.value = await staratlas_scoreClient.getScoreVarsShipInfo(
    props.mint_address
  );
}

onMounted(async () => {
  await load_score_data();
});

watch(
  () => props.mint_address,
  async (value) => {
    await load_score_data();
  }
);
</script>

<style scoped></style>
