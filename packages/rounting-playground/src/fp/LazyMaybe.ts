import {F} from './types'

export class LazyMaybe<O, I, D = undefined> {

    static  NOTHING = 'nothing'

    static of<O, I, D = undefined>(f: F<O, I>, defaultValue: D = undefined) {
        return new LazyMaybe<O, I, D>(f, defaultValue)
    }

    constructor(
        private head: F<O, any>,
        private defaultValue?: D,
        private tail?: [F<any, I>, ...F<any, any>[]],
    ) {}

    map = <O2>(fn: F<O2, O>): LazyMaybe<O2, O, D> =>
        // @ts-ignore
        new LazyMaybe(fn, this.defaultValue, this.tail ? [this.head].concat(this.tail) : [this.head])

    // TODO implement cofunctor
    contramap =  <O2, I2, D>(fn: F<O2, I>): LazyMaybe<O2, I, D> =>
        // @ts-ignore
        new LazyMaybe(fn, this.defaultValue, this.tail ? this.tail.concat([this.head]) : [this.head])


    ap = (input: I) => {
        const list = [this.head].concat(this.tail || [])
        let result: any = input
        let i = list.length - 1
        while(result && i >= 0 ){
            result = list[i](result)
            i--
        }

        return result as O | D
    }


}

export default LazyMaybe