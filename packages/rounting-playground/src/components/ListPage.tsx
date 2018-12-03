import React from 'react'
import {List} from 'antd'
import {memoize} from 'ramda'
import {Renderable, renderChildren} from '@sha/react-fp'
import styled from 'styled-components'
import Spin from 'antd/es/spin'
import {WithNameVO} from '../store/walli/valueObjects'


const ListPage = ({data, onSelect, title, renderLabel = defaultRenderLabel}: ListPageProps<WithNameVO>) =>
    <Spin spinning={data === undefined}>
        <List
            header={renderChildren(title)}
            bordered
            dataSource={data}
            renderItem={
                item =>
                    <List.Item key={item.id} >
                        <ItemLayout onClick={clickHandler(onSelect, item)} >
                            {renderChildren(renderLabel, item)}
                        </ItemLayout>
                    </List.Item>
            }
        />
    </Spin>


type ListPageProps<T extends WithNameVO> = {
    title: Renderable
    data: T[],
    renderLabel?: Renderable<T>
    onSelect?: (item) => any
}

const ItemLayout = styled.div`
    width: 100%
    user-select: none;
    cursor: pointer;
`

const defaultRenderLabel = ({id}: WithNameVO) =>
    `Школа ${id}`

const clickHandler = memoize((onSelect, item) =>
    () =>
        onSelect && onSelect(item)
)


export default ListPage
