<script setup>
import DarkMode from "./icons/DarkMode.vue";
import LightMode from "./icons/LightMode.vue";
import AutoMode from "./icons/AutoMode.vue";
import { ref, onMounted, watch } from "vue";

const isSystemThemeDark = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const themeMode = ref(localStorage.getItem("themeMode") || "auto");

watch(themeMode, () => {
  if (themeMode.value === "auto") {
    themeMode.value = isSystemThemeDark.value ? "dark" : "light";
  }
  document.body.className = themeMode.value;
});

const changeTheme = (e) => {
  themeMode.value = e.target.value;
  localStorage.setItem("themeMode", e.target.value);
};

onMounted(() => {
  document.querySelector(`input#${themeMode.value}`).checked = true;
  if (themeMode.value === "auto") {
    themeMode.value = isSystemThemeDark.value ? "dark" : "light";
  }
  document.body.className = themeMode.value;
});
</script>

<template>
  <div class="theme-changer">
    <div class="theme-button">
      <label for="light">
        <input
          type="radio"
          name="theme-mode"
          id="light"
          value="light"
          @change="changeTheme"
          checked
        />
        <LightMode class="svg" />
      </label>
    </div>
    <div class="theme-button">
      <label for="auto">
        <input type="radio" name="theme-mode" id="auto" value="auto" @change="changeTheme" />
        <AutoMode class="svg" />
      </label>
    </div>
    <div class="theme-button">
      <label for="dark">
        <input type="radio" name="theme-mode" id="dark" value="dark" @change="changeTheme" />
        <DarkMode class="svg" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.theme-changer {
  display: flex;
  height: 80px;
  width: 26px;
  background-color: transparent;
  border: 1px solid var(--action-color);
  outline: none;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.theme-button {
  width: 100%;
  height: 26px;
  transition: 0.25s;
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

label:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.theme-button:has(input[type="radio"]:checked) {
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
  height: 85%;
  width: 85%;
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
