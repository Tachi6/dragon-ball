<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import {obtainCharacters, obtainCharacterInfo, characters} from '@/services/dragon_ball_services';
import {ref, onMounted, watch} from 'vue';

const cards = ref([])
const playCards = ref([])

const gameCard = ref(0)
const playerCard = ref()
const computerCard = ref()
const playerPoints = ref(0)
const computerPoints = ref(0)
const boxText = ref('')
const showNewGameButton = ref(true)
const showHintText = ref(true)
const showHandWinner = ref(false)

const htmlCards = ref([])
const cardsStyles = ref([])
const cardsDescription = ref([])
const cardsImages = ref([])
const winnerContainer = ref()

const loadHTMLelements = () => {
  cardsDescription.value = document.querySelectorAll('.card-container .text-container')
  cardsImages.value = document.querySelectorAll('.card-container .image-container')
  htmlCards.value = document.querySelectorAll('.card')
  winnerContainer.value = document.querySelector('.hand-winner p')

  htmlCards.value.forEach((element, index) => {
    element.classList.add(`card${index}`)
    cardsStyles.value.push(document.querySelector(`.card${index}`))
  })
}

onMounted(async () => {
  if (characters.length === 0){
    await obtainCharacters()
  }

  cards.value = characters

  await obtainPlayingCards()

  loadHTMLelements()

  resetCardsPositionOrigin()
})


const resetCardsPositionOrigin = () => {
  cardsStyles.value.forEach((element, index) => {
    element.style.right = `calc(${(cards.value.length - 1 - index) * 3}px + 50%)`
    element.style.top = '0'
    element.style.zIndex = `${cards.value.length - index}`
    element.style.transform = 'translateX(86%)';
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
  })
}

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

const obtainPlayingCards = async () => {
  const tempCards = sortElements(cards.value)

  for (let i = 0; i < tempCards.length; i++) {
    if (tempCards[i].ki === tempCards[i].maxKi) {
      continue
    }

    const cardInfo = await obtainCharacterInfo(tempCards[i].id)

    if (cardInfo.transformations.length > 1) {
      cardInfo.transformations = sortElements(cardInfo.transformations)

      tempCards[i].name = cardInfo.transformations[0].name === 'Base' ? tempCards[i].name : cardInfo.transformations[0].name
      tempCards[i].ki = cardInfo.transformations[0].ki
      tempCards[i].image = cardInfo.transformations[0].image
    }
    else {
      tempCards[i].ki = Math.floor(Math.random() * 2) === 0 ? tempCards[i].ki : tempCards[i].maxKi
    }
  }
  playCards.value = tempCards
}

const selectCard = () => playCards.value[gameCard.value]

const nextCard = () => {
  if (gameCard.value === cards.value.length) return

  if (gameCard.value !== 0) {
    cardsStyles.value[gameCard.value - 1].style.zIndex = 0
    cardsStyles.value[gameCard.value - 2].style.zIndex = 0
  }

  moveCards()
  playerCard.value = selectCard()
  gameCard.value++

  moveCards()
  computerCard.value = selectCard()
  gameCard.value++

  comparePoints(playerCard.value.ki, computerCard.value.ki)
}

const moveCards = () => {
  cardsStyles.value[gameCard.value].style.transform = 'translate(0)'
  cardsStyles.value[gameCard.value].style.right = gameCard.value % 2 !== 0
  ? `${(gameCard.value - 1) * 1.5}px`
  : `calc(100% - ${240 + (gameCard.value * 1.5)}px)`
  cardsStyles.value[gameCard.value].style.top = 'calc(100% - 336px)'
  cardsStyles.value[gameCard.value].style.pointerEvents = 'none';
  cardsStyles.value[gameCard.value].style.cursor = 'default';
  flipCards(gameCard.value)
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

  playerKi = playerKi.replaceAll(',', '.').trim()
  computerKi = computerKi.replaceAll(',', '.').trim()

  const tempPlayerPoints = playerKi.split(' ')

  if (tempPlayerPoints.length > 1) {
    playerKi = tempPlayerPoints[0] * units[tempPlayerPoints[1].toLowerCase()]
  }
  else {
    playerKi = playerKi.replaceAll('.', '')
    playerKi = parseInt(playerKi)
  }

  const tempComputerPoints = computerKi.split(' ')

  if (tempComputerPoints.length > 1) {
    computerKi = tempComputerPoints[0] * units[tempComputerPoints[1].toLowerCase()]
  }
  else {
    computerKi = computerKi.replaceAll('.', '')
    computerKi = parseInt(computerKi)
  }

  if (playerKi > computerKi) {
    playerPoints.value++
    if (gameCard.value <= cards.value.length - 2) {
      boxText.value = 'Jugador gana la mano'
    }
  }
  else if (computerKi > playerKi) {
    computerPoints.value++
    if (gameCard.value <= cards.value.length - 2) {
      boxText.value = 'Computer gana la mano'
    }
  }
  else {
    if (gameCard.value <= cards.value.length - 2) {
      boxText.value = 'La mano queda empatada'
    }
  }
}

