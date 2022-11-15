const MIN = 1
const MAX = 999999

export const randomIntFromInterval = (min = MIN, max = MAX) => {
    const result = Math.floor(Math.random() * (max - min) + min)
    return result
}