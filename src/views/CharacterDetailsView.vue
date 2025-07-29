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
  <main>
    <div class="z-background"></div>
    <div class="character-details">
      <div class="details-text">
        <h2>{{ character.characterName }}</h2>
        <h3>Planeta {{ character.originPlanet }} - Raza {{ character.race }}</h3>
        <p>{{ character.description }}</p>
        <div class="specs">
          <h4 class="number">{{ character.ki }}</h4>
          <p class="label">Ki</p>
        </div>
      </div>
      <div class="details-image">
        <img :src="character.image" alt="character-image" class="character-image">
      </div>
    </div>
    <h3 class="transformations-label" v-if="showTransformations">Transformaciones</h3>
    <div class="transformations" v-if="showTransformations">
      <button class="transformation-button" v-for="(transformation, index) in transformations" :key="`t${index}`" @click="changeTransformationView(transformation)">
        {{ transformation.name }}
      </button>
    </div>
  </main>
</template>

<style scoped>

main {
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 0 30px;
}

.z-background {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: absolute;
  z-index: 1;
  background: url(../assets/img/z.svg);
  background-repeat: no-repeat;
  background-size: clamp(240px, 89vw, 800px);
  background-position-x: right;
}

.character-details {
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.details-text {
  width: 60%;
  z-index: 3;
}

.details-image {
  width: 40%;
  position: relative;
  z-index: 2;
}

.character-image {
  max-height: 500px;
  height: calc(200px + 35vw);
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
}

.specs {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
}

.number {
  font-size: clamp(32px, 5vw, 40px);
  letter-spacing: 0.45px;
  color: var(--action-color);
  font-family: mulish-extrabold;
}

.label {
  font-size: 1.5em;
  letter-spacing: 0.35px;
  font-family: graphik-light;
}

.transformations {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: start;
}

.transformations-label {
  z-index: 3;
  padding: 1em 0 0.25em 0;
}

.transformation-button {
  z-index: 3;
  width: 95px;
  height: 95px;
  padding: 5px;
  line-height: 20px;
}

@media (width <= 800px) {

main {
  padding: 0;
}

.details-text {
  width: 100%;
  text-align: center;
}

.details-image {
  width: 100%;
  text-align: center;
}

.specs {
  justify-content: center;
}

.character-image {
  margin: auto;
  position: unset;
  margin-left: 0;
  transform: translateX(0);
}

.transformations-label {
  text-align: center;
}

.transformations {
  justify-content: center
}

}

</style>
