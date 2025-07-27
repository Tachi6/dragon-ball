export const dragonBallApiToCharacterList = (charactersList) => {

  const editedKi = charactersList.map((character) => {
    if (character.name.includes('Kaio-shin del')) {
      character.ki = '2.2 Billion'
      character.maxKi = '2.2 Billion'
    }
    if (character.name.includes('Kibito')) {
      character.ki = '375.000.000'
      character.maxKi = '375.000.000'
    }
    if (character.name.includes('Kaio del')) {
      character.ki = '6000'
      character.maxKi = '6000'
    }
    if (character.name.includes('Gran Kaio')) {
      character.ki = '10000'
      character.maxKi = '10000'
    }
    if (character.name.includes('Gran Kaio-shin')) {
      character.ki = '4 Billion'
      character.maxKi = '4 Billion'
    }

    return character
  })

  return editedKi
}
