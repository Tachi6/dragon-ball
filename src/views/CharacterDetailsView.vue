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
    <div class="z-background"></div>
    <div class="details-text">
      <h2>{{ character.characterName }}</h2>
      <h3>Planeta {{ character.originPlanet }} - Raza {{ character.race }}</h3>
      <p>{{ character.description }}</p>
      <div class="specs">
        <div>
          <h4 class="number">{{ character.ki }}</h4>
          <p class="label">Ki</p>
        </div>
        <div>
          <h4 class="number">{{ character.ki }}</h4>
          <p class="label">MaxKi</p>
        </div>
      </div>
      <h3 class="center" v-if="showTransformations">Transformaciones</h3>
    </div>
    <div class="details-image">
      <img :src="character.image" alt="character-image" class="character-image">
    </div>
  </div>
  <div class="transformations" v-if="showTransformations">
    <button class="transformation-button" v-for="(transformation, index) in transformations" :key="index" @click="changeTransformationView(transformation)">
      {{ transformation.name }}
    </button>
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
    position: relative;
  }

  .z-background {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: absolute;
    background: url(../assets/img/z.svg);
    background-repeat: no-repeat;
    background-size: clamp(240px, 80vw, 800px);
    background-position-x: right;
  }

  .details-text {
    flex: 1;
  }

  .details-image {
    height: 70vh;
    width: 30%;
    position: relative;
  }

  .character-image {
    height: 100%;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-45%);
  }

  .number {
    font-size: clamp(32px, 5vw, 40px);
    line-height: 45px;
    letter-spacing: 0.45px;
    color: var(--action-color);
    font-family: mulish-extrabold;
    text-align: center;
  }

  .label {
    letter-spacing: 0.35px;
    text-align: center;
    font-family: graphik-light;
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
    gap: 10px;
    justify-content: center;
  }

  .transformation-button {
    width: 95px;
    height: 95px;
    padding: 5px;
    line-height: 20px;
  }

</style>
