<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import {obtainCharacters, obtainCharacterInfo} from '@/services/dragon_ball_services';
import {ref, onMounted, watch} from 'vue';

const cards = ref([])
const playCards = ref([])

const gameCardNumber = ref(0)
const playerCard = ref()
const computerCard = ref()
const playerPoints = ref(0)
const computerPoints = ref(0)
const handWinnerText = ref('')
const showNewGameButton = ref(true)
const showHintText = ref(true)
const showHandWinner = ref(false)
const groupCards = ref(false)

const htmlCards = ref([])
const cardsStyles = ref([])
const cardsDescriptions = ref([])
const cardsImages = ref([])
const winnerTextContainer = ref()

const loadHTMLelements = () => {
  cardsDescriptions.value = document.querySelectorAll('.card-container .text-container')
  cardsImages.value = document.querySelectorAll('.card-container .image-container')
  htmlCards.value = document.querySelectorAll('.card-container')
  winnerTextContainer.value = document.querySelector('.hand-winner-container p')

  htmlCards.value.forEach((element, index) => {
    element.classList.add(`card${index}`)
    cardsStyles.value.push(document.querySelector(`.card${index}`))
  })
}

const obtainPlayingCards = async () => {
  const tempCards = sortCards(cards.value)

  for (let i = 0; i < tempCards.length; i++) {
    // Si la carta no te transformacions, ni Ki diferent, ja es valida
    if (tempCards[i].ki === tempCards[i].maxKi) {
      continue
    }

    const cardInfo = await obtainCharacterInfo(tempCards[i].id)

    // Si la carta te transformacions, obtinc les dades detallades, i agafo una random que sera la que jugara
    if (cardInfo.transformations.length > 1) {
      const randomIndex = Math.floor(Math.random() * cardInfo.transformations.length)

      const ki = cardInfo.transformations[randomIndex].ki
      const name = cardInfo.transformations[randomIndex].name === 'Base' ? tempCards[i].name : cardInfo.transformations[randomIndex].name
      const image = cardInfo.transformations[randomIndex].image

      tempCards[i] = obtainEditedCard(tempCards[i], ki, name, image)
    }
    // Si la carta te nomes la transfomació "base" que he creat jo , pero diferents Ki
    else {
      const ki = Math.floor(Math.random() * 2) === 0 ? tempCards[i].ki : tempCards[i].maxKi

      tempCards[i] = obtainEditedCard(tempCards[i], ki)
    }
  }
  playCards.value = tempCards
}

const resetCardsPositionToDeck = async () => {
  cardsStyles.value.forEach(async (element, index) => {
    element.style.top = '0'
    element.style.right = '50%'
    await delay(500)
    element.style.right = `calc(${(cards.value.length - 1 - index) * 3}px + 50%)`
    element.style.zIndex = `${cards.value.length - index}`
    element.classList.remove('flipUp')
    element.style.transform = 'translateX(86%)';
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
  })
}

const sortCards = (cards) => {
  const result = [...cards]

  for (let i = 0; i < result.length; i++) {
    const newIndex = Math.floor(Math.random() * cards.length);
    const oldElement = result[newIndex]
    result[newIndex] = result[i]
    result[i] = oldElement
  }

  return result
}

onMounted(async () => {
  cards.value = await obtainCharacters()

  await obtainPlayingCards()

  loadHTMLelements()

  resetCardsPositionToDeck()
})

const obtainEditedCard = (card, ki, name, image) => {
  return {
    id: card.id,
    name: name === undefined ? card.name : name,
    ki: ki,
    maxKi: card.maxKi,
    race: card.race,
    gender: card.gender,
    description: card.description,
    image: image === undefined ? card.image : image,
    affiliation: card.affiliation,
    deletedAt: null,
  }
}

const nextCard = () => {
  // Comprovo si queden cartes per jugar, per si de cas falla l'anulacio del click
  if (gameCardNumber.value === cards.value.length) return

  // Perque les cartes que ja estan jugades quedin sota de les noves que vindran
  if (gameCardNumber.value !== 0) {
    cardsStyles.value[gameCardNumber.value - 1].style.zIndex = 0
    cardsStyles.value[gameCardNumber.value - 2].style.zIndex = 0
  }

  // Torn del jugador
  moveCards()
  playerCard.value = playCards.value[gameCardNumber.value]
  gameCardNumber.value++

  // Torn de la computadora
  moveCards()
  computerCard.value = playCards.value[gameCardNumber.value]
  gameCardNumber.value++

  // Veure quina de les 2 cartes guanya
  comparePoints(playerCard.value.ki, computerCard.value.ki)
}

// Per voltejar les cartes que es vagin seleccionant
const flipCards = async (card) => {
  if (card !== undefined) {
    await delay(250)
    cardsImages.value[card].classList.add('hidden')
    cardsDescriptions.value[card].classList.remove('hidden')
  }
  else {
    await delay(250)
    cardsImages.value.forEach(element => element.classList.remove('hidden'))
    cardsDescriptions.value.forEach(element => element.classList.add('hidden'))
  }
}

