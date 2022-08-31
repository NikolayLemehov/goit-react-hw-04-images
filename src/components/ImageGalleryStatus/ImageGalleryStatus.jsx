import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import s from './ImageGalleryStatus.module.css'
import pixabayApi, { ITEMS_PER_PAGE } from '../../services/pixabay.api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

class ImageGalleryStatus extends PureComponent {
  state = {
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;
    if (prevProps.search === search && prevState.page === page) {
      return;
    }
    if (prevProps.search !== search) {
      this.setState({ page: 1 });
      window.scroll(0, 0);
    }

    this.setState({
      loading: true,
    });
    pixabayApi
      .getSearchImages({ value: search, page })
      .then(({ hits, totalHits }) => {
        const uniqueHits = this.addIdToCollection(hits);
        // const uniqueHits = hits; // towe

        this.setState(p => {
          const images = prevProps.search === search
            ? [...p.images, ...uniqueHits]
            : uniqueHits;
          return ({
            images,
            totalHits,
          });
        });
      })
      .catch((e) => {
        this.setState({
          error: e.message,
        });
      })
      .finally(() => this.setState({ loading: false }));
  }

  // getUniqueId = (images) => {
  //   return images.filter((it, i, arr) =>
  //     arr.indexOf(arr.find(({ id }) => id === it.id)) === i);
  // }

  addIdToCollection = (images) => {
    return images.map(it => ({ ...it, frontId: nanoid(10) }));
  }

  calcPages = (totalHits) => Math.ceil(totalHits / ITEMS_PER_PAGE);

  handleMoreBtnClick = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  render() {
    const { error, images, totalHits, page, loading } = this.state;
    const { onClickImg } = this.props;
    const pages = this.calcPages(totalHits);

    return (
      <div className={s.container}>
        {images.length === 0 && <p>No images</p>}
        {error && <p>{error}
          <button
            type='button'
            onClick={() => this.setState({ error: '' })}>Close Error
          </button>
        </p>}
        {!error && images.length > 0 && (
          <>
            <ImageGallery images={images} onClickImg={onClickImg} />
            {(pages > page && !loading) && <Button
              onClick={this.handleMoreBtnClick}
              pages={pages}
              page={page}
            />}
          </>
        )}
        {loading && <Loader/>}
      </div>
    );
  }
}

ImageGalleryStatus.propTypes = {
  search: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryStatus;
