
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

const toArray = (number) => {
  return number.split('').map((digit) => parseInt(digit))
}

const toString = (numArray) => {
  return numArray.join('')
}

const flipDigit = (number, position) => {
  const numArray = toArray(number)
  const bits = Math.log2(numArray.length)
  const encoded = encode(numArray)
  const positionInBinary = toBinary(position, bits)
  const difference = diff(encoded, positionInBinary)
  const positionToFlip = number.length - toDecimal(difference) - 1
  numArray[positionToFlip] = flipBit(numArray[positionToFlip])
  return toString(numArray)
}

const findPosition = (number) => {
  return toDecimal(encode(toArray(number)))
}

const annotatedFlipDigit = (number, position) => {
  console.log('original number:', number)
  console.log('position to find:', position)

  const whitespace = (n) => {
    const spaces = []
    for (let i = 0; i < n; i++) {
      spaces.push(' ')
    }
    return spaces.join('')
  }

  const numArray = toArray(number)

  const bits = Math.log2(numArray.length)
  console.log('encoded bit size:', bits)
  console.log('')

  const encoded = encode(numArray)
  console.log('              original number, encoded:', encoded)

  const positionInBinary = toBinary(position, bits)
  console.log('           position to find, in binary:', positionInBinary)

  const difference = diff(encoded, positionInBinary)
  console.log('diff b/w encoded original and position:', difference)

  console.log('')

  const positionToFlip = numArray.length - toDecimal(difference) - 1

  console.log('original number:', toString(numArray))
  numArray[positionToFlip] = flipBit(numArray[positionToFlip])
  console.log(' flipped number:', toString(numArray))
  const padding = whitespace(positionToFlip)
  console.log(padding + '                ' + ' ^')
  console.log(padding + 'flip bit @ index', positionToFlip)

  console.log('')

  return toString(numArray)
}

const testNumber = []
for (let i = 0; i < 64; i++) {
  testNumber.push(Math.round(Math.random()))
}

const positionToFind = Math.round(63 * Math.random())


const flippedNumber = annotatedFlipDigit(toString(testNumber), positionToFind)

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
    expect(findPosition(flipDigit('00', 0))).toEqual(0)
    expect(findPosition(flipDigit('00', 1))).toEqual(1)

    expect(findPosition(flipDigit('01', 0))).toEqual(0)
    expect(findPosition(flipDigit('01', 1))).toEqual(1)

    expect(findPosition(flipDigit('10', 0))).toEqual(0)
    expect(findPosition(flipDigit('10', 1))).toEqual(1)

    expect(findPosition(flipDigit('11', 0))).toEqual(0)
    expect(findPosition(flipDigit('11', 1))).toEqual(1)

    expect(findPosition(flipDigit('0000', 0))).toEqual(0)
    expect(findPosition(flipDigit('0000', 1))).toEqual(1)
    expect(findPosition(flipDigit('0000', 2))).toEqual(2)
    expect(findPosition(flipDigit('0000', 3))).toEqual(3)

    expect(findPosition(flipDigit('0001', 0))).toEqual(0)
    expect(findPosition(flipDigit('0001', 1))).toEqual(1)
    expect(findPosition(flipDigit('0001', 2))).toEqual(2)
    expect(findPosition(flipDigit('0001', 3))).toEqual(3)

    expect(findPosition(flipDigit('0010', 0))).toEqual(0)
    expect(findPosition(flipDigit('0010', 1))).toEqual(1)
    expect(findPosition(flipDigit('0010', 2))).toEqual(2)
    expect(findPosition(flipDigit('0010', 3))).toEqual(3)

    expect(findPosition(flipDigit('0011', 0))).toEqual(0)
    expect(findPosition(flipDigit('0011', 1))).toEqual(1)
    expect(findPosition(flipDigit('0011', 2))).toEqual(2)
    expect(findPosition(flipDigit('0011', 3))).toEqual(3)

    expect(findPosition(flipDigit('0100', 0))).toEqual(0)
    expect(findPosition(flipDigit('0100', 1))).toEqual(1)
    expect(findPosition(flipDigit('0100', 2))).toEqual(2)
    expect(findPosition(flipDigit('0100', 3))).toEqual(3)

    expect(findPosition(flipDigit('0101', 0))).toEqual(0)
    expect(findPosition(flipDigit('0101', 1))).toEqual(1)
    expect(findPosition(flipDigit('0101', 2))).toEqual(2)
    expect(findPosition(flipDigit('0101', 3))).toEqual(3)

    expect(findPosition(flipDigit('0110', 0))).toEqual(0)
    expect(findPosition(flipDigit('0110', 1))).toEqual(1)
    expect(findPosition(flipDigit('0110', 2))).toEqual(2)
    expect(findPosition(flipDigit('0110', 3))).toEqual(3)

    expect(findPosition(flipDigit('0111', 0))).toEqual(0)
    expect(findPosition(flipDigit('0111', 1))).toEqual(1)
    expect(findPosition(flipDigit('0111', 2))).toEqual(2)
    expect(findPosition(flipDigit('0111', 3))).toEqual(3)

    expect(findPosition(flipDigit('1000', 0))).toEqual(0)
    expect(findPosition(flipDigit('1000', 1))).toEqual(1)
    expect(findPosition(flipDigit('1000', 2))).toEqual(2)
    expect(findPosition(flipDigit('1000', 3))).toEqual(3)

    expect(findPosition(flipDigit('1001', 0))).toEqual(0)
    expect(findPosition(flipDigit('1001', 1))).toEqual(1)
    expect(findPosition(flipDigit('1001', 2))).toEqual(2)
    expect(findPosition(flipDigit('1001', 3))).toEqual(3)

    expect(findPosition(flipDigit('1010', 0))).toEqual(0)
    expect(findPosition(flipDigit('1010', 1))).toEqual(1)
    expect(findPosition(flipDigit('1010', 2))).toEqual(2)
    expect(findPosition(flipDigit('1010', 3))).toEqual(3)

    expect(findPosition(flipDigit('1011', 0))).toEqual(0)
    expect(findPosition(flipDigit('1011', 1))).toEqual(1)
    expect(findPosition(flipDigit('1011', 2))).toEqual(2)
    expect(findPosition(flipDigit('1011', 3))).toEqual(3)

    expect(findPosition(flipDigit('1100', 0))).toEqual(0)
    expect(findPosition(flipDigit('1100', 1))).toEqual(1)
    expect(findPosition(flipDigit('1100', 2))).toEqual(2)
    expect(findPosition(flipDigit('1100', 3))).toEqual(3)

    expect(findPosition(flipDigit('1101', 0))).toEqual(0)
    expect(findPosition(flipDigit('1101', 1))).toEqual(1)
    expect(findPosition(flipDigit('1101', 2))).toEqual(2)
    expect(findPosition(flipDigit('1101', 3))).toEqual(3)

    expect(findPosition(flipDigit('1110', 0))).toEqual(0)
    expect(findPosition(flipDigit('1110', 1))).toEqual(1)
    expect(findPosition(flipDigit('1110', 2))).toEqual(2)
    expect(findPosition(flipDigit('1110', 3))).toEqual(3)

    expect(findPosition(flipDigit('1111', 0))).toEqual(0)
    expect(findPosition(flipDigit('1111', 1))).toEqual(1)
    expect(findPosition(flipDigit('1111', 2))).toEqual(2)
    expect(findPosition(flipDigit('1111', 3))).toEqual(3)
  })
})