import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css'
import { createPortal } from 'react-dom';

const modalRootRef = document.querySelector('#root-modal');

function Modal({onKeyDownEsc, src, alt}) {
  // const el = useMemo(() => document.createElement('div'), []);

  const onKeyDown = useCallback((e) => {
    if (e.key !== 'Escape') return;
    onKeyDownEsc()
  }, [onKeyDownEsc])

  const onClickOverlay = useCallback(({target, currentTarget}) => {
    if (target !== currentTarget) return;
    onKeyDownEsc()
  }, [onKeyDownEsc])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    // modalRootRef.appendChild(el)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      // modalRootRef.removeChild(el)
    };
  }, [onKeyDown, onKeyDownEsc]);

  return createPortal((
    <div className={s.overlay} onClick={onClickOverlay}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  ), modalRootRef);
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onKeyDownEsc: PropTypes.func.isRequired,
};

export default Modal;
