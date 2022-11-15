import { Link } from 'react-router-dom';

import { getTime, getColor, getScore } from './card-model';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './card.css';

export const Card = ({ data }) => {
    if (data !== null) {
        return (
            <Link to={`/new/${data.id}`} className='card'>
                <div className='card__main'>
                    <h3>{data.title}</h3>
                    <div className='card__score'>
                        <span>{getScore(data.score)}</span>
                        <FontAwesomeIcon icon={faStar} className='score__icon' style={{ color : getColor(data.score) }}/>
                    </div>
                </div>
                <footer className='card__footer'>
                    <span>By: {data.by}</span>
                    <span className='card__time'>{getTime(data.time)}</span>
                </footer>
            </Link>
        )
    }
}