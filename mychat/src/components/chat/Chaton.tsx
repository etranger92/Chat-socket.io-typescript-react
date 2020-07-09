import React from 'react';
import { Component } from 'react';
import io from 'socket.io-client';
import './chat.css';

interface IProps {
  roomName: string;
}
let socket = io.connect('http://localhost:3000');
class Chaton extends Component<IProps> {
  //
  private output: React.RefObject<HTMLDivElement>;
  private feedBack: React.RefObject<HTMLDivElement>;
  private handle: React.RefObject<HTMLInputElement>;
  private message: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);

    this.output = React.createRef();
    this.feedBack = React.createRef();
    this.handle = React.createRef();
    this.message = React.createRef();
  }
  socketInit = () => {
    //Received data from web.socket/server
    socket.on(this.props.roomName, (data: any) => {
      //Clear notification
      if (this.feedBack.current!.innerHTML) {
        this.feedBack.current!.innerHTML = '';
      }
      //Display data
      if (this.output.current) {
        this.output.current!.innerHTML +=
          '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
      }
    });
    //Someone else is writing; display notification.
    let onTyping = 'typing' + this.props.roomName;
    socket.on(onTyping, (data: any) => {
      if (this.feedBack.current) {
        this.feedBack.current!.innerHTML =
          '<p><em>' + data + ' is typing a message...</em></p>';
      }
    });
  };
  handleClick = () => {
    socket.emit(this.props.roomName, {
      message: this.message.current?.value,
      handle: this.handle.current?.value,
    });
    if (this.message.current?.value) {
      this.message.current.value = '';
    }
  };
  handleKeyPress = () => {
    switch (this.props.roomName) {
      case 'Sport':
        socket.emit('typingSport', this.handle.current?.value);
        break;
      case 'Science':
        socket.emit('typingScience', this.handle.current?.value);
        break;
      default:
        break;
    }
  };
  roomClear = () => {
    this.output.current!.innerHTML = '';
    this.handle.current!.value = '';
  };
  //If user pick another room we clear the room's data
  shouldComponentUpdate(nextProps: any) {
    if (nextProps.roomName != this.props.roomName) {
      console.log('shouldComponentUpdate', this.props.roomName);
      this.roomClear();
    }
    return true;
  }

  render() {
    this.socketInit();
    return (
      <>
        <div id='mario-chat'>
          <h2>{this.props.roomName}</h2>
          <div id='chat-window'>
            <div id='output' ref={this.output}></div>
            <div id='feedback' ref={this.feedBack}></div>
          </div>
          <input
            id='handle'
            type='text'
            placeholder='Handle'
            ref={this.handle}
          />
          <input
            onKeyPress={this.handleKeyPress}
            id='message'
            type='text'
            placeholder='Message'
            ref={this.message}
          />
          <button onClick={this.handleClick} id='send'>
            Send
          </button>
        </div>
      </>
    );
  }
}

export default Chaton;
