// import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryStatus.module.css';
import { ITEMS_PER_PAGE } from '../../services/pixabay.api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import { useSearch } from '../Searchbar/useSearch';

function ImageGalleryStatus({ onClickImg, search }) {
  const {error, loading, page, setPage, images, totalHits} = useSearch(search);

  const handleMoreBtnClick = () => setPage(p => (p + 1));

  const pages = Math.ceil(totalHits / ITEMS_PER_PAGE);

  return (
    <div className={s.container}>
      {images.length === 0 && !error && <p>No images</p>}
      {error && !loading && <p>{error}</p>}
      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} onClickImg={onClickImg} />
          {(pages > page && !loading) && <Button
            onClick={handleMoreBtnClick}
            pages={pages}
            page={page}
          />}
        </>
      )}
      {loading && <Loader />}
    </div>
  );
}

ImageGalleryStatus.propTypes = {
  search: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryStatus;
