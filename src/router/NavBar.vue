<template>
  <nav>
    <div class="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/market">Market</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  symbol: "NavBar",
};
</script>

<style scoped></style>
