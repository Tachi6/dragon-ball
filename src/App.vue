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
        <RouterLink to="/battle">Batalla</RouterLink>
      </nav>
    </div>
    <ThemeChanger />
  </header>
  <RouterView />
  <div class="bottom-margin"></div>
</template>

<style scoped>

header{
  padding: 20px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.2px;
  font-family: graphik-medium;
  color: var(--text-color);
  margin-left: 16px;
  margin-right: 16px;
  text-decoration: none;
  transition: 0.25s;
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
