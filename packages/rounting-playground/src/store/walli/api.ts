import {randomInt, faker, randomNatural} from '@sha/random'
import {times, compose, assoc} from 'ramda'
import {ClassroomParams, ID, SchoolParams} from './valueObjects'

const randomDelay = (value) =>
    new Promise(resolve =>
        setTimeout(resolve, randomNatural(200) + 300, value)
    )

const api = () => ({
    fetchSchools: async () =>
        randomDelay({result: getRandomList(10)}),

    fetchClassrooms: async (params: SchoolParams) =>
        randomDelay({result: getRandomList(5).map(assoc('schoolId', params.schoolId))}),

    fetchPersons: async (params: ClassroomParams) =>
        randomDelay({result: getRandomList(30)}),
})

const generateItem = times( id => ({
    id: String(id),
    name: faker.name.findName()
}))

const getRandomList = compose(generateItem, randomNatural)

export type Api = ReturnType<typeof api>

export default api

