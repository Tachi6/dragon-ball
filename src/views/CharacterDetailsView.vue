<template>
  <div class="character-details">
    <div class="details-text">
      <h2>Goku</h2>
      <h3>Saiyan - Male</h3>
      <p class="description">El protagonista de la serie, conocido por su gran poder y personalidad amigable. Originalmente enviado a la Tierra como un infante volador con la misión de conquistarla. Sin embargo, el caer por un barranco le proporcionó un brutal golpe que si bien casi lo mata, este alteró su memoria y anuló todos los instintos violentos de su especie, lo que lo hizo crecer con un corazón puro y bondadoso, pero conservando todos los poderes de su raza. No obstante, en la nueva continuidad de Dragon Ball se establece que él fue enviado por sus padres a la Tierra con el objetivo de sobrevivir a toda costa a la destrucción de su planeta por parte de Freeza. Más tarde, Kakarot, ahora conocido como Son Goku, se convertiría en el príncipe consorte del monte Fry-pan y líder de los Guerreros Z, así como el mayor defensor de la Tierra y del Universo 7, logrando mantenerlos a salvo de la destrucción en innumerables ocasiones, a pesar de no considerarse a sí mismo como un héroe o salvador.</p>
      <div class="specs">
        <div>
          <h4>1M +</h4>
          <p class="label">Ataque</p>
        </div>
        <div>
          <h4>- 7 -</h4>
          <p class="label">Transformaciones</p>
        </div>
        <div>
          <h4>5K +</h4>
          <p class="label">Defensa</p>
        </div>
      </div>
    </div>
    <div class="details-image">
      <img src="https://dragonball-api.com/characters/goku_normal.webp" alt="goku" class="character-image">
    </div>
  </div>
</template>

<style scoped>
  @font-face {
    font-family: mulish-extrabold;
    src: url(../assets/fonts/Mulish-ExtraBold.ttf);
  }

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
    color: #D9B346;
    text-align: left;
    font-weight: bolder;
    font-size: 4em;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }

  h3 {
    color: white;
    text-align: left;
    font-size: 3em;
    line-height: 1.2;
    letter-spacing: 0.2px;
  }

  h4 {
    font-size: 2em;
    font-weight: bolder;
    color: #D9B346;
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
