import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

const SnackBoard = () => {
  const navigate = useNavigate()
  const { page } = useParams()
  const [list, setList] = useState([])
  const [limit, setLimit] = useState(5)
  const offset = (page - 1) * limit
  const [total, setTotal] = useState(0)
  const [searchName, setSearchName] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [searchType, setSearchType] = useState('snack')

  const Lists = ({ listData }) => {
    return (
      <tr className="result" style={{ padding: 0, margin: 0 }}>
        <td style={{ padding: 0, margin: 0 }}>{listData.id}</td>
        <td style={{ padding: 0, margin: 0 }}>{listData.snack}</td>
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
      setFilteredList(data)
      const paging = data.length
      setTotal(paging)
    } catch (err) {}
  }

  // 페이지 자르기
  const sliceList = (list) => {
    return list.slice(offset, offset + limit)
  }

  // 검색기능
  const filterList = list.filter((item) => {
    const target = item[searchType]
    return String(target).includes(searchName)
  })

  const searchButton = () => {
    setFilteredList(filterList)
    setTotal(filterList.length)
  }

  // 페이지네이션 컴포넌트
  const Pagination = ({ total, limit, page }) => {
    const numPage = Math.ceil(total / limit)
    return (
      <div className="pagination">
        <Link
          className={`pagination-link ${page === '1' ? 'disabled' : ''}`}
          to={`/snack-board/${parseInt(page, 10) - 1}`}
        >
          &lt;
        </Link>
        {Array(numPage)
          .fill()
          .map((_, i) => (
            <Link
              to={`/snack-board/${i + 1}`}
              key={i + 1}
              className={`pagination-link ${page === `${i + 1}` ? 'active' : ''}`}
            >
              {i + 1}
            </Link>
          ))}
        <Link
          className={`pagination-link ${page === `${numPage}` ? 'disabled' : ''}`}
          to={`/snack-board/${parseInt(page, 10) + 1}`}
        >
          &gt;
        </Link>
      </div>
    )
  }

  //리스트 수 조절 컴포넌트
  const SelectNum = () => {
    return (
      <label>
        <select value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="5">5개 보기</option>
          <option value="10">10개 보기</option>
          <option value="15">15개 보기</option>
          <option value="20">20개 보기</option>
        </select>
      </label>
    )
  }

  // 랜더
  useEffect(() => {
    if (page > Math.ceil(total / limit)) {
      const newPage = Math.max(1, Math.ceil(total / limit))
      navigate(`/snack-board/${newPage}`, { replace: true })
    }
    getList()
  }, [page, limit, navigate])

  return (
    <div className="board">
      <SelectNum />
      <div className="table-container">
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
          <tbody>
            {filteredList.length === 0 ? (
              <tr className="no-result">
                <td>검색 결과가 없습니다.</td>
              </tr>
            ) : (
              sliceList(filteredList).map((item) => <Lists listData={item} key={item.id} />)
            )}
          </tbody>
        </table>
      </div>
      <Pagination total={total} limit={limit} page={page} />
      <label>
        <select
          className="select"
          value={searchType}
          onChange={({ target: { value } }) => {
            setSearchType(String(value))
          }}
        >
          <option value="sanck">과자 이름</option>
          <option value="brand">브랜드</option>
        </select>
        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <button onClick={searchButton}>검색</button>
      </label>
    </div>
  )
}

export default SnackBoard
