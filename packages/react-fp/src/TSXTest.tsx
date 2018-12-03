import React from 'react'

import {Memo} from './Memo'
const Test = (props: {value: number}) =>
    <div>{props.value}</div>

const A =
    <Memo Component={Test} value={12} />
