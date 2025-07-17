<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img class="img-logo" alt="Dragon Ball Z logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Dragon_Ball_Z_logo.svg">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <input type="text" class="search-field" placeholder="Buscar personaje">
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
  color: white;
  line-height: 1.5em;
  letter-spacing: 0.2px;
  margin-left: 1em;
  margin-right: 1em;
  text-decoration: none;
  transition: 0.4s;
}

nav a.router-link-exact-active {
  color: #D9B346;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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
