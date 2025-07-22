<script setup>

</script>

<template>
  <main>
    <div class="wrapper">
      <h1 class="margin-bottom">Personajes de <em>Dragon Ball Z</em> </h1>
      <p class="home-text">Descubre los personajes de Dragon Ball Z, con todas sus transformaciones, y  compite con ellos en batallas de cartas.</p>
    </div>
    <img src="../assets/img/dragon-ball-4-stars.png" alt="ball-4stars" class="img-ball">
  </main>
</template>

<style scoped>

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper {
  padding: 30px 300px;
}

.margin-bottom {
  margin-bottom: 30px;
}

em {
  color: var(--action-color);
}

.home-text {
  text-align: center;
  margin-bottom: 20px;
}

.img-ball {
  height: 400px;
  margin: auto;
}
</style>
