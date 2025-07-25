<script setup>
import CharacterCard from '../components/CharacterCard.vue'
import {obtainCharacters, obtainCharacterInfo, characters} from '@/services/dragon_ball_services';
import {ref, onMounted, computed, watch} from 'vue';

const cards = ref([])
const playCards = ref([])
const gameCard = ref(0)
const playerCard = ref()
const ComputerCard = ref('')
const board = ref()

onMounted(async () => {
  if (characters.length === 0){
    await obtainCharacters()
  }
  cards.value = characters
  sortCards()

  await obtainPlayingCards()

  document.querySelectorAll('.card').forEach((element, index) => {
    element.classList.add(`card${index}`)
    // element.style.position = 'absolute'
    // element.style.right = `${index * 100}`
  })
  // document.querySelectorAll('.specs').forEach((element) => element.classList.add('hidden') )
  // document.querySelectorAll('.image-container').forEach((element) => element.classList.remove('hidden') )
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

  tempCards.forEach(async (card) => {
    const cardInfo = await obtainCharacterInfo(card.id)

    if (cardInfo.transformations.length > 1) {
      cardInfo.transformations = sortElements(cardInfo.transformations)
      card.name = cardInfo.transformations[0].name
      card.image = cardInfo.transformations[0].image
      card.ki = cardInfo.transformations[0].ki
    }
  })

  // const newPayCards = tempCards.value.map(async (card) => {
  //   const cardInfo = await obtainCharacterInfo(cards.value[gameCard.value].id)

  //   if (cardInfo.transformations.length !== 0) {
  //     cardInfo.transformations = sortElements(cardInfo.transformations)
  //     card.name = card.transformations[0].name
  //     card.image = card.transformations[0].image
  //     card.ki = card.transformations[0].ki
  //   }
  // })

  playCards.value = tempCards
}

const selectCard = async () => {
  console.log(gameCard.value)
  const card = await obtainCharacterInfo(cards.value[gameCard.value].id)

  if (card.transformations.length !== 0) {
    const transformationsSorted = sortElements(card.transformations)
    card.transformations = transformationsSorted
    card.name = card.transformations[0].name
    card.image = card.transformations[0].image
    card.ki = card.transformations[0].ki
  }

  gameCard.value++
  console.log(card);

  return card
}

const nextCard = () => {
  playerCard.value = selectCard()
  // board.value.appendChild(CharacterCard)
}

</script>

<template>
  <div id="board">
    <h2>Batalla</h2>
    <div class="playing-cards">
      <CharacterCard class="card" v-for="(card, index) in playCards" :key="card.id" :class="`card${index}`" :character="card" :back-card="true" @click="nextCard"/>
    </div>
    <!-- <CharacterCard class="player-card" v-if="playerCard !== undefined" :character="playerCard"/>
    <CharacterCard class="computer-card"/> -->
  </div>
</template>

<style scoped>

.playing-cards {
  width: 80%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: aquamarine;
}
/* TODO: probar con variables */

.card9 {
  position: absolute;
  right: calc(calc(calc(100% - 240) / 10) * 0);
  z-index: 1;
  background-color: antiquewhite;
}

.card8 {
  position: absolute;
  right: 0%;
  z-index: 2;
}

.card7 {
  position: absolute;
  right: 10%;
  z-index: 3;
}

.card6 {
  position: absolute;
  right: 20%;
  z-index: 4;
}

.card5 {
  position: absolute;
  right: 30%;
  z-index: 5;
}

.card4 {
  position: absolute;
  right: 40%;
  z-index: 6;
}

.card3 {
  position: absolute;
  right: 50%;
  z-index: 7;
}

.card2 {
  position: absolute;
  right: 70%;
  z-index: 8;
}

.card1 {
  position: absolute;
  right: 80%;
  z-index: 9;
}

.card0 {
  position: absolute;
  right: 90%;
  z-index: 10;
}


</style>
