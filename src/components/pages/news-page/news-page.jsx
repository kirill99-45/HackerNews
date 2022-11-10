import { useState, useEffect } from 'react';

import axios from 'axios';

export const NewsPage = () => {

    const id = window.location.pathname.split('/').filter(item => !isNaN(+item)).join('')

    const [comments, setComments] = useState([])
    const [news, setNews] = useState(null)

    const getItem = (element) => {
        const resp = axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`).then(resp => resp)
        return resp
    }

    const someFunc = async (item) => {
        return await getItem(item).then(resp => {
            return resp.data
        })
    }

    const getItems = async (arr) => {
        const promises = arr.map(async (item) => {
            return await someFunc(item)
        })

        const date = await Promise.all(promises)
        return date
    }

    useEffect(() => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(resp => {
                setNews(resp.data)
                getItems(resp.data.kids).then(resp => {
                    setComments(resp)
                })
            })
    }, [])

    return <h1 >Это страница новости {id}</h1>
}

// onClick={() => getComments()}