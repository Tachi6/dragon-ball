<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import {obtainCharacters, obtainCharacterInfo, characters} from '@/services/dragon_ball_services';
import {ref, onMounted, computed, watch} from 'vue';

const cards = ref([])
const playCards = ref([])
const gameCard = ref(0)
const playerCard = ref()
const computerCard = ref('')
const playerPoints = ref(0)
const computerPoints = ref(0)

const htmlCards = ref([])

const winnerContainer = ref()

onMounted(async () => {
  if (characters.length === 0){
    await obtainCharacters()
  }
  cards.value = characters
  sortCards()

  await obtainPlayingCards()

  htmlCards.value = document.querySelectorAll('.card')

  htmlCards.value.forEach((element, index) => {
    element.classList.add(`card${index}`)
  })

  winnerContainer.value = document.querySelector('.hand-winner p')
})

const sortElements = (elements) => {
  const result = [...elements]

  for (let i = 0; i < result.length; i++) {
    const newIndex = Math.floor(Math.random() * elements.length);
    const oldElement = result[newIndex]
    result[newIndex] = result[i]
    result[i] = oldElement
  }

  return result
}

const sortCards = () => {
  cards.value = sortElements(characters)
}

const obtainPlayingCards = async () => {
  const tempCards = cards.value.slice(0, 10)

  for (let i = 0; i < tempCards.length; i++) {
    if (tempCards[i].ki === tempCards[i].maxKi) {
      continue
    }

    const cardInfo = await obtainCharacterInfo(tempCards[i].id)

    if (cardInfo.transformations.length > 1) {
      cardInfo.transformations = sortElements(cardInfo.transformations)

      const editedCard = {
        id: tempCards[i].id,
        name: cardInfo.transformations[0].name === 'Base' ? tempCards[i].name : cardInfo.transformations[0].name,
        ki: cardInfo.transformations[0].ki,
        maxKi: tempCards[i].maxKi,
        race: tempCards[i].race,
        gender: tempCards[i].gender,
        description: tempCards[i].description,
        image: cardInfo.transformations[0].image,
        affiliation: tempCards[i].affiliation,
        deletedAt: null,
      }

      tempCards[i] = editedCard
      continue
    }

    const editedCard = {
      id: tempCards[i].id,
      name: tempCards[i].name,
      ki: Math.floor(Math.random() * 2) === 0 ? tempCards[i].ki : tempCards[i].maxKi,
      maxKi: tempCards[i].maxKi,
      race: tempCards[i].race,
      gender: tempCards[i].gender,
      description: tempCards[i].description,
      image: tempCards[i].image,
      affiliation: tempCards[i].affiliation,
      deletedAt: null,
    }

    tempCards[i] = editedCard
  }


  playCards.value = tempCards
}

const selectCard = () => playCards.value[gameCard.value]

const nextCard = () => {
  if (gameCard.value !== 0) {
    htmlCards.value[gameCard.value - 2].style.zIndex = 0
    htmlCards.value[gameCard.value - 1].style.zIndex = 0
  }

  htmlCards.value[gameCard.value].style.right = `calc(100% - ${240 + (gameCard.value * 5)}px)`
  htmlCards.value[gameCard.value].style.top = 'calc(100% - 336px)'
  document.querySelectorAll('.card-container .text-container')[gameCard.value].classList.remove('hidden')
  document.querySelectorAll('.card-container .image-container')[gameCard.value].classList.add('hidden')
  playerCard.value = selectCard()
  gameCard.value++

  setTimeout(() => {
    htmlCards.value[gameCard.value].style.right = `${(gameCard.value - 1) * 5}px`
    htmlCards.value[gameCard.value].style.top = 'calc(100% - 336px)'
    document.querySelectorAll('.card-container .text-container')[gameCard.value].classList.remove('hidden')
    document.querySelectorAll('.card-container .image-container')[gameCard.value].classList.add('hidden')
    computerCard.value = selectCard()
    gameCard.value++
  }, 500)

  setTimeout(() => {
    comparePoints(playerCard.value.ki, computerCard.value.ki)
  }, 1000)
}

