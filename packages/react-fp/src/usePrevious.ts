import {useRef, useEffect} from 'react'
export default function <T>(value: T) {
    const ref = useRef(null as any as T)
    useEffect(() => {
        ref.current = value
    })

    return ref.current
}
