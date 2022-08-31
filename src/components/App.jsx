import React, { PureComponent } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryStatus from './ImageGalleryStatus/ImageGalleryStatus';
import Container from './Container';
import Modal from './Modal';

class App extends PureComponent {
  state = {
    search: '',
    modalImg: {
      largeImageURL: '',
      tags: '',
    },
    showedModal: false,
  };

  getSearchValue = (value) => {
    this.setState({ search: value });
  };

  getModalImg = (modalImg) => {
    this.setState({ modalImg });
    this.toggleModal();
  };

  handleKeyDownEscModal = () => {
    this.toggleModal();
    this.setState({ modalImg: { largeImageURL: '', tags: '' } });
  };

  toggleModal = () => {
    this.setState(({ showedModal }) => ({ showedModal: !showedModal }));
  };

  render() {
    const { search, modalImg: { largeImageURL, tags }, showedModal } = this.state;

    return (
      <>
        <div className={s.container}>
          <Searchbar onSubmit={this.getSearchValue} />
          <Container>
            <ImageGalleryStatus search={search} onClickImg={this.getModalImg} />
          </Container>
        </div>
        {showedModal && <Modal
          src={largeImageURL}
          alt={tags}
          onKeyDownEsc={this.handleKeyDownEscModal}
        />}
      </>
    );
  }
}

export default App;
