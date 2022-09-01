<template>
  <h1>Ship components</h1>

  <SaShipComponentsTable></SaShipComponentsTable>
</template>

<script>
import SaShipComponentsTable from "@/components/table/SaShipComponentsTable";
export default {
  name: "ShipComponentsView",
  components: { SaShipComponentsTable },
};
</script>

<style scoped></style>
