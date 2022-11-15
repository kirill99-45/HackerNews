import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from '../../helpers/useFetch';
import { toggleComments, updateComments } from '../../redux/actions';

import { NewsPageCommentLoaded } from './page-state/news-page-comment-loaded';
import { NewsPageCommentPreload } from './page-state/news-page-comment-preload';

import { getCommentsTree, getCountOfComment } from './new-page__model';

import { Loader } from '../../UI/loader/loader';

import { IconError } from '../../UI/icon';
import './news-page.css';


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
            {isLoading && <Loader />}
            {isLoading ?
                <NewsPageCommentPreload /> :
                !data.error ?
                <NewsPageCommentLoaded 
                    data={data}
                    comments={comments} 
                    commentTree={commentTree} 
                    handleClick={handleClick} 
                    setIsLoading={setIsLoading}
                /> :
                <>
                    <h1 className='news__error-title'>News page</h1>
                    <img src={IconError} className='error__icon'/>
                </>
            }
        </div>
    )
}