import React from 'react'

// @ts-ignore
const Memo = <P extends object>({Component, ...props}: {Component: React.ComponentType<P>} & P) =>
    React.createElement(Component, props)

export { Memo}