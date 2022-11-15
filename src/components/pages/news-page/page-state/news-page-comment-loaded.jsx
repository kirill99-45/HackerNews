import { RootComment } from '../root-comment/root-comment';

export const NewsPageCommentLoaded = ({ comments, commentTree, handleClick }) => {
    return (
        <main className='content'>
            <h3>{comments > 0 ? 'Comments:' : 'There are no comments'}</h3>
            {commentTree?.parents?.map(item => {
                if (!item.root.deleted && !item.root.dead) {
                    return <RootComment comment={item} handleClick={handleClick} />
                }
            })}
        </main>
    )
}