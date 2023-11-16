import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SnackBoard = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const limit = 5
  const offset = (page - 1) * limit
  const [total, setTotal] = useState(0)

  const Lists = ({ listData }) => {
    return (
      <tr>
        <td>{listData.id}</td>
        <td>{listData.snack}</td>
        <td>{listData.brand}</td>
        <td>{listData.content}</td>
        <td>{listData.star}</td>
      </tr>
    )
  }
  const getList = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/data/snackData.json')
      setList(data)
      const paging = data.length
      setTotal(paging)
    } catch (err) {}
  }

  const sliceList = (list) => {
    return list.slice(offset, offset + limit)
  }
  const Pagination = ({ total, limit, page, setPage }) => {
    const numPage = Math.ceil(total / limit)
    return (
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPage)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPage}>
          &gt;
        </button>
      </div>
    )
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>과자 이름</th>
            <th>브랜드</th>
            <th>평가</th>
            <th>별점</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {sliceList(list).map((item) => (
            <Lists listData={item} key={item.id} />
          ))}
        </tbody>
      </table>
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  )
}

export default SnackBoard
