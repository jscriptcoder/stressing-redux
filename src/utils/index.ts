// generates unique ids
export const uid = (): number => Date.now()

// generates random integers between min and max (inclusive)
export const random = (min, max): number => Math.floor(Math.random() * (max - min + 1)) + min