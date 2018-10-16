
const xor1bit = (a, b) => {
  return (a === b) ? 0 : 1
}

const xor = (numbers) => {
  const result = []
  for (let i = 0; i < numbers[0].length; i++) {
    let bit = 0
    for (let j = 0; j < numbers.length; j++) {
      bit = xor1bit(numbers[j][i], bit)
    }
    result[i] = bit
  }
  return result
}

const toBinary = (number, bits) => {
  const tail = (number, bits, result) => {
    if (bits < 1) {
      return result.reverse()
    }
    if (number % 2 === 1) {
      result.push(1)
      return tail((number - 1)/2, bits-1, result)
    } else {
      result.push(0)
      return tail(number/2, bits-1, result)
    }
  }
  return tail(number, bits, [])
}

const toDecimal = (number) => {
  const reversed = number.reverse()
  let result = 0
  for (let i = 0; i < reversed.length; i++) {
    result += ((2**i) * reversed[i])
  }
  return result
}

const encode = (number) => {
  const numbers = []
  const bits = Math.log2(number.length)
  for (let i = 0; i < number.length; i++) {
    const exponent = ((number.length - 1) - i)
    numbers.push(toBinary(exponent, bits).map((digit) => digit * number[i]))
  }
  return xor(numbers)
}

const diff = (a, b) => {
  const result = []
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      result.push(0)
    } else {
      result.push(1)
    }
  }
  return result
}

const flipBit = (bit) => {
  return bit === 0 ? 1 : 0
}

const flipDigit = (number, position) => {
  const bits = Math.log2(number.length)
  const encoded = encode(number)
  const positionInBinary = toBinary(position, bits)
  const difference = diff(encoded, positionInBinary)
  const positionToFlip = number.length - toDecimal(difference) - 1
  number[positionToFlip] = flipBit(number[positionToFlip])
  return number
}

const findPosition = (number) => {
  return toDecimal(encode(number))
}

const printLongNumber = (number) => {
  for (let i = 0; i < number.length; i++) {
    console.log('index:', i, 'digit:', number[i])
  }
  console.log('=================')
}

const annotatedFlipDigit = (number, position) => {
  console.log('original number:')
  printLongNumber(number)

  console.log('position to find', position)

  const bits = Math.log2(number.length)
  console.log('bits', bits)

  const encoded = encode(number)
  console.log('encoded', encoded)

  const positionInBinary = toBinary(position, bits)
  console.log('position in binary', positionInBinary)

  const difference = diff(encoded, positionInBinary)
  console.log('diff b/w encoded original and position', difference)

  const positionToFlip = number.length - toDecimal(difference) - 1
  console.log('position to flip', positionToFlip)

  number[positionToFlip] = flipBit(number[positionToFlip])

  return number


  return toDecimal(encode(number))
}

const testNumber = []
for (let i = 0; i < 64; i++) {
  testNumber.push(Math.round(Math.random()))
}

const positionToFind = Math.round(63 * Math.random())

const flippedNumber = annotatedFlipDigit(testNumber, positionToFind)
console.log('flipped number:')
printLongNumber(flippedNumber)

const foundPosition = findPosition(flippedNumber)
console.log('position to find:', positionToFind)
console.log('found position:', foundPosition)

describe('xor', () => {
  it('combines an array of n-bit numbers and returns a new n-bit number', () => {
    expect(xor([[0], [0], [0]])).toEqual([0])
    expect(xor([[1], [0], [0]])).toEqual([1])
    expect(xor([[0], [1], [0]])).toEqual([1])
    expect(xor([[1], [1], [0]])).toEqual([0])
    expect(xor([[0], [0], [1]])).toEqual([1])
    expect(xor([[1], [0], [1]])).toEqual([0])
    expect(xor([[0], [1], [1]])).toEqual([0])
    expect(xor([[1], [1], [1]])).toEqual([1])

    expect(xor([[0, 0], [0, 0]])).toEqual([0, 0])
    expect(xor([[0, 0], [0, 1]])).toEqual([0, 1])
    expect(xor([[0, 0], [1, 0]])).toEqual([1, 0])
    expect(xor([[0, 0], [1, 1]])).toEqual([1, 1])
    expect(xor([[0, 1], [0, 0]])).toEqual([0, 1])
    expect(xor([[0, 1], [0, 1]])).toEqual([0, 0])
    expect(xor([[0, 1], [1, 0]])).toEqual([1, 1])
    expect(xor([[0, 1], [1, 1]])).toEqual([1, 0])
    expect(xor([[1, 0], [0, 0]])).toEqual([1, 0])
    expect(xor([[1, 0], [0, 1]])).toEqual([1, 1])
    expect(xor([[1, 0], [1, 0]])).toEqual([0, 0])
    expect(xor([[1, 0], [1, 1]])).toEqual([0, 1])
    expect(xor([[1, 1], [0, 0]])).toEqual([1, 1])
    expect(xor([[1, 1], [0, 1]])).toEqual([1, 0])
    expect(xor([[1, 1], [1, 0]])).toEqual([0, 1])
    expect(xor([[1, 1], [1, 1]])).toEqual([0, 0])
  })
})

