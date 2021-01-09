import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount(){
        window.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() { 
        window.removeEventListener('keydown', this.closeModal);
    }

    closeModal = (e) => {
        console.log("close MODAL", Date.now());
        if (e.code === 'Escape') this.props.onClose();
        
        if(e.target === e.currentTarget) this.props.onClose();
    }

    render() {
        const { src, alt} = this.props;
        return createPortal(
            <div className={s.Overlay} onClick={this.closeModal}>
                <div className={s.Modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>,
            modalRoot
        )
    }
}

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal

