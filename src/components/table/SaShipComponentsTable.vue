<template>
  <VTable
    :data="users"
    class="table w-full"
    sortHeaderClass="flex items-center justify-between w-full"
  >
    <!-- head -->
    <template #head>
      <th v-if="visibility[0][0]" @click="clk_toggleVisible(0, 0)">Name</th>
      <th v-else @click="clk_toggleVisible(0, 0)">.</th>
      <th
        v-for="detailCategory in starAtlasStore.ship_detailsCategories"
        :key="detailCategory"
      >
        {{ detailCategory }}
      </th>

      <th>Ship</th>
      <th @click="toggle()">Age</th>
    </template>
    <!-- body -->
    <template #body="{ rows }">
      <tr v-for="row in rows" :key="row.id">
        <td>{{ row.name }}</td>
        <td>{{ row.age }}</td>
      </tr>
    </template>
  </VTable>
</template>

<script lang="ts">
export default {
  name: "SaShipComponentsTable.vue",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { use_staratlasStore } from "@/store/staratlas_store";
const visibility = ref([
  [true, true, true],
  [true, true, true],
]);

const users = [
  { name: "tom", age: "22" },
  { name: "anne", age: "17" },
];

const starAtlasStore = use_staratlasStore();

function clk_toggleVisible(index_0: number, index_1: number) {
  console.log("clk");
  visibility.value[index_0][index_1] = !visibility.value[index_0][index_1];
}
</script>
<style scoped></style>