describe('toBinary', () => {
  it('converts a decimal number into a binary array of bits length', () => {
    expect(toBinary(0, 1)).toEqual([0])
    expect(toBinary(0, 2)).toEqual([0, 0])
    expect(toBinary(0, 3)).toEqual([0, 0, 0])

    expect(toBinary(1, 1)).toEqual([1])
    expect(toBinary(1, 2)).toEqual([0, 1])
    expect(toBinary(1, 3)).toEqual([0, 0, 1])

    expect(toBinary(2, 2)).toEqual([1, 0])
    expect(toBinary(2, 3)).toEqual([0, 1, 0])

    expect(toBinary(3, 2)).toEqual([1, 1])
    expect(toBinary(3, 3)).toEqual([0, 1, 1])

    expect(toBinary(4, 3)).toEqual([1, 0, 0])
    expect(toBinary(5, 3)).toEqual([1, 0, 1])
    expect(toBinary(6, 3)).toEqual([1, 1, 0])
    expect(toBinary(7, 3)).toEqual([1, 1, 1])
  })
})

describe('toDecimal', () => {
  it('converts a binary number to a decimal number', () => {
    expect(toDecimal([0, 0, 0])).toEqual(0)
    expect(toDecimal([0, 0, 1])).toEqual(1)
    expect(toDecimal([0, 1, 0])).toEqual(2)
    expect(toDecimal([0, 1, 1])).toEqual(3)
    expect(toDecimal([1, 0, 0])).toEqual(4)
    expect(toDecimal([1, 0, 1])).toEqual(5)
    expect(toDecimal([1, 1, 0])).toEqual(6)
    expect(toDecimal([1, 1, 1])).toEqual(7)
  })
})

