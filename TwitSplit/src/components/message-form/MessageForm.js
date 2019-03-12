import React from "react";
import './styles.scss';
import Modal from '../modal/Modal';
import axios from 'axios';


class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      show: false,
      messageSplited: []
    }
    this.CONSTANT_NUMBER_LIMITED = 50;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageSplited = this.splitMessage(this.state.message);
    this.setState({ messageSplited })
    this.getNotification();
    this.setState({ message: '' })
  }

  splitMessage(characters) {
    let resultMes = [];
    if (characters.length <= this.CONSTANT_NUMBER_LIMITED) {
      resultMes.push({
        index: 1,
        message: characters
      })
      return resultMes;
    } else {
      let subStringArr = characters.split(" ");
      for (let i = 0; i < subStringArr.length; i++) {
        if (subStringArr[i].length >= this.CONSTANT_NUMBER_LIMITED) {
          resultMes.push({
            index: 1,
            message: 'Sorry! The message contains a span of non-whitespace characters longer than 50 characters'
          })
          return resultMes;
        }
      }
      let numberOfChunks = 0;
      let indicator = "";
      let chunks = "";
      if (characters.length % this.CONSTANT_NUMBER_LIMITED === 0) {
        numberOfChunks = Math.floor(characters.length / this.CONSTANT_NUMBER_LIMITED);
      } else {
        numberOfChunks = Math.floor(characters.length / this.CONSTANT_NUMBER_LIMITED) + 1;
      }
      for (let i = 0; i < numberOfChunks; i++) {
        indicator = `${i + 1}/${numberOfChunks}`;
        if (i === numberOfChunks - 1) {
          chunks = characters.substring(0, characters.length);
        } else {
          chunks = characters.substring(0, this.CONSTANT_NUMBER_LIMITED - indicator.length - 1);
          characters = characters.substring(this.CONSTANT_NUMBER_LIMITED - indicator.length - 1, characters.length)
        }
        resultMes.push({
          index: i + 1,
          message: `${indicator} ${chunks}`
        })
      }
      return resultMes;
    }
  }

  getNotification() {
    this.setState({ show: true })
  }

  handleChange(e) {
    this.setState({ message: e.target.value })
  }

  closePopup() {
    this.setState({ show: false })
  }

  sendMessage() {
    let promises = [];
    const messages = this.state.messageSplited;
    for (let i = 0; i < messages.length; i++) {
      promises.push(new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3001',
          headers: {}, 
          data: {
            message: messages[i]
          }
        });
      }))
    }
    Promise.all(promises);
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="container">
        <div className="message-form">
          <h2 className="title">Respone To Us</h2>
          <label className="lable">Message</label>
          <form onSubmit={this.handleSubmit}>
            <textarea type="text" className="text" rows={10} value={this.state.message} onChange={this.handleChange}></textarea>
            <button type="submit" className="btn btn-send"> <i className="fa fa-paper-plane" aria-hidden="true"></i>Send</button>
          </form>
        </div>
        {this.state.show ?
          <Modal
            text='Close Me'
            title="Message"
            messageSplited={this.state.messageSplited}
            closePopup={this.closePopup}
            sendMessage={this.sendMessage}
          />
          : null
        }
      </div>
    );
  }
}
export default MessageForm;