import _ from 'lodash'

export const getChunks = (data) => _(data)
    .reduce((acc, item) => {
        if (_.isNil(item)) {
            acc.push([])
        } else {
            _.last(acc).push(item)
        }
        return acc
    }, [[]])

