<template>
  <header class="sticky top-0 z-50 bg-base-300 shadow-xl">
    <nav>
      <div class="navbar">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <router-link class="router-link" to="/">
                  <div class="flex flex-row space-x-1">
                    <div>Home</div>
                  </div>
                </router-link>
              </li>

              <li>
                <router-link class="router-link" to="/market">
                  <div class="flex flex-row space-x-1">
                    <div>Market</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/burner">
                  <div class="flex flex-row space-x-1">
                    <div>Burner</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link class="router-link" to="/about">
                  <div class="flex flex-row space-x-1">
                    <div>About</div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <a class="btn normal-case text-xl" href="https://skullnbones.xyz"
            ><img
              src="@/assets/snb_logo.svg"
              alt="logo"
              class="invertible h-6 pr-2"
            />S&B
          </a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0 space-x-2">
            <li>
              <router-link
                class="router-link"
                v-bind:class="$route.name === 'home' ? ' active' : ''"
                to="/"
              >
                <div class="flex flex-col-reverse items-center">
                  <div>Home</div>
                </div>
              </router-link>
            </li>

            <li>
              <router-link
                class="router-link"
                v-bind:class="$route.name === 'market' ? ' active' : ''"
                to="/market"
              >
                <div class="flex flex-col-reverse items-center">
                  <div>Market</div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link"
                v-bind:class="$route.name === 'burner' ? ' active' : ''"
                to="/burner"
              >
                <div class="flex flex-col-reverse items-center">
                  <div>Burner</div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link"
                v-bind:class="$route.name === 'about' ? ' active' : ''"
                to="/about"
              >
                <div class="flex flex-col-reverse items-center">
                  <div>About</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="navbar-end space-x-2">
          <theme-toggle></theme-toggle>
        </div>
      </div>
    </nav>
  </header>
  <div id="content relative">
    <router-view />
  </div>
  <footer><footer-component></footer-component></footer>
</template>

<script>
import ThemeToggle from "@/components/buttons/ThemeToggle";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: { FooterComponent, ThemeToggle },
  symbol: "NavBar",
};
</script>

<style scoped>
.invertible {
  filter: invert(1);
}
</style>
