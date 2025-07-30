import {dragonBallApiToCharacter} from '../mappers/dragonBallApiToCharacter'
import {dragonBallApiToCharacterList} from '../mappers/dragonBallApiToCharacterList'

const characters = []
const charactersInfo = []

export const obtainCharacters = async () => {
  if (characters.length > 0) return characters

  const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=100')
  const data = await response.json()
  const result = dragonBallApiToCharacterList(data.items)
  result.forEach(character => characters.push(character))

  return result
}

export const obtainCharacterInfo = async (id) => {
  const characterIndex = charactersInfo.findIndex(character => character.id === parseInt(id))
  if (characterIndex >= 0) {
    const clone = {...charactersInfo[characterIndex]}
    return clone
  }
  const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
  const data = await response.json()
  const result = dragonBallApiToCharacter(data)
  charactersInfo.push(result)

  return result
}

export const obtainCharactersByPage = (page) => {
  return characters.slice(0 + ((page -1) * 8), 8 + ((page - 1) * 8))
}
