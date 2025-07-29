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
const cardsDescription = ref([])
const cardImages = ref([])
const deckContainer = ref()
const winnerContainer = ref()
const cardsStyles = ref([])

const loadHTMLelements = () => {
  cardsDescription.value = document.querySelectorAll('.card-container .text-container')
  cardImages.value = document.querySelectorAll('.card-container .image-container')
  htmlCards.value = document.querySelectorAll('.card')
  winnerContainer.value = document.querySelector('.hand-winner p')
  deckContainer.value = document.querySelector('.game-cards')

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


const resetCardsPosition = () => {
  cardsStyles.value.forEach((element, index) => {
    element.style.right = `calc((var(--tertiaty-width) / ${cards.value.length}) * ${cards.value.length - 1 - index})`
    element.style.top = '0'
    element.style.zIndex = `${cards.value.length - index}`
  })
}

const resetCardsPositionOrigin = () => {
  cardsStyles.value.forEach((element, index) => {
    element.style.right = `${(cards.value.length - 1 - index) * 3}px`
    element.style.top = '0'
    element.style.zIndex = `${cards.value.length - index}`
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


const sortPlayingCards = async () => {
  const tempCards = sortElements(cards.value)

  for (let i = 0; i < tempCards.length; i++) {
    if (tempCards[i].ki === tempCards[i].maxKi) {
      playCards.value[i].id = tempCards[i].id
      playCards.value[i].name = tempCards[i].name,
      playCards.value[i].ki = tempCards[i].ki
      playCards.value[i].maxKi = tempCards[i].maxKi
      playCards.value[i].race = tempCards[i].race
      playCards.value[i].gender = tempCards[i].gender
      playCards.value[i].description = tempCards[i].description
      playCards.value[i].image = tempCards[i].image
      playCards.value[i].affiliation = tempCards[i].affiliation
      playCards.value[i].deletedAt = null

      continue
    }

    const cardInfo = await obtainCharacterInfo(tempCards[i].id)

    if (cardInfo.transformations.length > 1) {
      cardInfo.transformations = sortElements(cardInfo.transformations)

      playCards.value[i].id = tempCards[i].id
      playCards.value[i].name = cardInfo.transformations[0].name === 'Base' ? tempCards[i].name : cardInfo.transformations[0].name
      playCards.value[i].ki = cardInfo.transformations[0].ki
      playCards.value[i].maxKi = tempCards[i].maxKi
      playCards.value[i].race = tempCards[i].race
      playCards.value[i].gender = tempCards[i].gender
      playCards.value[i].description = tempCards[i].description
      playCards.value[i].image = cardInfo.transformations[0].image
      playCards.value[i].affiliation = tempCards[i].affiliation
      playCards.value[i].deletedAt = null

      continue
    }

    playCards.value[i].id = tempCards[i].id
    playCards.value[i].name = tempCards[i].name
    playCards.value[i].ki = Math.floor(Math.random() * 2) === 0 ? tempCards[i].ki : tempCards[i].maxKi
    playCards.value[i].maxKi = tempCards[i].maxKi
    playCards.value[i].race = tempCards[i].race
    playCards.value[i].gender = tempCards[i].gender
    playCards.value[i].description = tempCards[i].description
    playCards.value[i].image = tempCards[i].image
    playCards.value[i].affiliation = tempCards[i].affiliation
    playCards.value[i].deletedAt = null
  }
}

const selectCard = () => playCards.value[gameCard.value]

const nextCard = () => {
  if (gameCard.value === cards.value.length) return

  if (gameCard.value !== 0) {
    htmlCards.value[gameCard.value - 2].style.zIndex = 0
    htmlCards.value[gameCard.value - 1].style.zIndex = 0
  }

  cardsStyles.value[gameCard.value].style.right = `calc(100% - ${240 + (gameCard.value * 2)}px)`
  cardsStyles.value[gameCard.value].style.top = 'calc(100% - 336px)'
  flipCards(gameCard.value)
  playerCard.value = selectCard()
  gameCard.value++

  htmlCards.value[gameCard.value].style.right = `${(gameCard.value - 1) * 2}px`
  htmlCards.value[gameCard.value].style.top = 'calc(100% - 336px)'
  flipCards(gameCard.value)
  computerCard.value = selectCard()
  gameCard.value++

  comparePoints(playerCard.value.ki, computerCard.value.ki)
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

  console.log(playerKi);
  console.log(computerKi);

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

  if (gameCard.value !== 10) {
    deckContainer.value.style.width = `calc(((var(--tertiaty-width) / ${playCards.value.length}) * ${9 - gameCard.value}) + 240px)`
  }

  if (gameCard.value === playCards.value.length && gameCard.value !== 0) {
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

    deckContainer.value.style.width = '0'
  }
})

const flipCards = (card) => {
  if (card !== undefined) {
    cardImages.value[card].classList.add('hidden')
    cardsDescription.value[card].classList.remove('hidden')
  }
  else {
    document.querySelectorAll('.card-container .image-container').forEach(element => element.classList.remove('hidden'))
    document.querySelectorAll('.card-container .text-container').forEach(element => element.classList.add('hidden'))
  }
}

const newGame = async () => {
  if (!showHintText.value) {
    flipCards()
    await obtainPlayingCards()
    resetCardsPositionOrigin()
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
    winnerContainer.value.style.opacity = '0'
    deckContainer.value.style.width = '100%'
  }, 500)
}

</script>

<template>
  <div class="board">
    <div class="playing-cards">
      <div v-show="showHintText" class="hint-text-container">
        <p class="hint-text">Pulsa en <b>Nueva partida</b> para barajar las cartas y comenzar la batalla. Una vez dentro del juego, pulsa en el mazo de cartas para mostrar las primeras 2 cartas que lucharan. El jugador con mayor <b>Ki</b> de las 2 cartas mostradas se anotará el punto. Si la puntuación de ambas cartas es igual, nadie se anota puntos. Sigue pulsando en el mazo para lanzar la mano de cartas del siguiente turno. Las cartas con transformaciones o <b>Ki</b> más alto que el del base, eligen al azar el <b>Ki</b> que adquieren, siendo este y no el <b>MaxKi</b> el valor para la batalla. Al final de la partida gane el jugador que acumula más puntos.</p>
      </div>
      <div v-show="!showHintText" class="game-cards" @click="nextCard">
        <CharacterCard class="card" v-for="(card, index) in playCards" :key="`c${index}`" :character="card" :back-card="true" :class="`card${index}`"/>
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
  --container-width: clamp(240px, (((100vw - 40px) * 80) / 100), 992px);
  --secondary-width: calc((2400px - var(--container-width)) / 9);
  --tertiaty-width: calc(var(--container-width) - var(--secondary-width))
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
  align-self: flex-end;
  z-index: 11;
  cursor: pointer;
}

.card-container {
  transition: 0.5s linear;
  cursor: default;
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
