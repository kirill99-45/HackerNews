import { randomIntFromInterval } from '../../helpers/randomIntFromInterval';


/// Building a tree to count comments

export const getCommentsTree = (data) => {

    const tree = {}

    data?.kids?.forEach(item => {
        const parentNode = ParentComment(item)
        tree.parents = tree.parents ? [...tree.parents, parentNode] : [parentNode]
    })

    generatedArray.length = 0
    return tree
}

const generatedArray = []

const getUniqId = () => {
    const result = randomIntFromInterval()
    if (!generatedArray.includes(result)) {
        generatedArray.push(result)
        return result
    } return getUniqId()
}

const ParentComment = (comment) => {
    const ID = getUniqId()

    const parentComment = {
        root: comment,
        isVisible: false,
        id: ID
    }
    if (comment.kids) {
        parentComment.kids = comment.kids.date.map(item => getKids(item)).filter(item => item !== null)
    } return parentComment
}

const getKids = (comment) => {

    if (comment.deleted || comment.dead) return null
    if (comment.kids) {
        return ParentComment(comment)
    } return comment
}


/// Counting the number of comments

export const getCountOfComment = (element, counter) => {

    if (element.dead || element.deleted) return counter
    if (element.kids) {
        counter = element.kids.date.reduce((acc, item) => {
            return getCountOfComment(item, acc)
        }, counter)
    }
    return counter + 1;
}

// Human readeble time format


const validate = (string ,number) => { // Is the number multiple
    if (number > 1) {
      return string
    } return string.split('').map((item, index) => index === string.length - 1 ? '' : item).join('')
  }
  
  const getSybmol = (length, currentPos) => { // Get words\symbols which divide the result string
    if ((length - currentPos) === 1) {
      return ''
    } else if ((length - currentPos) === 2) {
      return ` and`
    } return ','
  }
  
  const getTime = (obj) => { // Get the result string
    const cash = {}
    let string = ''
     Object.keys(obj).forEach(item => obj[item] > 0 ? cash[item] = obj[item] : '')
     Object.keys(cash).forEach((item, index) => {
      string += `${cash[item]} ${validate(item, cash[item])}${getSybmol(Object.keys(cash).length, index)} `
    })
    return string.trim()
  }
  
  const getMult = (string) => { // Get Multiplier for current item
    if (string === 'years') return 31536000
    if (string === 'days') return 86400
    if (string === 'hours') return 3600
    if (string === 'minutes') return 60
  }
  
export const formatDuration = (seconds) => {
    if (seconds === 0) return 'now'
    else {
      const variable = { years : 0, days : 0, hours : 0, minutes : 0 }
  
      Object.keys(variable).forEach(item => {
        variable[item] = Math.floor(seconds / getMult(item))
        seconds -= variable[item] * getMult(item)
      })
  
      variable.seconds = seconds
      return getTime(variable)
    }
  }

