import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Field } from 'react-final-form'

import style from './calc-form.module.scss'

export const CalcForm = ({ onSubmit, error }) => (
    <div className={style.calcForm}>
        {error && <p className={style.error}>{error}</p>}
        <Form
            onSubmit={onSubmit}
            initialValues={{ step: 1, minX: 0, maxX: 100 }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>
                            <i>{'F(x):'}</i>
                            <Field
                                name="formula"
                                type="text"
                                component="input"
                                placeholder={'x * 3'}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            <i>{'Step:'}</i>
                            <Field
                                name="step"
                                type="number"
                                component="input"
                                min="0"
                                step="any"
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            <i>{'Range:'}</i>
                            <Field
                                name="minX"
                                type="number"
                                component="input"
                            />
                        </label>
                        <label>
                            {':'}
                            <Field
                                name="maxX"
                                type="number"
                                component="input"
                            />
                        </label>
                    </p>
                    <p>
                        <button>{'DRAW THE CHART'}</button>
                    </p>
                </form>
            )}
        />
    </div>
)

CalcForm.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.string,
}

CalcForm.defaultProps = {
    onSubmit: _.noop,
    error: void 0,
}
