<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import ArrowBack from '../components/icons/ArrowBack.vue'
import ArrowForward from '../components/icons/ArrowForward.vue'
import {obtainCharacters, totalPages} from '@/services/dragon_ball_services';
import {ref, onMounted, computed} from 'vue';

const page = ref(1)
const characters = ref([])

const isFirstPage = computed(() => {
  return page.value !== 1
})

const isLastPage = computed(() => {
  return page.value !== totalPages
})

const prevPage = async () => {
  page.value--
  characters.value = await obtainCharacters(page.value)
}

const nextPage = async () => {
  page.value++
  characters.value = await obtainCharacters(page.value)
}

onMounted( async () => characters.value = await obtainCharacters(page.value))

</script>
<template>
  <main>
    <ArrowBack class="arrow-back" v-show="isFirstPage" @click="prevPage"/>
    <div class="wrapper">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <ArrowForward class="arrow-forward" v-show="isLastPage" @click="nextPage"/>
  </main>
</template>

<style scoped>

main {
  position: relative;
  display: flex;
  flex-direction: row;
}

.wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: repeat( auto-fit, 12.5em);
  justify-content: center;
  gap: 1em;
}

svg {
  align-self: flex-start;
  height: 2.5em;
  width: 2.5em;
  margin: 1em 1em;
  fill: var(--action-color);
}

.arrow-back {
  left: 0;
}

.arrow-forward {
  right: 0;
}

</style>
