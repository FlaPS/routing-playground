import {put, select, call, takeLatest} from 'redux-saga/effects'
import {isEmpty} from 'ramda'
import {Api} from './api'
import nav, {isLocation, LocationAction} from '../nav'

import {AsyncActionCreators, FactoryAction} from '@sha/fsa'
import {WalliDuck, WalliState} from './walliDuck'
import {ClassroomParams, SchoolParams} from './valueObjects'
import {FrontState} from '../createRootReducer'

function* doFetch<P, S, E>(
    actionCreator: AsyncActionCreators<P, S, E>,
    method: (params?: P)=> Promise<{result: S}>,
    params?: P) {
    yield put(actionCreator.started(params))
    const {result, errors} = yield call(method, params)

    if (result)
        yield put(actionCreator.done({result}))
    else
        yield put(actionCreator.failed({
            error: JSON.stringify(errors) as any as E,
        }))
}


export default (api: Api) => (duck: WalliDuck) => {

    const handleSchools = function* () {
        yield put(duck.act.fetchClassrooms.unset())
        yield put(duck.act.fetchPersons.unset())
        yield* doFetch(duck.act.fetchSchools, api.fetchSchools)
    }

    const handleClassrooms = function* (params: SchoolParams) {
        yield put(duck.act.fetchPersons.unset())
        console.log('request classes')
        yield* doFetch(duck.act.fetchClassrooms, api.fetchClassrooms, params)
    }

    const handlePersons = function* (params: ClassroomParams) {
        yield* doFetch(duck.act.fetchPersons, api.fetchPersons, params)
    }

    const handleRoute = function* (action: LocationAction<ClassroomParams>) {
        const prevState: WalliState = yield select<FrontState>(state => state.app)
        yield put(duck.act.busy(true))
        const {pathname} = action.payload.location
        const {params} =    (
            nav.classroom.match(pathname) ||
            nav.school.match(pathname) ||
            {params: {}}) as any as {params: ClassroomParams}

        yield put(duck.act.params(params))


        if(isEmpty(params))
            yield* handleSchools()

        else {
            // Schools was not loaded
            if (prevState.schools.status !== 'done')
                yield* handleSchools()

            if (params.classroomId && params.schoolId) {
                // Previous school was different
                if (
                    prevState.classrooms.status !== 'done' ||
                    prevState.params.schoolId !== params.schoolId
                )
                    yield* handleClassrooms(params)

                yield* handlePersons(params)
            }
            else {

                if(
                    params.schoolId !== prevState.params.schoolId ||
                    prevState.classrooms.status !== 'done'
                ) {
                    console.log('request class rooms, when school param')
                    yield* handleClassrooms(params)
                }
            }
        }

        yield put(duck.act.busy(false))

    }

    return function* () {
        yield takeLatest(isLocation(), handleRoute)

    }
}
