import './page-state.css';

export const NewsPageCommentPreload = () => {
    return (
        <div>
            <h3 className='comment__title-preload'/>
            {
                new Array(4).fill(null).map((_, index) => {
                    return <div className='comment__preload' key={index} />
                })
            }
        </div>
    )
}