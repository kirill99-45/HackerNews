const UNIX_TIME_START = 1970

const MONTHS = ['jan ', 'feb ', 'mar ', 'apr ', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']

const getZero = (time) => time > 9 ? time : `0:${time}`

export const getTime = (time) => {

    const year = Math.floor(time / 31556736)
    const month = Math.floor((time - (year * 31556736)) / 2630016)
    const day = Math.ceil((time - ((year * 31556736) + (month * 2630016))) / 86400)

    return `${getZero(day)} ${MONTHS[month]} ${year + UNIX_TIME_START}`

}

export const getColor = (rating) => {
    if (rating < 3) return '#d8f3dc'
    if (rating < 5) return '#b7e4c7 '
    if (rating < 10) return '#95d5b2'
    if (rating > 10) return '#52b788'
}

export const getScore = (number) => {
    if (number > 1000) return `${Math.floor(number / 1000)}k`
    return number
}