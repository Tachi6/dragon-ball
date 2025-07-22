<script setup>

import ThemeChanger from './components/ThemeChanger.vue';
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <img class="img-logo" alt="Dragon Ball Z logo" src="./assets/img/dragon-ball-z-logo.svg">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/characters">Personajes</RouterLink>
        <RouterLink to="#">Batalla</RouterLink>
        <RouterLink to="#">About</RouterLink>
      </nav>
    </div>
    <ThemeChanger />
  </header>
  <RouterView />
  <div class="bottom-margin"></div>
</template>

<style scoped>

header{
  padding: 1.25em 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5em
}

.img-logo {
  height: 62px;
  width: auto;
}

.wrapper {
  justify-self: center;
  margin: auto;
}

nav a {
  color: var(--text-color);
  line-height: 1.5em;
  letter-spacing: 0.2px;
  margin-left: 1em;
  margin-right: 1em;
  text-decoration: none;
  transition: 0.4s;
}

nav a.router-link-exact-active {
  color: var(--action-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.bottom-margin {
  height: 30px;
}

</style>
