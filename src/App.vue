<script setup>
import DarkMode from './components/icons/DarkMode.vue';
import LightMode from './components/icons/LightMode.vue';
import { RouterLink, RouterView } from 'vue-router'

const changeTheme = (e) => document.body.className = e.target.value

</script>

<template>
  <header>
    <img class="img-logo" alt="Dragon Ball Z logo" src="./assets/img/dragon-ball-z-logo.svg">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/details">Personajes</RouterLink>
        <RouterLink to="/about">Batalla</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div class="theme-changer">
      <!-- <div class="indicator"></div> -->
      <div class="side">
        <label for="light">
          <input type="radio" name="theme-mode" id="light" value="light" @change="changeTheme" checked>
          <LightMode class="svg"/>
        </label>
      </div>
      <div class="side">
        <label for="dark">
          <input type="radio" name="theme-mode" id="dark" value="dark" @change="changeTheme">
          <DarkMode class="svg"/>
        </label>
      </div>
    </div>
    <!-- <input type="text" class="search-field" placeholder="Buscar personaje"> -->
  </header>
  <RouterView />
</template>

<style scoped>

header{
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 25px
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

.theme-changer{
  display: flex;
  height: 36px;
  width: 150px;
  background-color: transparent;
  border: 1px solid var(--text-color);
  outline: none;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}

.side {
  width: 50%;
  height: 100%;
  transition: 0.5s;
}

label {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  cursor: pointer;
}

.side:has(input[type="radio"]:checked) {
  background-color: var(--action-color);
}

input[type="radio"] {
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
}

svg {
  position: absolute;
  height: 90%;
  width: 90%;
  fill: var(--action-color);
  transition: 0.5s;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

input[type="radio"]:checked + svg {
  fill: var(--text-color);
}

.search-field {
  height: 52px;
  width: 208px;
  padding: 0 2em;
  background-color: transparent;
  border: 1px solid white;
  outline: none;
}

.search-field {
  font-size: 17px;
  line-height: 25px;
  letter-spacing: 0.2px;
  color: white;
}

.search-field:focus {
  border-color: #D9B346;
  color: #D9B346;

}
input::placeholder {
  color: white;
}

</style>