describe('encode', () => {
  it('takes an 2^n-bit number and returns an n-bit number', () => {
    expect(encode([0, 0])).toEqual([0]) // 2^1 * 0 + 2^0 * 0 == xor([1] * 0, [0] * 0) == xor([[0], [0]]) == [0]
    expect(encode([0, 1])).toEqual([0]) // 2^1 * 0 + 2^0 * 1 == xor([1] * 0, [0] * 1) == xor([[0], [0]]) == [0]
    expect(encode([1, 0])).toEqual([1]) // 2^1 * 1 + 2^0 * 0 == xor([1] * 1, [0] * 0) == xor([[1], [0]]) == [1]
    expect(encode([1, 1])).toEqual([1]) // 2^1 * 1 + 2^0 * 1 == xor([1] * 1, [0] * 1) == xor([[1], [0]]) == [1]

    expect(encode([0, 0, 0, 0])).toEqual([0, 0]) // 2^3 * 0 + 2*2 * 0 + 2^1 * 0 + 2^0 * 0 == xor([1, 1]*0, [1, 0]*0, [0, 1]*0, [0, 0]*0) == xor([[0, 0], [0, 0], [0, 0], [0, 0]]) = [0, 0]
    expect(encode([0, 0, 0, 1])).toEqual([0, 0]) // 2^3 * 0 + 2*2 * 0 + 2^1 * 0 + 2^0 * 1 == xor([1, 1]*0, [1, 0]*0, [0, 1]*0, [0, 0]*1) == xor([[0, 0], [0, 0], [0, 0], [0, 0]]) = [0, 0]
    expect(encode([0, 0, 1, 0])).toEqual([0, 1]) // 2^3 * 0 + 2*2 * 0 + 2^1 * 1 + 2^0 * 0 == xor([1, 1]*0, [1, 0]*0, [0, 1]*1, [0, 0]*0) == xor([[0, 0], [0, 0], [0, 1], [0, 0]]) = [0, 1]
    expect(encode([0, 0, 1, 1])).toEqual([0, 1]) // 2^3 * 0 + 2*2 * 0 + 2^1 * 1 + 2^0 * 1 == xor([1, 1]*0, [1, 0]*0, [0, 1]*1, [0, 0]*1) == xor([[0, 0], [0, 0], [0, 1], [0, 0]]) = [0, 1]
    expect(encode([0, 1, 0, 0])).toEqual([1, 0]) // 2^3 * 0 + 2*2 * 1 + 2^1 * 0 + 2^0 * 0 == xor([1, 1]*0, [1, 0]*1, [0, 1]*0, [0, 0]*0) == xor([[0, 0], [1, 0], [0, 0], [0, 0]]) = [1, 0]
    expect(encode([0, 1, 0, 1])).toEqual([1, 0]) // 2^3 * 0 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 == xor([1, 1]*0, [1, 0]*1, [0, 1]*0, [0, 0]*1) == xor([[0, 0], [1, 0], [0, 0], [0, 0]]) = [1, 0]
    expect(encode([0, 1, 1, 0])).toEqual([1, 1]) // 2^3 * 0 + 2^2 * 1 + 2^1 * 1 + 2^0 * 0 == xor([1, 1]*0, [1, 0]*1, [0, 1]*1, [0, 0]*0) == xor([[0, 0], [1, 0], [0, 1], [0, 0]]) = [1, 1]
    expect(encode([0, 1, 1, 1])).toEqual([1, 1]) // 2^3 * 0 + 2^2 * 1 + 2^1 * 1 + 2^0 * 1 == xor([1, 1]*0, [1, 0]*1, [0, 1]*1, [0, 0]*1) == xor([[0, 0], [1, 0], [0, 1], [0, 0]]) = [1, 1]
    expect(encode([1, 0, 0, 0])).toEqual([1, 1]) // 2^3 * 1 + 2*2 * 0 + 2^1 * 0 + 2^0 * 0 == xor([1, 1]*1, [1, 0]*0, [0, 1]*0, [0, 0]*0) == xor([[1, 1], [0, 0], [0, 0], [0, 0]]) = [1, 1]
    expect(encode([1, 0, 0, 1])).toEqual([1, 1]) // 2^3 * 1 + 2*2 * 0 + 2^1 * 0 + 2^0 * 1 == xor([1, 1]*1, [1, 0]*0, [0, 1]*0, [0, 0]*1) == xor([[1, 1], [0, 0], [0, 0], [0, 0]]) = [1, 1]
    expect(encode([1, 0, 1, 0])).toEqual([1, 0]) // 2^3 * 1 + 2*2 * 0 + 2^1 * 1 + 2^0 * 0 == xor([1, 1]*1, [1, 0]*0, [0, 1]*1, [0, 0]*0) == xor([[1, 1], [0, 0], [0, 1], [0, 0]]) = [1, 0]
    expect(encode([1, 0, 1, 1])).toEqual([1, 0]) // 2^3 * 1 + 2*2 * 0 + 2^1 * 1 + 2^0 * 1 == xor([1, 1]*1, [1, 0]*0, [0, 1]*1, [0, 0]*1) == xor([[1, 1], [0, 0], [0, 1], [0, 0]]) = [1, 0]
    expect(encode([1, 1, 0, 0])).toEqual([0, 1]) // 2^3 * 1 + 2*2 * 1 + 2^1 * 0 + 2^0 * 0 == xor([1, 1]*1, [1, 0]*1, [0, 1]*0, [0, 0]*0) == xor([[1, 1], [1, 0], [0, 0], [0, 0]]) = [0, 1]
    expect(encode([1, 1, 0, 1])).toEqual([0, 1]) // 2^3 * 1 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 == xor([1, 1]*1, [1, 0]*1, [0, 1]*0, [0, 0]*1) == xor([[1, 1], [1, 0], [0, 0], [0, 0]]) = [0, 1]
    expect(encode([1, 1, 1, 0])).toEqual([0, 0]) // 2^3 * 1 + 2^2 * 1 + 2^1 * 1 + 2^0 * 0 == xor([1, 1]*1, [1, 0]*1, [0, 1]*1, [0, 0]*0) == xor([[1, 1], [1, 0], [0, 1], [0, 0]]) = [0, 0]
    expect(encode([1, 1, 1, 1])).toEqual([0, 0]) // 2^3 * 1 + 2^2 * 1 + 2^1 * 1 + 2^0 * 1 == xor([1, 1]*1, [1, 0]*1, [0, 1]*1, [0, 0]*1) == xor([[1, 1], [1, 0], [0, 1], [0, 0]]) = [0, 0]
  })
})

describe('flipDigit', () => {
  it('finds the correct position', () => {
    expect(findPosition(flipDigit([0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1], 0))).toEqual(0)

    expect(findPosition(flipDigit([0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1], 1))).toEqual(1)

    expect(findPosition(flipDigit([0, 0, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 0, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 0, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 0, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 0, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 0, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 0, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 0, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 0, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 1, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 0, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 1, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 0, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 1, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 0, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 0, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 0, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 0, 1, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 1, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 0, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 1, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 0, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 1, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 0, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 1, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 0, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 1, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 1, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 1, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 1, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([0, 1, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 1, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([0, 1, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([0, 1, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([0, 1, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([0, 1, 1, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 0, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 0, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 0, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 0, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 0, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 0, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 0, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 0, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 0, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 1, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 0, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 1, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 0, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 1, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 0, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 0, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 0, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 0, 1, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 1, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 0, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 1, 0, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 0, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 0, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 0, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 1, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 0, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 1, 0, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 0, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 0, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 0, 1], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 1, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 1, 0], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 1, 1, 0], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 1, 0], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 1, 0], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 1, 0], 3))).toEqual(3)

    expect(findPosition(flipDigit([1, 1, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 1, 1], 3))).toEqual(3)
    expect(findPosition(flipDigit([1, 1, 1, 1], 0))).toEqual(0)
    expect(findPosition(flipDigit([1, 1, 1, 1], 1))).toEqual(1)
    expect(findPosition(flipDigit([1, 1, 1, 1], 2))).toEqual(2)
    expect(findPosition(flipDigit([1, 1, 1, 1], 3))).toEqual(3)
  })
})