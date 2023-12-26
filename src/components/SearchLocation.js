import React, { useEffect, useState } from 'react'

const SearchLocation = ({ gridSet }) => {
  const [coordinateData, setCoordinateData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // 좌표 데이터 호출
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/data/coordinate.json')
        const data = await response.json()
        setCoordinateData(data)
      } catch (error) {
        console.error('Error getting coordinate data: ', error)
      }
    }
    getData()
  }, [])

  // 검색 필터 기능
  useEffect(() => {
    const filtered = coordinateData.filter((item) => {
      const fullAreaName = `${item.first_area} ${item.second_area || ''}`
      return fullAreaName.includes(searchName)
    })
    setFilteredData(filtered)
  }, [searchName, coordinateData])

  // 검색한 데이터 선택 기능
  const handleSelect = async (selectedData) => {
    // console.log(selectedData)
    try {
      setSearchName(`${selectedData.first_area} ${selectedData.second_area || ''}`)
      await Promise.all([
        gridSet.setGridX(selectedData.grid_x),
        gridSet.setGridY(selectedData.grid_y)
      ])
      setFilteredData([])
    } catch (error) {
      console.error('Error searching location: ', error)
    }
  }

  // 검색어 색상 변경 기능
  // regex : 검색어를 새로운 정규 표현식 객체로 만듦
  // text.split : 검색 결과(text)를 regex로 나눔
  // regex.test(part) : part(검색 결과의 각 요소)가 regex와 일치하는 부분이 있다면 true, 없다면 false 반환
  const highlightedText = (text, search) => {
    const regex = new RegExp(`(${search})`, 'gi')
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: 'bold', color: 'red' }}>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <>
      <input value={searchName} onChange={(e) => setSearchName(e.target.value)} />
      {searchName.length > 1 && filteredData.length > 0 && (
        <div style={{ zIndex: 1000, position: 'absolute', backgroundColor: 'white' }}>
          {filteredData.map((item) => (
            <div key={item.id} onClick={() => handleSelect(item)}>
              {highlightedText(`${item.first_area} ${item.second_area || ''}`, searchName)}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SearchLocation
