import React from 'react'
import {Breadcrumb, Icon} from 'antd'
import {nav} from '../store'
import {ClassroomVO, SchoolVO} from '../store/walli/valueObjects'

type PathProps = {
    school?: SchoolVO
    classroom?: ClassroomVO
    history
}

const withPointer = {cursor: 'pointer'}

export default ({school, classroom, history}: PathProps) =>
    <Breadcrumb>
        <Breadcrumb.Item
            style={withPointer}
            onClick={() => history.push('/')}
        >
            <Icon type="home" />
        </Breadcrumb.Item>
        {
            school &&
            <Breadcrumb.Item
                style={classroom && withPointer}
                onClick={() => classroom && history.push(
                    nav.school({schoolId: school.id})
                )}
            >
                Школа {school.name}
            </Breadcrumb.Item>
        }
        {
            classroom &&
            <Breadcrumb.Item >
                <Icon type="user"/>
                <span>Класс {classroom.name}</span>
            </Breadcrumb.Item>
        }
    </Breadcrumb>