export type WithNameVO = {
    id: ID
    name: string
}

export type ID = string


export type SchoolParams = {
    schoolId: ID
}


export type ClassroomParams =
    & SchoolParams
    & {
    classroomId: ID,
}

export type PersonVO = WithNameVO

export type ClassroomVO = WithNameVO & {schoolId: string}

export type SchoolVO = WithNameVO