watch(gameCard, () => {
  if (gameCard.value === 2) {
    showHandWinner.value = true
    winnerContainer.value.style.opacity = '1'
  }

  if (gameCard.value === cards.value.length && gameCard.value !== 0) {
    if (playerPoints.value > computerPoints.value) {
      boxText.value = 'Jugador gana la partida'
    }
    else if (computerPoints.value > playerPoints.value) {
      boxText.value = 'Computer gana la partida'
    }
    else {
      boxText.value = 'La partida queda empatada'
    }

    showNewGameButton.value = true
  }
})

const flipCards = (card) => {
  if (card !== undefined) {
    cardsImages.value[card].classList.add('hidden')
    cardsDescription.value[card].classList.remove('hidden')
  }
  else {
    cardsImages.value.forEach(element => element.classList.remove('hidden'))
    cardsDescription.value.forEach(element => element.classList.add('hidden'))
  }
}

const newGame2 = async () => {
  flipCards()
  resetCardsPositionOrigin()
  // if (!showHintText.value) {
  //   flipCards()
  //   await obtainPlayingCards()
  //   resetCardsPositionOrigin()
  // }

  // showHintText.value = false

  // setTimeout(async () => {
  //   gameCard.value = 0
  //   playerCard.value = undefined
  //   computerCard.value = undefined
  //   playerPoints.value = 0
  //   computerPoints.value = 0
  //   boxText.value = ''
  //   showNewGameButton.value = false

  //   winnerContainer.value.style.opacity = '0'
  // }, 500)
}
const newGame = async () => {
  if (!showHintText.value) {
    flipCards()
    await obtainPlayingCards()
    resetCardsPositionOrigin()
    winnerContainer.value.style.opacity = '0'
  }

  showHintText.value = false

  setTimeout(async () => {
    gameCard.value = 0
    playerCard.value = undefined
    computerCard.value = undefined
    playerPoints.value = 0
    computerPoints.value = 0
    boxText.value = ''
    showNewGameButton.value = false

  }, 500)
}

</script>

<template>
  <div class="board">
    <div class="playing-cards">
      <div v-show="showHintText" class="hint-text-container">
        <p class="hint-text">Pulsa en <b>Nueva partida</b> para barajar las cartas y comenzar la batalla. Una vez dentro del juego, pulsa en el mazo de cartas para mostrar las primeras 2 cartas que lucharan. El jugador con mayor <b>Ki</b> de las 2 cartas mostradas se anotará el punto. Si la puntuación de ambas cartas es igual, nadie se anota puntos. Sigue pulsando en el mazo para lanzar la mano de cartas del siguiente turno. Las cartas con transformaciones o <b>Ki</b> más alto que el del base, eligen al azar el <b>Ki</b> que adquieren, siendo este y no el <b>MaxKi</b> el valor para la batalla. Al final de la partida gane el jugador que acumula más puntos.</p>
      </div>
      <div v-show="!showHintText" class="game-cards">
        <CharacterCard class="card" v-for="(card, index) in playCards" :key="`c${index}`" :character="card" :back-card="true" :class="`card${index}`" @click="nextCard"/>
      </div>
      <div class="scoreboard">
        <button class="points-box">Player {{ playerPoints }}</button>
        <Transition>
          <button v-show="showNewGameButton" class="new-game" @click="newGame">Nueva partida</button>
        </Transition>
        <button class="points-box">Computer {{ computerPoints }}</button>
      </div>
      <div class="hand-winner">
        <Transition>
          <p v-show="showHandWinner">{{ boxText }}</p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>

@keyframes flip-up {
  0% {
    transform: rotateY(180deg);
  }

  50% {
    transform: rotateY(90deg);
  }

  0% {
    transform: rotateY(0deg);
  }
}

@keyframes flip-down {
  0% {
    transform: rotateY(180deg);
  }

  50% {
    transform: rotateY(90deg);
  }

  0% {
    transform: rotateY(0deg);
  }
}

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
  justify-content: space-between;
  position: relative;
}

.hint-text-container {
  min-height: 336px;
  display: flex;
  background: url(../assets/img/z.svg);
  background-size: clamp(200px, 30vw, 320px);
  background-repeat: no-repeat;
  background-position: center;
}

.hint-text {
  text-align: center;
  align-self: center;
}

.game-cards {
  height: 336px;
  width: 100%;
}

.flip-up {
  animation-name: flip-up;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.flip-down {
  animation-name: flip-down;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.card-container {
  transition: 0.5s linear;
  cursor: pointer;
  transform: translateX(86%);
}

.card {
  position: absolute;
  top: 0;
  right: 0;
}

.scoreboard {
  width: 100%;
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.new-game {
  width: 120px;
  padding: 10px 10px;
}

.hand-winner {
  width: 100%;
  height: 336px;
}

.hand-winner p {
  width: 120px;
  height: 96px;
  margin: 120px auto;
  padding: 10px 10px;
  background-color: var(--action-color);
  text-align: center;
  opacity: 0;
}

/* Default Vue transition for v-show */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
