import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css'

function Modal({onKeyDownEsc, src, alt}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      onKeyDownEsc()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    };
  }, [onKeyDownEsc]);

  return (
    <div className={s.overlay} onClick={() => onKeyDownEsc()}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onKeyDownEsc: PropTypes.func.isRequired,
};

export default Modal;
