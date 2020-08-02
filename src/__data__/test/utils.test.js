import { getChunks } from '../utils'

describe('utils', () => {
    it('getChunks', () => {
        expect(getChunks([1,2,3])).toEqual([[1,2,3]])
        expect(getChunks([null,2,3])).toEqual([[], [2,3]])
        expect(getChunks([1, null, 3])).toEqual([[1], [3]])
    })
})
