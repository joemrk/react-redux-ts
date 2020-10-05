import React from 'react'
import './pagination.css'

type Props = {
    pageSize: number
    currentPage: number
    totalUsers: number
    requestUsers: (page: number, pageSize: number) => void
}

export const Pagination: React.FC<Props> = React.memo(({ pageSize, currentPage, totalUsers, requestUsers }) => {

    let pagesCount = Math.ceil(totalUsers / pageSize)

    let chunkPageSize = 5
    let floorChunkPageSize = Math.floor(chunkPageSize / 2)

    let leftFromCurrent = currentPage - floorChunkPageSize
    let rightFromCurrent = currentPage + floorChunkPageSize
    leftFromCurrent = (leftFromCurrent <= 0) ? 1 : leftFromCurrent
    rightFromCurrent = (rightFromCurrent > pagesCount) ? pagesCount + 1 : rightFromCurrent

    let pages = []
    // for (let i = 1; i <= pagesCount + 1; i++) pages.push(i)
    for (let i = leftFromCurrent; i < rightFromCurrent + 1; i++) {
        pages.push(i)

    }
    pages = pages.map(p => <span key={p} onClick={() => { requestUsers(p, pageSize) }}
        className={(currentPage === p) ? 'active-page pagination-page-item' : ' pagination-page-item'}>{p}</span>)
    return (
        <div className="pagination-wrap">
            <div className="pages-list">
                {pages}
            </div>
        </div>
    )
})


//напиши отдельную функцию на пагинацию