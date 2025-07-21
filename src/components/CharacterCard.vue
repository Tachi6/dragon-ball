<script setup>
</script>

<template>
  <div class="card-container">
    <div class="card-background"></div>
    <img src="https://dragonball-api.com/characters/goku_normal.webp" alt="goku" class="card-img">
    <div class="card-text">
      <h2>GOKU</h2>
      <p>Ataque: 522650</p>
      <p>Defensa: 522650</p>
    </div>
  </div>
</template>

<style scoped>
  .card-container {
    width: 260px;
    aspect-ratio: 5/7;
    border: 4px solid var(--action-color);
    border-radius: 0.5em;
    position: relative;
    padding: 30px;
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
    top: 15px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .card-text {
    width: 100%;
    position: absolute;
    bottom: 0;
    right:0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  h2 {
    color: var(--action-color);
    text-align: center;
    font-weight: bolder;
    font-size: 2em;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }


  h3 {
    text-align: center;
    font-size: x-large;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    margin-bottom: 5px;
  }
</style>
