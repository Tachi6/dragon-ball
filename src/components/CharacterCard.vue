<script setup>

const props = defineProps(['character'])

</script>

<template>
  <div class="card-container" @click="$router.push({name: 'details', params: {id: props.character.id}})">
    <div class="card-background"></div>
    <img :src="props.character.image" alt="character-image" class="card-img">
    <div class="card-text">
      <h2 class="card-h2">{{ props.character.name }}</h2>
      <p class="card-p">Ki: {{ props.character.ki }}</p>
      <p class="card-p">MaxKi: {{ props.character.maxKi }}</p>
    </div>
  </div>
</template>

<style scoped>
  .card-container {
    width: 240px;
    aspect-ratio: 5/7;
    border: 4px solid var(--action-color);
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
    height: 66%;
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
  }

  .card-h2 {
    text-align: center;
    font-size: 26px;
    line-height: 31px;
  }

  .card-p {
    text-align: center;
  }

</style>
