/* eslint-disable no-restricted-globals */
self.addEventListener('message', calculate);

export const getRange = (data) => [Math.min(...data), Math.max(...data)]

export const validLexems = /(x|(?:\d+(?:\.\d*)*)|\+|\*|\/|-|\(|\)|sqrt|\^)/ig

export const getValidLexems = (formula) => formula
    .match(validLexems)
    .filter((value) => Boolean(value))
    .map((lexema) => {
        if (lexema === 'sqrt') {
            return 'Math.sqrt'
        }
        if (lexema === '^') {
            // It won't to be worked in IE
            return '**'
        }
        return lexema
    })
    .join(' ')


export const getEffectiveFunction = (formula) =>
    // eslint-disable-next-line no-new-func
    new Function('x', ['return', getValidLexems(formula.toLowerCase())].join(' '))

export const getFormulaData = ({ rangeX, step, formula }) => {
    if (!formula.trim()) {
        throw new Error('Formula is empty')
    }
    const fn = getEffectiveFunction(formula)
    const [min, max] = rangeX
    const dataArray = Array(Math.floor((max - min) / step))
        .fill(0)
        .map((val, idx) => {
            const x = min + step * idx
            const y = fn(x)
            if (y === Infinity || y === -Infinity || isNaN(y)) {
                return null
            }
            return { x, y }
        })
    dataArray.push({ x: max, y: fn(max) })

    return dataArray
}

export function calculate(event) {
    try {
        const { rangeX, formula, step } = event.data
        const data = getFormulaData({ rangeX, step, formula })
        const rangeY = getRange(data.filter((item) => Boolean(item)).map(({ y }) => y))
        const [minY, maxY] = rangeY
        this.postMessage({
            rangeX,
            rangeY: minY === maxY ? [minY - 1, maxY + 1] : rangeY,
            data,
            formula,
            step
        })
    } catch (error) {
        console.error(error)
        this.postMessage(new Error(`Formula error: ${error.message}`))
    }
}
/* eslint-enable */
