import { Link } from 'react-router-dom';

import './card.css';

export const Card = ({ data }) => {

    const getTime = (time) => {
        const year = Math.floor(time / 31556736) + 1970
        const month = Math.floor(time / 86400)
        

    }

    return (
        <Link to={`/new/${data.id}`} className='card'>
            <h3>{data.title}</h3>
            <footer className='card__footer'>
                <span>{getTime(data.time)}</span>
                <span>{data.by}</span>
            </footer>
        </Link>
    )
}

{/* <span>{data.title}</span>
<span>{data.type}</span>
<span>{data.by}</span> */}



// Показывает последние 100 новостей в виде списка, отсортированного по дате, самые свежие сверху.
// Каждая новость содержит:
// название
// рейтинг
// ник автора
// дату публикации
// По клику на новость происходит переход на страницу новости
// Список новостей должен автоматически обновляться раз в минуту без участия пользователя
// На странице должна быть кнопка для принудительного обновления списка новостей