/*import React from 'react';
import { Component } from 'react';
import './chat.css';
import io from 'socket.io-client';
import { render } from 'react-dom';

// Make connection for the server
let socket = io.connect('http://localhost:3000');

//We initiate the forma
interface IProps {
  room: string;
}
class Science extends Component<IProps> {
  //We precise which type of html element we are going to assign a ref
  private message: React.RefObject<HTMLInputElement>;
  private handle: React.RefObject<HTMLInputElement>;
  private feedBack: React.RefObject<HTMLDivElement>;
  private output: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    //We create our ref to access the dom
    this.message = React.createRef();
    this.handle = React.createRef();
    this.feedBack = React.createRef();
    this.output = React.createRef();
  }
  //Send to the server the mess:socket
  handleClick = () => {
    socket.emit('', {
      message: this.message.current?.value,
      handle: this.handle.current?.value,
    });
    if (this.message.current?.value) {
      this.message.current.value = '';
    }
  };
  handleKeyPress = () => {
    socket.emit('typing', this.handle.current?.value);
  };

  // Listen for events from the server  (After that others use send their message)
  componentDidMount = () => {
    socket.on('chat', (data: any) => {
      if (this.feedBack.current?.innerHTML) {
        this.feedBack.current.innerHTML = '';
      }
      this.output.current!.innerHTML +=
        '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    });
    socket.on('typing', (data: any) => {
      this.feedBack.current!.innerHTML =
        '<p><em>' + data + ' is typing a message...</em></p>';
    });
  };

  render() {
    return (
      <>
        <div id='mario-chat'>
          <h2>Science</h2>
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

export default Science;
*/
