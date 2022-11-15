import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from '../../helpers/useFetch';

import { Loader } from '../../UI/loader/loader';
import { ButtonUpdateData } from '../../UI/button-update/button-update-data';
import { NewsPageCommentLoaded } from './page-state/news-page-comment-loaded';
import { NewsPageCommentPreload } from './page-state/news-page-comment-preload';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { getCommentsTree, getCountOfComment } from './new-page__model';

import './news-page.css';
import { toggleComments, updateComments } from '../../redux/actions';


export const NewsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const id = window.location.pathname.split('/').filter(item => !isNaN(+item)).join('')

    const URL = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`

    const [isLoading, setIsLoading, data] = useFetch(URL)

    const { comments, commentTree, TIME_TO_UPDATE } = useSelector(state => {
        return state.NewsPageReducer
    })

    const [timerState, setTimerState] = useState(TIME_TO_UPDATE)

    const dispatch = useDispatch()

    const handleClick = (event) => {
        const node = +(event.currentTarget.getAttribute('data-id'))
        dispatch(toggleComments(commentTree, node))
    }

    useEffect(() => {
        if (!isLoading && timerState > 0) {
            const shouldUpdate = setTimeout(() => {
                setTimerState(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(shouldUpdate)
        } else {
            setIsLoading(true)
            setTimerState(TIME_TO_UPDATE)
        }
    }, [timerState, isLoading])

    useEffect(() => {
        if (!isLoading && data?.kids) {

            const commentsCount = data.kids?.reduce((acc, item) => {
                return acc = getCountOfComment(item, acc)
            }, 0)

            dispatch(updateComments(getCommentsTree(data), commentsCount))

        } else if (!data?.kids) {
            dispatch(updateComments(getCommentsTree(data), 0))
        }
    }, [isLoading, data])

    return (
        <div className='news'>
            <ButtonUpdateData setIsLoading={setIsLoading} title={'comments'} />
            <button className='news__button-back' onClick={() => window.history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} />
                { window.innerWidth > 720 ? 'Go back' : '' }
            </button>
            <header className='news__header'>
                {isLoading && <Loader />}
                <h1>{data?.title}</h1>
                <div className='news__main-info'>
                    <a href={data?.url} target='_blank' className='news__link'>Link to the news</a>
                    <h3><FontAwesomeIcon icon={faMessage} /> {comments}</h3>
                </div>
                <h3>By: {data?.by}</h3>
            </header>
            {!isLoading ?
                <NewsPageCommentLoaded comments={comments} commentTree={commentTree} handleClick={handleClick} /> :
                <NewsPageCommentPreload />
            }
        </div>
    )
}