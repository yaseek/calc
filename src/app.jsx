import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { handleCalcMessage, sendValuesToCalculate } from './__data__/actions'
import { getRangeX, getRangeY, getStep, getData, getError } from './__data__/selectors'
import { CalcChart, CalcForm } from './components'
import calculatorWorker from './workers/calculator.worker'

import style from './app.module.scss'

const calculator = new calculatorWorker()

const mapStateToProps = (state) => ({
    rangeX: getRangeX(state),
    rangeY: getRangeY(state),
    step: getStep(state),
    data: getData(state),
    error: getError(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleCalcMessage,
    sendValuesToCalculate: sendValuesToCalculate(calculator),
}, dispatch)

export const AppComponent = ({
    rangeX,
    rangeY,
    step,
    data,
    error,
    handleCalcMessage,
    sendValuesToCalculate
}) => {

    useEffect(() => {
        calculator.addEventListener('message', handleCalcMessage)
    }, [])

    return (
        <div className={style.app}>
            <CalcForm onSubmit={sendValuesToCalculate} error={error} />
            <CalcChart
                rangeX={rangeX}
                rangeY={rangeY}
                step={step}
                data={data}
            />
        </div>
    )
}

AppComponent.propTypes = {
    rangeX: PropTypes.array,
    rangeY: PropTypes.array,
    step: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }))),
}

AppComponent.defaultProps = {
    rangeX: null,
    rangeY: null,
    step: 1,
    data: void 0,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
