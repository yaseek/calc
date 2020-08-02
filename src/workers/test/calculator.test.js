import * as calc from '../calculator.worker.js'

describe('calculator.worker', () => {
    it('getRange', () => {
        expect(calc.getRange).toBeDefined()
    })

    it('getValidLexems', () => {
        expect(calc.getValidLexems('x*3')).toBe('x * 3')
        expect(calc.getValidLexems('x^3')).toBe('x ** 3')
        expect(calc.getValidLexems('sqrt(x)*3')).toBe('Math.sqrt ( x ) * 3')
    })

    it('getEffectiveFunction', () => {
        const fn = calc.getEffectiveFunction('x*3')
        expect(fn).toEqual(expect.any(Function))
        expect(fn(3)).toBe(9)
    })

    it('getFormulaData', () => {
        expect(() => calc.getFormulaData({ formula: '' })).toThrow()
        expect(calc.getFormulaData({ rangeX: [0, 3], step: 1, formula: 'x*3' }))
            .toEqual([{"x": 0, "y": 0}, {"x": 1, "y": 3}, {"x": 2, "y": 6}, {"x": 3, "y": 9}])
    })
})
