<script setup>

</script>

<template>
  <main>
    <h1 class="margin-bottom">Personajes<br/><em>Dragon Ball Z</em></h1>
    <p class="home-text">Descubre los personajes de Dragon Ball Z con todas sus transformaciones. Compite con ellos en nuestro apartado de batallas de cartas.</p>
    <img src="../assets/img/dragon-ball-4-stars.png" alt="ball-4stars" class="img-ball">
  </main>
</template>

<style scoped>

main {
  max-width: 768px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.margin-bottom {
  margin-bottom: 30px;
}

em {
  font-size: 100%;
  line-height: 1.2;
  color: var(--action-color);
}

.home-text {
  text-align: center;
  margin-bottom: 40px;
}

.img-ball {
  width: 60%;
}

</style>
