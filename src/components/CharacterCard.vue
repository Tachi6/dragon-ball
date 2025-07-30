<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';

const router = useRouter()

const props = defineProps(['character','backCard'])

onMounted(() => {
  if (props.backCard) {
    document.querySelectorAll('.text-container').forEach((element) => element.classList.add('hidden'))
    document.querySelectorAll('.image-container').forEach((element) => element.classList.remove('hidden'))
  }
})

const openDetails = () => {
  if (!props.backCard) {
    router.push({name: 'details', params: {id: props.character.id}})
  }
}

</script>

<template>
  <div class="card-container" @click="openDetails">
    <div class="card-background"></div>
    <!-- Caracteristiques que nomes es veu si la carta esta de cara -->
    <div class="text-container">
      <img :src="props.character.image" alt="character-image" class="card-img">
      <div class="card-text">
        <h2 class="card-h2">{{ props.character.name }}</h2>
        <div class="card-specs">
          <h4 class="card-number">{{ props.character.ki }}</h4>
          <p class="card-label">Ki</p>
        </div>
        <div class="card-specs">
          <h4 class="card-number">{{ props.character.maxKi }}</h4>
          <p class="card-label">MaxKi</p>
        </div>
      </div>
    </div>
    <!-- Imatge que nomes es veu si la carta simula que esta girada -->
    <div class="image-container hidden">
      <img class="img-logo" alt="Dragon Ball Z logo" src="../assets/img/dragon-ball-z-logo.svg">
    </div>
  </div>
</template>

<style scoped>
  .card-container {
    width: 240px;
    aspect-ratio: 5/7;
    border: 2px solid var(--action-color);
    background-color: var(--bg-color);
    border-radius: 8px;
    position: relative;
    cursor: pointer;
  }

  .card-background {
    width: 95%;
    height: 95%;
    background: url(../assets/img/z.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 80px;
    margin: auto;
  }

  .card-img {
    height: 68%;
    margin: auto;
    display: block;
    position: absolute;
    object-fit: contain;
    z-index: 1;
    top: 10px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    user-select: none;
    transition: 0.5s
  }

  .card-text {
    width: 100%;
    position: absolute;
    z-index: 2;
    bottom: 0;
    right:0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    user-select: none;
  }

  .card-h2 {
    text-align: center;
    font-size: 1.5em;
  }

  .card-specs {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .card-number {
    font-size: 1em;
    letter-spacing: 0.45px;
    color: var(--action-color);
    font-family: mulish-extrabold;
  }

  .card-label {
    letter-spacing: 0.35px;
    font-family: graphik-light;
  }

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .img-logo {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 50px;
    width: auto;
    opacity: 0.5;
    user-select: none;
  }

  .hidden {
    display: none;
  }

</style>
