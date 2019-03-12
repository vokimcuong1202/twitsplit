import React from "react";
import './styles.scss';
import PropTypes from 'prop-types';

const Modal = props => (
  <div className='popup'>
    <div className='popup-content'>
      <header className="header">
        {props.title}
      </header>
      <div className="body">
        {props.messageSplited.map(item => <div key={item.index}>{item.message}</div>)}
      </div>
      <footer className="footer">
        <button onClick={props.closePopup} className="btn btn-close">Close</button>
        <button onClick={props.sendMessage} className="btn btn-send">Send</button>
      </footer>
    </div>
  </div>
);
Modal.propTypes = {
  messageSplited: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    message: PropTypes.string
  })).isRequired,
  closePopup: PropTypes.func,
  title: PropTypes.string
}
export default Modal;