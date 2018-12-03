import * as React from 'react'

export default <P, K extends keyof P>(Comp: React.ComponentType<P>, key?: K) =>
    (props: P) =>
            React.createElement(
                Comp,
                Object.assign(
                    {key: key ? props[key] : JSON.stringify(props)},
                    props
                )
            )

