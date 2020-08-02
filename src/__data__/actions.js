import _ from 'lodash'

import * as types from './action-types'

export const handleCalcMessage = ({ data }) => (dispatch) => _.isError(data)
    ? dispatch({ type: types.CALCULATED_ERROR, data })  
    : dispatch({ type: types.CALCULATED, data })

export const sendValuesToCalculate = (worker) => (values) => (dispatch) => {
    const { formula, minX, maxX, step } = values
    if (!formula) {
        dispatch({ type: types.CALCULATED_ERROR, data: new Error('No formula!') })
        return
    }
    dispatch({ type: types.CALCULATE_START })
    worker.postMessage({ formula, rangeX: [Number(minX), Number(maxX)], step: Number(step) })
}