const comparePoints = (playerKi, computerKi) => {
  const units = {
    'billion': 1_000_000_000,
    'trillion': 1_000_000_000_000,
    'quadrillion': 1_000_000_000_000_000,
    'quintillion': 1_000_000_000_000_000_000,
    'sextillion': 1_000_000_000_000_000_000_000,
    'septillion': 1_000_000_000_000_000_000_000_000,
    'octillion': 1_000_000_000_000_000_000_000_000_000,
    'googolplex': 1_000_000_000_000_000_000_000_000_000,
  }

  const tempPlayerPoints = playerKi.split(' ')
  if (tempPlayerPoints.length > 1) {
    playerKi = tempPlayerPoints[0] * units[tempPlayerPoints[1].toLowerCase()]
  }
  else {
    playerKi = playerKi.replaceAll('.', '')
    playerKi = playerKi.replaceAll(',', '')
    playerKi = parseInt(playerKi)
  }

  const tempComputerPoints = computerKi.split(' ')
  if (tempComputerPoints.length > 1) {
    computerKi = tempComputerPoints[0] * units[tempComputerPoints[1].toLowerCase()]
  }
  else {
    computerKi = computerKi.replaceAll('.', '')
    computerKi = computerKi.replaceAll(',', '')
    computerKi = parseInt(computerKi)
  }

  console.log(playerKi);
  console.log(computerKi);


  if (playerKi > computerKi) {
    playerPoints.value++
    if (gameCard.value <= 8) {
      winnerContainer.value.innerText = 'Jugador gana la mano'
      winnerContainer.value.style.opacity = '1'
      setTimeout(() => {
        winnerContainer.value.style.opacity = '0'
      }, 1000)
    }
  }
  else if (computerKi > playerKi) {
    computerPoints.value++
    if (gameCard.value <= 8) {
      winnerContainer.value.innerText = 'Computer gana la mano'
      winnerContainer.value.style.opacity = '1'
      setTimeout(() => {
        winnerContainer.value.style.opacity = '0'
      }, 1000)
    }
  }
  else {
    if (gameCard.value <= 8) {
      winnerContainer.value.innerText = 'La mano queda empatada'
      winnerContainer.value.style.opacity = '1'
      setTimeout(() => {
        winnerContainer.value.style.opacity = '0'
      }, 1000)
    }
  }
}

watch(gameCard, () => {
  if (gameCard.value === 9) {
    let winnerText = ''

    if (playerPoints.value > computerPoints.value) {
      winnerText = 'Jugador gana la partida'
    }
    else if (computerPoints.value > playerPoints.value) {
      winnerText = 'Computer gana la partida'
    }
    else {
      winnerText = 'La partida queda empatada'
    }

    winnerContainer.value.innerText = winnerText
    winnerContainer.value.style.opacity = '1'
  }
})

</script>

<template>
  <div class="board">
    <!-- <h2>Batalla</h2> -->
    <div class="playing-cards">
      <div class="game-cards">
        <CharacterCard class="card" v-for="(card, index) in playCards" :key="card.id" :class="`card${index}`" :character="card" :back-card="true" @click="nextCard"/>
      </div>
      <div class="scoreboard">
        <div class="points-box">
          <p>Player {{ playerPoints }}</p>
        </div>
        <p>VS</p>
        <div class="points-box">
          <p>Computer {{ computerPoints }}</p>
        </div>
      </div>
      <div class="hand-winner">
        <p>Jugador gana la mano</p>
      </div>
    </div>
    <!-- <CharacterCard class="player-card" v-if="playerCard !== undefined" :character="playerCard"/>
    <CharacterCard class="computer-card"/> -->
  </div>
</template>

<style scoped>

.board {
  margin-top: 20px;
}

.playing-cards {
  width: 80%;
  height: 780px;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  background-color: aquamarine;
  --container-width: clamp(240px, (((100vw - 40px) * 80) / 100), 992px);
  --secondary-width: calc((2400px - var(--container-width)) / 9);
  --tertiaty-width: calc(var(--container-width) - var(--secondary-width))
}

h2 {
  text-align: center;
}

.game-cards {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.scoreboard {
  height: 100%;
  width: 100%;
  background-color: cadetblue;
  align-self: flex-end;
  justify-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.points-box {
  width: 120px;
  margin: 0 60px;
  padding: 10px 10px;
  background-color: var(--action-color);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hand-winner {
  width: 100%;
  background-color: black;
}

.hand-winner p {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 120px;
  width: 120px;
  height: 96px;
  padding: 10px 10px;
  background-color: var(--action-color);
  text-align: center;
  opacity: 0;
  transition: 0.5s linear;
}

.points-box h5 {
  font-size: 1em;
  font-family: graphik-medium;
}

.points-box p {
  font-family: graphik-medium;
}

.card-container {
  transition: 0.5s linear;
}

.card {
  position: absolute;
  top: 0;
}

.card9 {
  right: calc((var(--tertiaty-width) / 10) * 0);
  z-index: 1;
}

.card8 {
  right: calc((var(--tertiaty-width) / 10) * 1);
  z-index: 2;
}

.card7 {
  right: calc((var(--tertiaty-width) / 10) * 2);
  z-index: 3;
}

.card6 {
  right: calc((var(--tertiaty-width) / 10) * 3);
  z-index: 4;
}

.card5 {
  right: calc((var(--tertiaty-width) / 10) * 4);
  z-index: 5;
}

.card4 {
  right: calc((var(--tertiaty-width) / 10) * 5);
  z-index: 6;
}

.card3 {
  right: calc((var(--tertiaty-width) / 10) * 6);
  z-index: 7;
}

.card2 {
  right: calc((var(--tertiaty-width) / 10) * 7);
  z-index: 8;
}

.card1 {
  right: calc((var(--tertiaty-width) / 10) * 8);
  z-index: 9;
}

.card0 {
  right: calc((var(--tertiaty-width) / 10) * 9);
  z-index: 10;
}


</style>
