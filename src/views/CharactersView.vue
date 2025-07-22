<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import ArrowBack from '../components/icons/ArrowBack.vue'
import ArrowForward from '../components/icons/ArrowForward.vue'
import {obtainCharacters, totalPages, obtainCharactersByPage, characters} from '@/services/dragon_ball_services';
import {ref, onMounted, computed, watch} from 'vue';

const page = ref(1)
const charactersList = ref([])
const searchString = ref('')

watch(searchString, () => {
  charactersList.value = characters.filter((character) => {
    return character.name.toLowerCase().includes(searchString.value.toLocaleLowerCase())
  })
})

const isFirstPage = computed(() => {
  return page.value !== 1
})

const isLastPage = computed(() => {
  return page.value !== totalPages
})

const prevPage = async () => {
  page.value--
  charactersList.value = obtainCharactersByPage(page.value)
}

const nextPage = async () => {
  page.value++
  charactersList.value = obtainCharactersByPage(page.value)
}

onMounted( async () => {
  if (characters.length === 0){
    await obtainCharacters()
  }
  charactersList.value = obtainCharactersByPage(page.value)
})

</script>
<template>
  <main>
    <div class="pagination-search">
      <button class="arrow-container" v-if="isFirstPage" @click="prevPage">
        <ArrowBack class="arrow-back"/>
      </button>
      <div class="placeholder" v-else></div>
      <input type="text" class="search-field" placeholder="Buscar personaje" v-model="searchString">
      <button class="arrow-container" v-if="isLastPage" @click="nextPage">
        <ArrowForward class="arrow-forward" />
      </button>
      <div class="placeholder" v-else></div>
    </div>
    <div class="wrapper">
      <CharacterCard v-for="character in charactersList" :key="character.id" :character="character" />
    </div>
  </main>
</template>

<style scoped>

.wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: repeat( auto-fit, 15em);
  justify-content: center;
  gap: 2em;
  margin-top: 2em;
}

.arrow-container {
  height: 4em;
  width: 4em;
  cursor: pointer;
  border: 0;
  background-color: var(--action-color);
  padding: 0.5em 0;
  transition: 0.25s;
}

.arrow-container:hover {
  background-color: var(--hover-color);
}

svg {
  fill: var(--text-color);
  height: 100%;
  width: 100%;
}

.placeholder {
  height: 4em;
  width: 4em;
}

.search-field {
  height: 52px;
  width: 208px;
  padding: 0 2em;
  background-color: transparent;
  border: 1px solid var(--text-color);
  outline: none;
  font-size: 17px;
  line-height: 25px;
  letter-spacing: 0.2px;
  color: var(--text-color);
}

.pagination-search {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.search-field:focus {
  border-color: var(--action-color);
  color: var(--action-color);
}

input::placeholder {
  color: var(--text-color);
}

</style>
