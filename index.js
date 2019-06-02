const _ = require('lodash')

const v = 'vvv'
const x = 'xxx'
const d = 'ddd'
const c = 'ccc'
const t = 'ttt'
const n = 'nnn'

const colors = [v, x, d, c, t, n]
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

const givenResults = [
  { test: [t,d,x,t], result: 'y' },
  { test: [v,n,t,x], result: 'yyy' },
  { test: [x,c,t,v], result: 'yyy' },
  { test: [n,x,v,c], result: 'xyy' },
]

// const givenResults = [
//   { test: [t,v,v,c], result: 'xyy' },
//   { test: [v,c,n,x], result: 'yy' },
//   { test: [n,t,c,v], result: 'yyy' },
//   { test: [c,c,t,v], result: 'xxy' },
//   { test: [d,c,v,d], result: 'yy' },
// ]

// const colors = _.uniq(_.flatten(_.concat(_.map(givenResults, 'test'))))

const resultLength = 4

function testCondition(input, givenResult) {
  // let testResult = ''.padEnd(resultLength, '_');
  const currentTest = givenResult.test
  // console.log('========', currentTest, '===', givenResult.result)
  // console.log({ input });
  let testResult = ''

  for (let i = 0; i < resultLength; i++) {
    if (currentTest[i] === input[i]) {
      testResult = 'x' + testResult
    } else {
      if (input.includes(currentTest[i])) {
        testResult = testResult + 'y'
      }
    }
  }

  testResult = testResult.padEnd(resultLength, '_')

  const currentResult = givenResult.result.padEnd(resultLength, '_')
  // console.log(testResult, currentResult);
  return {
    input,
    test_: givenResult.test,
    testResult___: testResult,
    currentResult,
    matched: testResult === currentResult,
  }
}

function getRandomResult() {
  let randomColor = []
  if (isHaveSameColor) {
    while (randomColor.length < resultLength) {
      const currentCollor = _.shuffle(colors)[0]
      randomColor.push(currentCollor)
    }
  }
  else {
   randomColor =  _.shuffle(colors).slice(0, resultLength);
  }
  return randomColor
}

let finalResult = null
let maxIteration = 0
let currentIteration = 0
let isHaveSameColor = false

function doGuess(givenResult) {
  // const testResult = givenResult.result;
  console.log(testResult);
  const matchColors = (testResult.match(/y/g) || []).length;
  const matchPosition = (testResult.match(/x/g) || []).length;

  console.log({matchColors, matchPosition});
}

while (!finalResult && currentIteration < maxIteration) {
  const randomResult = getRandomResult()
  // const randomResult = [c,x,n,d];

  const totalResult = _.map(givenResults, (result) => {
    return testCondition(randomResult, result)
  })

  const correctResult = _.filter(totalResult, 'matched')

  if (correctResult.length === givenResults.length) {
    finalResult = randomResult
  }

  currentIteration++
}

console.log(doGuess())

// console.log({
//   currentIteration,
//   finalResult,
// })
