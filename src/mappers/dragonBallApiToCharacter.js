export const dragonBallApiToCharacter = (dragonBallCharacter) => {

  const character = {
    characterName: dragonBallCharacter.name,
    ki: dragonBallCharacter.ki,
    race: dragonBallCharacter.race,
    description: dragonBallCharacter.description,
    image: dragonBallCharacter.image,
    originPlanet: dragonBallCharacter.originPlanet.name,
    transformations: dragonBallCharacter.transformations,
  }

  const baseCharacter = {
    id: character.id,
    name: 'Base',
    image: character.image,
    ki: character.ki,
    deletedAt: null
  }

  character.transformations.unshift(baseCharacter)

  const editedTransformations = character.transformations.map(transformation => {
    if (transformation.id === 4) {
      transformation.image = 'https://dokkan.wiki/assets/global/en/character/card/1026900/card_1026900_character.png'
      return transformation
    }
    if (transformation.id === 27) {
      transformation.image = 'https://es.dokkan.wiki/assets/global/es/character/card/1023390/card_1023390_character.png'
      return transformation
    }
    if (transformation.id === 40) {
      transformation.image = 'https://es.dokkan.wiki/assets/global/es/character/card/4020470/card_4020470_character.png'
      return transformation
    }
    return transformation
  })
  character.transformations = editedTransformations

  return character
}
