import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ onClose, src, alt }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

     function handleKeyDown (e) {
       if (e.code === 'Escape') {
         onClose();
       }
    };
    
  }, []);

 

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img className={css.image} src={src} alt={alt} />
      </div>
    </div>
  );
};


export default Modal;