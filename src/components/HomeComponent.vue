<template>
  <div
    class="hero min-h-screen"
    v-bind:style="{ backgroundImage: 'url(cave_pirate.jpg)' }"
  >
    <div class="hero-content text-center text-neutral-content">
      <div class="space-y-10 bg-transparent/60 p-20 card">
        <h1 class="mb-5 text-5xl">SKULL & BONES</h1>
        <p class="mb-5">
          Skull & Bones is Star Atlas’ 1st and largest piracy DAC
        </p>
        <div class="flex flex-col space-y-2">
          <a
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://skullnbones.xyz/"
          >
            Skull&Bones
          </a>
          <a
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://staratlas.com/"
          >
            StarAtlas
          </a>
        </div>
        <div>
          <p>This is not a service by StarAtlas</p>
          <p>The tools on this site are creation of the Skull&BonesDAO</p>
          <p>They are built for everyone</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  symbol: "HomeComponent",
};
</script>

<style scoped>
h1 {
  font-family: font-mono, Times, serif;
}
</style>
