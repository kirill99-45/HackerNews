import { useEffect, useState } from 'react';
import { ButtonUpdateData } from '../../UI/button-update/button-update-data';
import { useFetch } from '../../helpers/useFetch'

import { Card } from './card/card';
import { Loader } from '../../UI/loader/loader'
import { IconError } from '../../UI/icon';

export const HomePage = () => {

  const COUNT_OF_NEWS = 100

  const TIME_TO_UPDATE = 60

  const [timerState, setTimerState] = useState(TIME_TO_UPDATE)

  const URL = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

  const [isLoading, setIsLoading, data] = useFetch(URL, COUNT_OF_NEWS)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (timerState > 0 && !isLoading) {
      const shouldUpdate = setTimeout(() => {
        setTimerState(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(shouldUpdate)
    } else {
      setIsLoading(true)
      setTimerState(TIME_TO_UPDATE)
    }
  }, [timerState, isLoading])


  return (
    <>
      {isLoading && <Loader />}
      <h1 className='home-page__title'>Home page</h1>
      <ButtonUpdateData setIsLoading={setIsLoading} />
      <div className='cards'>
        {
          !isLoading ? !data.error ? data?.map((news, index) => {
            return <Card data={news} key={index} /> // Использую индекс массива в связи с тем, что ряд ID элементов совпадал между собой
          }) : <img src={IconError} className='error__icon'/> : ''
        }
      </div>
    </>
  )
}