// Per colocar les cartes voltejades al costat del jugador o la computadora
const moveCards = () => {
  cardsStyles.value[gameCardNumber.value].classList.add('flipUp')
  cardsStyles.value[gameCardNumber.value].style.transform = 'translate(0)'
  cardsStyles.value[gameCardNumber.value].style.right = gameCardNumber.value % 2 !== 0
  ? `${(gameCardNumber.value - 1) * 1.5}px`
  : `calc(100% - ${240 + (gameCardNumber.value * 1.5)}px)`
  cardsStyles.value[gameCardNumber.value].style.top = 'calc(100% - 336px)'
  cardsStyles.value[gameCardNumber.value].style.pointerEvents = 'none';
  cardsStyles.value[gameCardNumber.value].style.cursor = 'default';
  flipCards(gameCardNumber.value)
}

// He de parsejar els Ki i arreglar els strings per poder comparar quina carta guanya
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
    if (gameCardNumber.value <= cards.value.length - 2) {
      handWinnerText.value = 'Jugador gana la mano'
    }
  }
  else if (computerKi > playerKi) {
    computerPoints.value++
    if (gameCardNumber.value <= cards.value.length - 2) {
      handWinnerText.value = 'Computer gana la mano'
    }
  }
  else {
    if (gameCardNumber.value <= cards.value.length - 2) {
      handWinnerText.value = 'La mano queda empatada'
    }
  }
}

watch(gameCardNumber, () => {
  // Per treure la opacitat al quadre on va dient qui guanya la ma o la partida
  if (gameCardNumber.value === 2) {
    showHandWinner.value = true
    winnerTextContainer.value.style.opacity = '1'
  }

  // Per analitzar qui guanya la partida
  if (gameCardNumber.value === cards.value.length && gameCardNumber.value !== 0) {
    if (playerPoints.value > computerPoints.value) {
      handWinnerText.value = 'Jugador gana la partida'
    }
    else if (computerPoints.value > playerPoints.value) {
      handWinnerText.value = 'Computer gana la partida'
    }
    else {
      handWinnerText.value = 'La partida queda empatada'
    }

    showNewGameButton.value = true
  }
})

const newGame = async () => {
  // Nomes ho fa si no es la primera partida, recull les cartes i les volteja, i les remena
  if (!showHintText.value) {
    collectCards()
    await delay(1500)
    await obtainPlayingCards()
    resetCardsPositionToDeck()
    winnerTextContainer.value.style.opacity = '0'
  }

  showNewGameButton.value = false
  showHintText.value = false

  await delay(500)
  gameCardNumber.value = 0
  playerCard.value = undefined
  computerCard.value = undefined
  playerPoints.value = 0
  computerPoints.value = 0
  handWinnerText.value = ''
}

// Recollir les cartes i voltejar-les
const collectCards = async () => {
  cardsStyles.value.forEach((element, index) => element.style.right = index % 2 === 0 ? 'calc(100% - 240px)' : '0')
  await delay(500)
  groupCards.value = true
  flipCards()
  await delay(500)
  groupCards.value = false
}

// Per poder quadrar el final de les animacions amb les transicions i girs de cartes, utilitzant await
const delay = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

</script>

<template>
  <main class="game-board">
    <div v-show="showHintText" class="hint-text-container">
      <p class="hint-text">Pulsa en <b>Nueva partida</b> para barajar las cartas y comenzar la batalla. Una vez dentro del juego, pulsa en el mazo de cartas para mostrar las primeras 2 cartas que lucharan. El jugador con mayor <b>Ki</b> de las 2 cartas mostradas se anotará el punto. Si la puntuación de ambas cartas es igual, nadie se anota puntos. Sigue pulsando en el mazo para lanzar la mano de cartas del siguiente turno. Las cartas con transformaciones o <b>Ki</b> más alto que el del base, eligen al azar el <b>Ki</b> que adquieren, siendo este y no el <b>MaxKi</b> el valor para la batalla. Al final de la partida gane el jugador que acumula más puntos.</p>
    </div>
    <div v-show="!showHintText" class="game-cards">
      <CharacterCard v-for="(card, index) in playCards" :key="`c${index}`" :character="card" :back-card="true" :class="[{ flipDown: groupCards }, `card${index}`]" @click="nextCard"/>
    </div>
    <div class="scoreboard">
      <button class="points-box">Player {{ playerPoints }}</button>
      <Transition>
        <button v-show="showNewGameButton" class="new-game-button" @click="newGame">Nueva partida</button>
      </Transition>
      <button class="points-box">Computer {{ computerPoints }}</button>
    </div>
    <div class="hand-winner-container">
      <Transition>
        <p v-show="showHandWinner">{{ handWinnerText }}</p>
      </Transition>
    </div>
  </main>
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

.game-board {
  margin-top: 20px;
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

.card-container {
  transition: 0.5s linear;
  cursor: pointer;
  transform: translateX(86%);
  position: absolute;
  top: 0;
  right: 0;
}

.flipUp {
  animation-name: flip-up;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.flipDown {
  animation-name: flip-down;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
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

.new-game-button {
  width: 120px;
  padding: 10px 10px;
}

.hand-winner-container {
  width: 100%;
  height: 336px;
}

.hand-winner-container p {
  width: 120px;
  height: 96px;
  margin: 120px auto;
  padding: 10px 10px;
  background-color: var(--action-color);
  font-family: graphik-medium;
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
