<script setup>

import {ref, onMounted, computed } from 'vue'
import {obtainCharacterInfo} from '@/services/dragon_ball_services';

const props = defineProps(['id'])
const character = ref({})
const transformations = ref([])
const planet = ref('')

const showTransformations = computed(() => {
  return transformations.value.length > 1
})

onMounted(async () => {
  character.value = await obtainCharacterInfo(props.id)

  transformations.value = character.value.transformations

  planet.value = character.value.originPlanet.name
})

const changeTransformationView = (transformation) => {
  character.value.ki = transformation.ki
  character.value.image = transformation.image
}

</script>

<template>
  <div class="character-details">
    <div class="details-text">
      <h2>{{ character.characterName }}</h2>
      <h3>Planeta {{ character.originPlanet }} - Raza {{ character.race }}</h3>
      <p class="description">{{ character.description }}</p>
      <div class="specs">
        <div>
          <h4>{{ character.ki }}</h4>
          <p class="label">Ataque</p>
        </div>
        <div>
          <h4>{{ character.ki }}</h4>
          <p class="label">Defensa</p>
        </div>
      </div>
      <h3 class="center" v-if="showTransformations">Transformaciones</h3>
      <div class="transformations" v-if="showTransformations">
        <button class="transformation-button" v-for="(transformation, index) in transformations" :key="index" @click="changeTransformationView(transformation)">
          {{ transformation.name }}
        </button>
      </div>
    </div>
    <div class="details-image">
      <img :src="character.image" alt="character-image" class="character-image">
    </div>
  </div>
</template>

<style scoped>

  .character-details {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    background: url(../assets/img/z.svg);
    background-repeat: no-repeat;
    background-size: 70%;
    background-position-x: right;
  }

  .details-text {
    flex: 1;
  }

  .details-image {
    height: 75vh;
    width: 30%;
    position: relative;
  }

  .character-image {
    height: 100%;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-45%);
  }

  h2 {
    color: var(--action-color);
    text-align: left;
    font-weight: bolder;
    font-size: 4em;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }

  h3 {
    text-align: left;
    font-size: 3em;
    line-height: 1.2;
    letter-spacing: 0.2px;
  }

  h4 {
    font-size: 2em;
    font-weight: bolder;
    color: var(--action-color);
    font-family: mulish-extrabold;
    text-align: center;
  }

  .description {
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: 0.2px;
    text-align: left;
  }

  .label {
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: 0.35px;
    text-align: center;
  }

  .specs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 30px;
    padding: 0 30px;
  }

  .center {
    text-align: center;
    padding: 1em 0 0.25em 0;
  }

  .transformations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.8em;
    justify-content: center;
  }

  .transformation-button {
    border: 0;
    background-color: var(--action-color);
    width: 6em;
    height: 6em;
    cursor: pointer;
    font-size: 1em;
    font-family: graphik-medium;
    line-height: 1.5;
    letter-spacing: 0.2;
    padding: 0.2em;
    transition: 0.25s;
  }

  .transformation-button:hover {
    background-color: var(--hover-color);
  }

</style>
