<script setup>

import DarkMode from './icons/DarkMode.vue';
import LightMode from './icons/LightMode.vue';

const changeTheme = (e) => document.body.className = e.target.value

</script>

<template>
    <div class="theme-changer">
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
</template>

<style scoped>

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

</style>
