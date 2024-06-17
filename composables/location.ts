const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_API_KEY

type PredictionResponse = {
  suggestions: {
    placePrediction: {
      text: {
        text: string
      }
    }
  }[]
}

export async function useLocation(searchText: string) {
  const result: PredictionResponse = await $fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: {
        input: searchText,
        includedRegionCodes: ['NG'],
      },
    },
  )
  const textValues = result.suggestions
    .map((item) => item.placePrediction.text.text)
    .map((place) => place.replace(/, Nigeria$/, ''))
  return textValues
}
