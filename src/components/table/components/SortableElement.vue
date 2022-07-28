<template>
  <div class="flex items-center">
    <div class="item">{{ text }}</div>
    <div class="item">
      <div class="flex flex-col">
        <div class="item">
          <i @click="$emit('sortUp')" class="text-lg bi bi-caret-up-fill"></i>
        </div>
        <div class="item">
          <i
            @click="$emit('sortDown')"
            class="text-lg bi bi-caret-down-fill"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SortableElement",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: { type: String, default: "NONE" },
});
</script>

<style scoped></style>
