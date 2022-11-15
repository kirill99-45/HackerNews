import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

import './button-update-data.css';

export const ButtonUpdateData = ({ setIsLoading, title = 'data' }) => {
    return (
        <button type='button' onClick={() => setIsLoading(true)} className='button-update' title='Update' data-title={`Update ${title}`}>
            <FontAwesomeIcon icon={faRotate} className='button-update__icon' />
        </button>
    )
}