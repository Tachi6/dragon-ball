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
        <ArrowBack />
      </button>
      <button class="placeholder" v-else disabled></button>
      <input type="text" class="search-field" placeholder="Buscar" v-model="searchString">
      <button class="arrow-container" v-if="isLastPage" @click="nextPage">
        <ArrowForward />
      </button>
      <button class="placeholder" v-else disabled></button>
    </div>
    <div class="wrapper">
      <CharacterCard v-for="(character, index) in charactersList" :key="`ch${index}`" :character="character" />
    </div>
  </main>
</template>

<style scoped>

.wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.pagination-search {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.arrow-container {
  height: 52px;
  width: 52px;
}

svg {
  fill: var(--text-color);
  height: 100%;
  width: 100%;
  padding: 10px;
}

.placeholder {
  height: 52px;
  width: 52px;
  background-color: transparent;
}

.search-field {
  height: 52px;
  min-width: 80px;
  width: 25vw;
  max-width: 200px;
  flex: 1;
  margin: 0 10px;
  text-align: center;
  background-color: transparent;
  border: 1px solid var(--text-color);
  outline: none;
  font-family: graphik-medium;
  color: var(--text-color);
}

.search-field:focus {
  border-color: var(--action-color);
  color: var(--action-color);
}

input::placeholder {
  color: var(--text-color);
  text-align: center;
}

</style>
