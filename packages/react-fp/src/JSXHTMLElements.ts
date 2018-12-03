import React from 'react'
import {ExtractProps} from './extractProps'

export const makeComponent = <K extends keyof JSX.IntrinsicElements>(tag: K) =>
    ((props: JSX.IntrinsicElements[K]) => React.createElement(tag, props)) as
        React.FunctionComponent<JSX.IntrinsicElements[K]>


export const Div = makeComponent('div')
export type  DivProps = ExtractProps<typeof Div>

export const Span = makeComponent('span')
export type  SpanProps = ExtractProps<typeof Span>

export const Section = makeComponent('section')
export type  SectionProps = ExtractProps<typeof Section>

export const Button = makeComponent('span')
export type  ButtonProps = ExtractProps<typeof Button>

export const HTMLInput = makeComponent('input')
export type  HTMLInputProps = ExtractProps<typeof HTMLInput>
