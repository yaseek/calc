import _ from 'lodash'

import { getChunks } from './utils'
import * as types from './action-types'

const initialState = {
    error: null,
    rangeX: null,
    rangeY: null,
    step: 0,
    data: null,
}

export default (state = initialState, action) => _.invoke({
    [types.CALCULATE_START]: () => ({
        ...initialState
    }),

    [types.CALCULATED_ERROR]: ({ data }) => ({
        ...state,
        error: data.message
    }),

    [types.CALCULATED]: ({ data: { rangeX, rangeY, step, formula, data } }) => ({
        ...state,
        rangeX,
        rangeY,
        step,
        data: getChunks(data),
        formula,
    }),
}, action.type, action) || state
