import axios from 'axios';

import { useState, useEffect } from 'react';

export const useFetch = (URL) => {

    const COUNT_OF_NEWS = 100;

    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState(null)

    const getItem = (element) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`).then(resp => resp)
    }

    const someFunc = async (item) => {
        const resp = await getItem(item).then(resp => resp.data)
        if (resp.kids) {
            resp.kids = await getComments(resp.kids)
        }
        return resp
    }

    const someFunc1 = async (item) => {
        return await getItem(item).then(resp => resp.data)
    }


    const getItems = async (arr) => {
        const result = []
        for (let i = 0; i < COUNT_OF_NEWS; i++) {
            result.push(someFunc1(arr[i]))
        }
        const data = await Promise.all(result)
        return data
    }


    const getComments = async (kids = [], counter) => {

        const promises = kids.map(async (item) => await someFunc(item))

        const date = await Promise.all(promises)

        return { date }
    }

    useEffect(() => {
        if (isLoading) {
            axios.get(URL)
                .then(resp => {
                    if (URL.includes('newstories')) {
                        getItems(resp.data).then(resp => {
                            setIsLoading(false)
                            setData(resp)
                        })
                    } else {
                        setData(resp.data)
                        if (resp.data.kids) {
                            getComments(resp.data.kids)
                                .then(resp => {
                                    setIsLoading(false)

                                    setData(prev => {
                                        return { ...prev, kids: resp.date }
                                    })
                                })

                        } else {
                            setIsLoading(false)

                        }
                    }
                })
                .catch(error => {
                    setIsLoading(false)
                    setData({ error : error })
                })
        }
    }, [isLoading])

    return [isLoading, setIsLoading, data]
}