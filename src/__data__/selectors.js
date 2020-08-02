import _ from 'lodash'
import { createSelector } from 'reselect'

export const getSlice = (id) => createSelector(_.identity, (state) => _.get(state, id))

export const getRangeX = getSlice('rangeX')
export const getRangeY = getSlice('rangeY')
export const getStep = getSlice('step')
export const getData = getSlice('data')
export const getError = getSlice('error')
