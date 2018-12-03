import {match, matchPath} from 'react-router'
import {trace} from '@sha/utils'
import {LOCATION_CHANGE} from 'connected-react-router'

const makeRoute = <T extends { [K in keyof T]?: string }>(pattern: string): NavRoute<T> => {
    const creator = (props: T = {} as any as T): string =>
        Object
            .entries(props)
            .reduce(
                (result, [key, value]) =>
                    result.replace(':' + key, String(value)),
                pattern,
            )

    const matchParams = (path: string, options: match<T> = {isExact: true} as any as match<T>): match<T> | null => {
        const result = matchPath<T>(path, {
            path: pattern,
            ...options,
        })
        return result
    }
    return Object.assign(
        creator,
        {
            match: matchParams,
            pattern,
            isType: (action: any): action is LocationAction<T> =>
                action.type.includes(LOCATION_CHANGE) &&
                action.payload &&
                action.payload.location &&
                action.payload.location.pathname &&
                trace()(matchParams)(action.payload.location.pathname) !== null &&
                matchParams(action.payload.location.pathname)!.isExact === true,
        },
    )
}

export type RouteCreator<T> = (props?: T) => string

export type NavRoute<T> =
    RouteCreator<T>
    & {
    pattern: string
    match: (path: string, options?: match<T>) => match<T> | null
    isType: (value: any) => value is LocationAction<T>
}


export type LocationAction<T> = {
    type: string,
    payload: {
        location: {
            pathname: string
        }
        params: T
        recordToHisotry?: boolean
    }
}

export const isLocation = <T>(route?: NavRoute<T>) => (action: any): action is LocationAction<T> =>
    route
        ? route.isType(action)
        : action.type.includes(LOCATION_CHANGE)

export const push = <T>(route: NavRoute<T>) => (params: T = {} as any as T) => ({
    type: LOCATION_CHANGE,
    payload: {
        location: {
            pathname: route(params),
        },
        params,
        pattern: route.pattern,
        action: 'PUSH',
        // recordToHistory: true,
    },
})

export default {
    index: makeRoute('/'),
    school: makeRoute<{ schoolId: string }>('/school/:schoolId'),
    classroom: makeRoute<{ schoolId: string, classroomId: string }>('/school/:schoolId/classroom/:classroomId'),
}
