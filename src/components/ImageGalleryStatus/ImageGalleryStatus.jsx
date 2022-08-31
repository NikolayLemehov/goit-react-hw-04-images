import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './ImageGalleryStatus.module.css';
import pixabayApi, { ITEMS_PER_PAGE } from '../../services/pixabay.api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

function ImageGalleryStatus({ onClickImg, search }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(search);
  const pageRef = useRef(page);

  useEffect(() => {
    if (search === '') return;
    if (searchRef.current === search && pageRef.current === page) {
      setError(`Change your search "${search}" by new, please.`)
      return;
    }
    setLoading(true);
    pixabayApi
      .getSearchImages({ value: search, page })
      .then(({ hits, totalHits }) => {
        const uniqueHits = addIdToCollection(hits);
        // const uniqueHits = hits; // towe
        setError(null);
        setImages(p => searchRef.current === search
          ? [...p, ...uniqueHits]
          : uniqueHits);
        setTotalHits(totalHits);
        searchRef.current = search
      })
      .catch((e) => {
        setError(e.message);
        setImages([]);
      })
      .finally(() => setLoading(false));
    return () => {};
  }, [search, page]);

  const addIdToCollection = (images) => {
    return images.map(it => ({ ...it, frontId: nanoid(10) }));
  };

  const calcPages = (totalHits) => Math.ceil(totalHits / ITEMS_PER_PAGE);

  const handleMoreBtnClick = () => setPage(p => (p + 1));

  const pages = calcPages(totalHits);

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
