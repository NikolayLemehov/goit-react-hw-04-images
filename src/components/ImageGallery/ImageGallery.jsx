import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onClickImg }) {
  return (
    <ul className={s.container}>
      {images.map(img => {
        const { frontId, id, webformatURL, largeImageURL, tags } = img;
        return (
          <ImageGalleryItem
            key={frontId}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClickImg={onClickImg}
          />);
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ ...ImageGalleryItem.propTypes })),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
