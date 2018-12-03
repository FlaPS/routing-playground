export {default as renderChildren, Renderable} from './renderChildren'
export {default as addKey} from './addKey'
export {default as usePrevious} from './usePrevious'
export {ExtractProps} from './extractProps'
export {default as caseRender} from './caseRender'
export {default as Dummy} from './Dummy'
export {Pure} from './Pure'
export * from './JSXHTMLElements'
import {curry} from 'ramda'
export type OnChange<T = string, E = Element> =
    (value: T, e?: React.ChangeEvent<E>) => any | OnValue<T>
export type OnValue<T = string> =
    (value: T) => any

export const onChangeCallback= <T = string>(onChangeCallback?: OnChange<T> | undefined) =>
    <E = Element>(e: React.ChangeEvent<E>) =>
        // @ts-ignore
        onChangeCallback && onChangeCallback(e['target']['value'], e as any)

export const onValueCallback = curry(
    <T = string>(onChangeCallback?: OnValue<T>, value?: T) =>
        () =>
            onChangeCallback && onChangeCallback(value!)
)

export const EMPTY_VALUE: any = Object.freeze({})