import { useEffect, useRef, useState } from 'react';
import pixabayApi from '../../services/pixabay.api';
import { nanoid } from 'nanoid';

export const useSearch = (search) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const searchRef = useRef(search);
  const pageRef = useRef(page);
  const addIdToCollection = (images) => {
    return images.map(it => ({ ...it, frontId: nanoid(10) }));
  };

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

  return {error, loading, page, setPage, images, totalHits}
}
