import {useState} from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';
import Modal from '../../Modal/Modal';

export default function ImageGalleryItem({src,largeImageURL,alt}) { 
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }


    return (
        <>
            <li className={s.ImageGalleryItem}>
                <img src={src} alt={alt} onClick={toggleModal} className={s.ImageGalleryItemImage} />    
            </li>
            {
                showModal && <Modal src={largeImageURL} alt={alt} onClose={toggleModal}/>
            }
        </>
    )
}


ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}