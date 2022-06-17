import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const ToTopButton: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return <div className='topButton' onClick={scrollToTop}>
            <div className='topButton__arrows'>
                <div><FontAwesomeIcon icon={faChevronUp} /></div>
                <div><FontAwesomeIcon icon={faChevronUp} /></div>
            </div>
        </div>
}

export default ToTopButton;