import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ dataPicture }) => {
  return (
    <img
      className={css.itemImage}
      // this.props.dataPicture.largeImageURL2
      srcbig={dataPicture.largeImageURL}
      src={dataPicture.webformatURL}
      alt={dataPicture.tags}
    />
  );
};

export default ImageGalleryItem;