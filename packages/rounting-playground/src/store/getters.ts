import LazyMaybe from '../fp/LazyMaybe'
import {FrontState} from './createRootReducer'
import {prop} from 'ramda'

const maybeApp = LazyMaybe.of(
    ({app}: FrontState) =>
        app,
    []
)

export const maybeSchools = maybeApp
    .map(prop('schools'))
    .map(prop('value'))
export const maybeClassrooms = maybeApp
    .map(prop('classrooms'))
    .map(prop('value'))

export const maybePersons = maybeApp
    .map(prop('persons'))
    .map(prop('value'))

export const maybeSelectedSchool = maybeApp
    .map( ({schools, params}) =>
        schools.value && schools.value[params.schoolId]
    )
export const maybeSelectedClassroom = maybeApp
    .map( ({classrooms, params}) =>
        classrooms.value && classrooms.value[params.classroomId]
    )