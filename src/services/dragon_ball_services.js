export let totalPages = 0;

export const obtainCharacters = async (page) => {
  const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}`)
  const data = await response.json()
  totalPages = data.meta.totalPages
  return data.items
}

export const obtainCharacterInfo = async (id) => {
  const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
  const data = await response.json()
  return data
}

