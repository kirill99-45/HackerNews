import './page-state.css';

export const NewsPageCommentPreload = () => {

    return (
        <div>
            <h1 className='news__error-title'>News page</h1>
            <h3 className='comment__title-preload' />
            {
                new Array(4).fill(null).map((_, index) => {
                    return <div className='comment__preload' key={index} />
                })
            }
        </div>
    )
}