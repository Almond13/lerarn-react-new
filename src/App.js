import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, json } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'

function App() {
  const DailyWeatherContents = () => {
    const URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'
    const apiKey =
      'GZESRP566LcNCPwNTe8yrfgMuVauLZgkpYOaXUmzc1uZawXViCMz+hKr2tfC9o0iQcr94cgHCXNr3ghe8Tu3FQ=='
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      // API 데이터 호출
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(URL, {
            params: {
              serviceKey: apiKey,
              numOfRows: 290,
              dataType: 'JSON',
              pageNo: 1,
              base_date: 20231213,
              base_time: 1100,
              nx: 55,
              ny: 127
            }
          })
          setData(response.data)
        } catch (e) {
          console.log(e)
        }
        setLoading(false)
      }
      fetchData()
    }, [])

    // 데이터 필터
    const weatherValue = data?.response?.body?.items?.item?.map((item) => item) || []
    const selectCategories = ['POP', 'PCP', 'TMP', 'WSD']
    const tmnCategory = ['TMN']
    const tmxCategory = ['TMX']

    const filteredWeatherValue = weatherValue.filter((item) =>
      selectCategories.includes(item.category)
    )

    const tmnValues = weatherValue.filter((item) => tmnCategory.includes(item.category))

    const tmxValues = weatherValue.filter((item) => tmxCategory.includes(item.category))

    const tmnValue = tmnValues.map((value) => value.fcstValue)
    const tmxValue = tmxValues.map((value) => value.fcstValue)

    // 데이터 그룹화
    const groupByTime = {}
    for (const content of [...filteredWeatherValue]) {
      const key = content.fcstTime
      groupByTime[key] = [...(groupByTime[key] || []), content]
    }

    // 로딩 설정
    if (loading) {
      return <p>대기중</p>
    }
    if (!data) {
      return null
    }

    return (
      <div>
        <p>
          {tmnValue} / {tmxValue}
        </p>
        {Object.entries(groupByTime).map(([fcstTime, group]) => (
          <div key={fcstTime}>
            <h2>fcstTime: {fcstTime}</h2>
            {group.map((content) => (
              <WeatherItem
                key={content.category + content.baseDate + content.fcstTime}
                data={content}
              />
            ))}
          </div>
        ))}
        {/*{filteredWeatherValue.map((content) => (*/}
        {/*  <WeatherItem*/}
        {/*    key={content.category + content.baseDate + content.fcstTime}*/}
        {/*    data={content}*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    )
  }

  const WeatherItem = ({ data }) => {
    const { fcstValue, category, fcstTime } = data

    function redefinedValue() {
      if (category === 'POP') {
        return fcstValue + '%'
      } else if (category === 'PCP' && fcstValue !== '강수없음') {
        return fcstValue + 'mm'
      } else if (category === 'TMP' || category === 'TMN' || category === 'TMX') {
        return fcstValue + `\u00B0`
      } else if (category === 'WSD') {
        return fcstValue + 'm/s'
      } else {
        return fcstValue
      }
    }

    return <p>{redefinedValue(fcstValue)}</p>
  }

  return (
    <div className="App">
      <div>
        <DailyWeatherContents />
      </div>
    </div>
  )
}

export default App
