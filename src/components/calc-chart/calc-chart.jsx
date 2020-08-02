import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import style from './calc-chart.module.scss'

const CHART_HEIGHT = 300
const CHART_WIDTH = 500

const scale = (ratio, invertAxis) => (value) => {
    const axisValue = value * ratio
    return invertAxis
    ? invertAxis - axisValue
    : axisValue
}

const getPath = (data, scaleX, scaleY) => {
    const first = _.first(data)
    return _.isNil(first)
        ? void 0
        : `M ${scaleX(first.x)},${scaleY(first.y)} ` +
            _(data)
                .drop()
                .map(({ x, y }) => `L ${scaleX(x)},${scaleY(y)}`)
                .join(' ')
}

export const CalcChart = (props) => {
    const { rangeX, rangeY, data } = props
    
    if (!data) {
        return <div className={style.calcChart} />
    }

    const [minX, maxX] = rangeX
    const [minY, maxY] = rangeY
    const scaleX = scale(CHART_WIDTH / ( maxX - minX ))
    const scaleY = scale(CHART_HEIGHT / ( maxY - minY ), CHART_HEIGHT)

    return (
        <div className={style.calcChart}>
            <svg viewBox={`${scaleX(minX)} ${scaleY(maxY)} ${CHART_WIDTH} ${CHART_HEIGHT}`}>
                {_.map(data, (lineData) => (
                    <g strokeWidth="2" stroke="green" key={_.uniqueId()}>
                        <path fill="none" d={getPath(lineData, scaleX, scaleY)} />
                    </g>
                ))}
            </svg>
            <div className={style.axisX}>
                {_.map(rangeX, (value, key) => <span key={key} className={style.bound}>{_.round(value, 2)}</span>)}
            </div>
            <div className={style.axisY}>
                {_.map(_.reverse(rangeY), (value, key) => <span key={key} className={style.bound}>{_.round(value, 2)}</span>)}
            </div>
        </div>
    )
}

CalcChart.propTypes = {
    rangeX: PropTypes.array,
    rangeY: PropTypes.array,
    step: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }))),
}

CalcChart.defaultProps = {
    rangeX: null,
    rangeY: null,
    data: null,
    step: 1,
}