<script setup>

import ThemeChanger from './components/ThemeChanger.vue';
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <img class="img-logo" alt="Dragon Ball Z logo" src="./assets/img/dragon-ball-z-logo.svg">
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/characters">Personajes</RouterLink>
      <RouterLink to="/battle">Batalla</RouterLink>
    </nav>
    <ThemeChanger class="fix-position"/>
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
  justify-content: space-between;
  gap: 20px;
  position: relative;
}

.fix-position {
  position: absolute;
  right: -10px;
  top: 12px;
}

.wrapper {
  width: 1px;
  flex: 1;
}

.img-logo {
  height: 62px;
  width: auto;
}

nav {
  padding: 0 20px;
}

nav a {
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

@media (width <= 675px) {
  header {
    justify-content: center;
  }
}

</style>
