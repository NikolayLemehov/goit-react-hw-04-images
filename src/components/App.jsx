import React, { useState } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryStatus from './ImageGalleryStatus/ImageGalleryStatus';
import Container from './Container';
import Modal from './Modal';

const initialModalImg = {
  largeImageURL: '',
  tags: '',
};

function App() {
  const [search, setSearch] = useState('');
  const [modalImg, setModalImg] = useState(initialModalImg);
  const [showedModal, setShowedModal] = useState(false);

  const getSearchValue = (value) => setSearch(value);

  const getModalImg = (modalImg) => {
    setModalImg(modalImg);
    toggleModal();
  };

  const handleKeyDownEscModal = () => {
    toggleModal();
    setModalImg(initialModalImg);
  };

  const toggleModal = () => setShowedModal(p => !p);

  const { largeImageURL, tags } = modalImg;

  return (
    <>
      <div className={s.container}>
        <Searchbar onSubmit={getSearchValue} />
        <Container>
          <ImageGalleryStatus search={search} onClickImg={getModalImg} />
        </Container>
      </div>
      {showedModal && <Modal
        src={largeImageURL}
        alt={tags}
        onKeyDownEsc={handleKeyDownEscModal}
      />}
    </>
  );
}

export default App;
