
import { useState } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

const ImageGallery = ({ galleryList }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  //скриваємо модальне вікно
  const onClose = () => {
    setShowModal(false);
    setModalUrl('');
    setModalAlt('');
  };

  const handleClick = e => {
    setShowModal(true);
    setModalUrl(e.target.attributes.srcbig.value);
    setModalAlt(e.target.attributes.alt);
  };

  return (
    <div>
      <ul className={css.galleryStyle} onClick={handleClick}>
        {galleryList.map(picture => (
          <li key={picture.id} className={css.item}>
            <ImageGalleryItem dataPicture={picture}></ImageGalleryItem>
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal onClose={onClose} src={modalUrl} alt={modalAlt}></Modal>
      )}
    </div>
  );
};

export default ImageGallery;
