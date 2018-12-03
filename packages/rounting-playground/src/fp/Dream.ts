import {compose} from 'lazy-compose'
import {F} from './types'

export class Dream<O, I> {
 
    private static EMPTY = Dream.of( value => value)

    value: F<O, I>

    constructor(x: F<O, I>) {
      this.value = x
    }

    static of<O , I>(x: F<O, I>) {
      return new Dream<O, I>(x)
    }

    empty = () => Dream.EMPTY

    fold = (input: I) =>
      this.value(input)


    chain = <R> (f: F<R, F<O, I>>) =>
        f(this.value)

    ap = (input: I)  =>
        this.value(input)

    map = <A>(f: (a: O) => A) => 
      Dream.of(compose(f, this.value))
  
    contramap = <A = I>(f: (a: A) => I) =>
      Dream.of(compose(this.value, f))

}

export const fmap = <I, A> (f : F<I, A>) => <I>(dream: Dream<A, I>) =>
    dream.map(f)

export default Dream
