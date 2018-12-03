import * as fsa from '@sha/fsa'
import {PersonVO, ClassroomVO, SchoolVO, ClassroomParams, SchoolParams} from './valueObjects'
import {combineReducers} from 'redux'

const createWalliDuck = (name: string = 'walli') => {
    const factory = fsa.actionCreatorFactory(name)

    const act = {
        fetchSchools: factory.async<undefined, SchoolVO[]>('fetchSchools'),
        fetchClassrooms: factory.async<SchoolParams, ClassroomVO[]>('fetchClassrooms'),
        fetchPersons: factory.async<ClassroomParams, PersonVO[]>('fetchPersons'),
        params: factory<Partial<ClassroomParams>>('params'),
        busy: factory<boolean>('busy')
    }

    const reducer = combineReducers({
        schools: act.fetchSchools.asyncReducer,
        classrooms: act.fetchClassrooms.asyncReducer,
        persons: act.fetchPersons.asyncReducer,
        params: act.params.payloadReducer,
        busy: act.busy.payloadReducer,
    })

    return {
        reducer,
        act,
    }
}

export type WalliDuck = ReturnType<typeof createWalliDuck>

export type WalliState = ReturnType<WalliDuck['reducer']>

export const walliDuck = createWalliDuck()

