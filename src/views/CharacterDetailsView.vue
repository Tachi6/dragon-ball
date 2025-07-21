<script setup>

import { onMounted, ref } from 'vue'
import {obtainCharacterInfo} from '@/services/dragon_ball_services';

const props = defineProps(['id'])
const character = ref({})
const transformations = ref(0)

onMounted(async () => {
  character.value = await obtainCharacterInfo(props.id)
  transformations.value = character.value.transformations.length;
})

</script>

<template>
  <div class="character-details">
    <div class="details-text">
      <h2>{{ character.name }}</h2>
      <h3>{{ character.race }} - {{ character.gender }}</h3>
      <p class="description">{{ character.description }}</p>
      <div class="specs">
        <div>
          <h4>{{ character.ki }}</h4>
          <p class="label">Ataque</p>
        </div>
        <div>
          <h4>{{ transformations }}</h4>
          <p class="label">Transformaciones</p>
        </div>
        <div>
          <h4>{{ character.ki }}</h4>
          <p class="label">Defensa</p>
        </div>
      </div>
    </div>
    <div class="details-image">
      <img :src="character.image" alt="goku" class="character-image">
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
  }

  .character-image {
    height: 100%;
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
    justify-content: space-between;
    margin-top: 30px;
    padding: 0 30px;
  }

</style>
