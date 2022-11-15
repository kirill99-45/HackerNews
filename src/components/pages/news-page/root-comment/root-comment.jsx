import { formatDuration } from '../new-page__model';

import './root-comment.css';    

let CURRENT_TIME = Math.floor(new Date().getTime() * 0.001)

const buttonsState = ['Показать ответы', 'Скрыть ответы']

const Comment = ({ comment, handleClick }) => {
    if (comment.kids) return <RootComment comment={comment} handleClick={handleClick} />
    return (
        <div className='comment-wrapper comment-child comment' key={comment.id}>
            <p className='comment__text'>{comment.text}</p>
            <footer className='comment__footer'>
                <span className='comment__by'>By: {comment.by}</span>
                <span className='comment__time'>{formatDuration(CURRENT_TIME - comment.time)}</span>
            </footer>
        </div>
    )
}

export const RootComment = ({ comment, handleClick }) => {
    if (comment.kids?.length > 0) {
        return (
            <div className={`${comment.isVisible ? 'comment-parent-with-kids' : 'comment-wrapper'} comment`} key={comment.id}>
                <p className='comment__text'>{comment?.root.text}</p>
                <footer className='comment__footer'>
                    <span className='comment__by'>By: {comment.root.by}</span>
                    <button
                        type='button'
                        className='comment__button'
                        onClick={(event) => handleClick(event)}
                        data-id={comment.id}
                    >
                        {!comment.isVisible ? buttonsState[0] : buttonsState[1]}
                    </button>
                    <span className='comment__time'>{formatDuration(CURRENT_TIME - comment.root.time)} ago</span>
                </footer>
                {comment.isVisible && comment.kids?.map(item => <Comment comment={item} handleClick={handleClick} />)}
            </div >
        )
    }
    return (
        <div className='comment-wrapper comment' key={comment.id}>
            <p className='comment__text'>{comment.text || comment.root.text}</p>
            <footer className='comment__footer'>
                <span className='comment__by'>By: {comment.root.by}</span>
                <span className='comment__time'>{formatDuration(CURRENT_TIME - comment.root.time)} ago</span>
            </footer>
        </div>
    )
}
