import * as React from 'react'
import ListPage from './ListPage'
import {useMappedState} from '../fp/reduxHook'
import {maybeClassrooms, maybePersons, maybeSchools, maybeSelectedClassroom, maybeSelectedSchool} from '../store/getters'
import {nav} from '../store'
import Path from './Path'

export default (history) => ({
    Schools: () =>
        <ListPage
            title={'Школы'}
            data={useMappedState(maybeSchools.ap)}
            onSelect={(school) =>
                history.push(nav.school({schoolId: school.id}))
            }
        />,

    Menu: () =>
        <Path
            history={history}
            school={useMappedState(maybeSelectedSchool.ap)}
            classroom={useMappedState(maybeSelectedClassroom.ap)}
        />,

    Classrooms: () =>
        <ListPage
            renderLabel={item => 'Класс ' + item.id}
            data={useMappedState(maybeClassrooms.ap)}
            title={'Классы школы '}
            onSelect={(classroom) =>
                history.push(nav.classroom({
                    schoolId: classroom['schoolId'],
                    classroomId: classroom.id
                }))
            }
        />,

    Persons:() =>
        <ListPage
            renderLabel={item => 'Ученик ' + item.name}
            data={useMappedState(maybePersons.ap)}
            title={'Ученики школы '}
        />,
})