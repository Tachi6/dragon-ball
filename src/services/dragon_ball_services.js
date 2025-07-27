import {dragonBallApiToCharacter} from '../mappers/dragonBallApiToCharacter'
import {dragonBallApiToCharacterList} from '../mappers/dragonBallApiToCharacterList'

export let totalPages = 0;
export let characters = []

export const obtainCharacters = async () => {
  const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=100')
  const data = await response.json()
  characters = dragonBallApiToCharacterList(data.items)
  totalPages = Math.ceil(data.items.length / 8)
}

export const obtainCharacterInfo = async (id) => {
  const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
  const data = await response.json()
  return dragonBallApiToCharacter(data)
}

export const obtainCharactersByPage = (page) => {
  return characters.slice(0 + ((page -1) * 8), 8 + ((page - 1) * 8))
}
