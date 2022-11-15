import { RootComment } from '../root-comment/root-comment';

import { ButtonUpdateData } from '../../../UI/button-update/button-update-data';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const NewsPageCommentLoaded = ({ data, comments, commentTree, handleClick, setIsLoading }) => {


    return (
        <>
            <ButtonUpdateData setIsLoading={setIsLoading} title={'comments'} />
            <button className='news__button-back' onClick={() => window.history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} />
                {window.innerWidth > 720 ? 'Go back' : ''}
            </button>
            <header className='news__header'>
                <h1>{data?.title}</h1>
                <div className='news__main-info'>
                    <a href={data?.url} target='_blank' className='news__link'>Link to the news</a>
                    <h3><FontAwesomeIcon icon={faMessage} /> {comments}</h3>
                </div>
                <h3>By: {data?.by}</h3>
            </header>
            <main className='content'>
                <h3>{comments > 0 ? 'Comments:' : 'There are no comments'}</h3>
                {commentTree?.parents?.map(item => {
                    if (!item.root.deleted && !item.root.dead) {
                        return <RootComment comment={item} handleClick={handleClick} />
                    }
                })}
            </main>
        </>
    )
}