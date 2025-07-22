<script setup>

const props = defineProps(['character'])

</script>

<template>
  <div class="card-container" @click="$router.push({name: 'details', params: {id: props.character.id}})">
    <div class="card-background"></div>
    <img :src="props.character.image" alt="character-image" class="card-img">
    <div class="card-text">
      <h2>{{ props.character.name }}</h2>
      <p>Ataque: {{ props.character.maxKi }}</p>
      <p>Defensa: {{ props.character.maxKi }}</p>
    </div>
  </div>
</template>

<style scoped>
  .card-container {
    width: 12.5em;
    aspect-ratio: 5/7;
    border: 0.25em solid var(--action-color);
    border-radius: 0.5em;
    position: relative;
    padding: 1.5em;
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
    bottom: 5em;
    margin: auto;
  }


  .card-img {
    height: 63%;
    margin: auto;
    display: block;
    position: absolute;
    object-fit: contain;
    z-index: 1;
    top: 0.6em;
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
    margin-bottom: 0.6em;
  }

  h2 {
    color: var(--action-color);
    text-align: center;
    font-weight: bolder;
    font-size: 1.5em;
    line-height: 1.2;
    letter-spacing: 0.2px;
    margin-bottom: 0.2em;
  }

  p {
    text-align: center;
    margin-bottom: 0.25em;
  }
</style>
