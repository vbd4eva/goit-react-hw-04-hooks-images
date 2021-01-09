import { useState, useEffect, useLayoutEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

import Notification from '../Notification/Notification';

import ApiService from '../../js/apiService';
import LoadMore from './LoadMore/LoadMore';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const   apiService = new ApiService();

export default function ImageGallery({searchQuery}){

    const [status, setStatus] = useState(Status.IDLE);
    const [gallery, setGallery] = useState([]);

    const scroll = useRef(0);


    useEffect(() => {
        scroll.current = 0;
        setGallery([]);
        fetchImagesOnSearch(searchQuery);
    }, [searchQuery]);

    useLayoutEffect(() => {
        if (!gallery.length) return; 

        window.scrollTo({
            top: scroll.current,
            behavior: "smooth",
         });

        scroll.current = document.documentElement.scrollHeight - document.querySelector('#searchbar').scrollHeight;
    },[gallery]);


    if (Status.IDLE === status) return <Notification message='Something went wrong ¯\_(ツ)_/¯' />;
    if (Status.REJECTED === status && !gallery.length) return <Notification message='Nothing founded...' />;
    return (
        <>
            {(Status.PENDING === status) && <Loader type='Rings' color="#bfbfbf" className="loader" />}
            {

                <>
                    <ul className={s.ImageGallery}>
                        {gallery.map(
                            ({ id, webformatURL, largeImageURL, tags }) =>
                            (<ImageGalleryItem key={id}
                                src={webformatURL}
                                largeImageURL={largeImageURL}
                                alt={tags}
                            />)
                        )}
                    </ul>
                        
                    {(Status.RESOLVED === status) && < LoadMore loadMore={fetchImagesOnSearch} />}

                    {(Status.REJECTED === status) && <Notification message='There are no more images....' />}
                </>
            }
        </>
    );    

    async function fetchImagesOnSearch(searchQuery) {

        setStatus(Status.PENDING);

        //   console.log('фетчим запрос : ', this.props.searchQuery);
        const justFetchedImages = await apiService.getImages(searchQuery)
            .then(images => images);

        // //если бекэндотдал пустой массив
        if (!justFetchedImages.length) {
            setStatus(Status.REJECTED);
            return;
        }

        // // console.log(" бекэндотдал НЕ пустой массив");
        setGallery(gallery => [...gallery, ...justFetchedImages]);
        setStatus(Status.RESOLVED);
    }

}

ImageGallery.propTypes = {
        searchQuery: PropTypes.string.isRequired,
}
