import axios from 'axios';

import { useEffect, useState } from 'react';

import { Card } from './card';

export const HomePage = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    const COUNT_OF_NEWS = 3

    const getItem = (element) => {
      const resp = axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`).then(resp => resp)
      return resp
    }
  
    const someFunc = async (item) => {
      return await getItem(item).then(resp => resp.data)
    }
  
    const getItems = async (arr) => {
      const result = []
      for (let i = 0; i < COUNT_OF_NEWS; i++) {
        result.push(someFunc(arr[i]))
      }
      const data = await Promise.all(result)
      return data
    }
  
    useEffect(() => {
      if (isLoading) {
        axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
          .then(resp => {
            getItems(resp.data).then(resp => setData(resp))
            setIsLoading(false)
          })
      }
    }, [])

    return (
        <>
            <h1>Домашняя страница</h1>
            <div style={{ display : 'flex', rowGap : '10px', flexDirection : 'column' }}>
                {data.map(news => {
                    return <Card data={news} kei={news.id}/>
                })}
            </div>
        </>
    )
}