export async function getWeather(lat, lon) {
  // Garante que usamos a mesma variável de ambiente que está em .env
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=pt`;

  const response = await fetch(url)

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    const err = new Error('Erro ao buscar clima')
    err.details = text
    throw err
  }

  return response.json()
}