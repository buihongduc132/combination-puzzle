const _ = require('lodash')

const v = 'vvv'
const x = 'xxx'
const d = 'ddd'
const c = 'ccc'
const t = 'ttt'
const n = 'nnn'

const colors = [v, x, d, c, t, n]
let finalResult = []
const MAX_NUMBER_OF_COLORS = 8
let iteratedNumber = 0
let resultLength = 0;

// const givenResults = [
//   {
//     test: [v, x, d, d],
//     result: 'xyy',
//   },
//   {
//     test: [d, c, v, x],
//     result: 'yyyy',
//   },
//   {
//     test: [x, d, v, c],
//     result: 'yyyy',
//   },
// ]

// const givenResults = [
//   { test: [t,d,x,t], result: 'y' },
//   { test: [v,n,t,x], result: 'yyy' },
//   { test: [x,c,t,v], result: 'yyy' },
//   { test: [n,x,v,c], result: 'xyy' },
// ]

// 25
const givenResults = [
  { test: [x,d,t,v], result: 'y' },
  { test: [d,v,c,n], result: 'xy' },
  { test: [n,c,d,x], result: 'xy' },
  { test: [v,x,n,d], result: 'y' },
  { test: [d,n,c,d], result: 'xx' },
]

// // 26
// const givenResults = [
//   { test: [t, v, v, c], result: 'xyy' },
//   { test: [v, c, n, x], result: 'yy' },
//   { test: [n, t, c, v], result: 'yyy' },
//   { test: [c, c, t, v], result: 'xxy' },
//   { test: [d, c, v, d], result: 'yy' },
// ]

// // 27
// const givenResults = [
//   { test: [v,t,d,x], result: 'yy' },
//   { test: [t,d,x,c], result: 'xyy' },
//   { test: [c,x,t,n], result: 'xyy' },
//   { test: [d,c,n,t], result: 'yyy' },
// ]

function testCondition(input, givenResult) {
  const currentTest = givenResult.test
  let testResult = ''

  for (let i = 0; i < resultLength; i++) {
    if (currentTest[i] === input[i]) {
      testResult = 'x' + testResult
    } else {
      if (currentTest.includes(input[i])) {
        testResult = testResult + 'y'
      }
    }
  }

  testResult = testResult.padEnd(resultLength, '_')

  const currentResult = givenResult.result.padEnd(resultLength, '_')

  return {
    input,
    test_: givenResult.test,
    testResult___: testResult,
    currentResult,
    matched: testResult === currentResult,
  }
}


for (let i = 1; i <= MAX_NUMBER_OF_COLORS && finalResult.length === 0; i++) {
  resultLength = i;
  const caseOptions = _.fill(Array(i), colors)

  const allCases = _.map(allPossibleCases(caseOptions), (possibleCase) => possibleCase.split('_'))

  _.map(allCases, function(thisCase) {
    const randomResult = thisCase

    const totalResult = _.map(givenResults, (result) => {
      return testCondition(randomResult, result)
    })

    const correctResult = _.filter(totalResult, 'matched')

    if (correctResult.length === givenResults.length) {
      finalResult.push(thisCase)
    }
    iteratedNumber++
  })
}

console.log({
  finalResult,
  iteratedNumber,
})

function allPossibleCases(arr) {
  if (arr.length === 0) {
    return []
  } else if (arr.length === 1) {
    return arr[0]
  } else {
    let result = []
    let allCasesOfRest = allPossibleCases(arr.slice(1)) // recur with the rest of array
    for (let c in allCasesOfRest) {
      for (let i = 0; i < arr[0].length; i++) {
        result.push(arr[0][i] + '_' + allCasesOfRest[c])
      }
    }
    return result
  }
}
