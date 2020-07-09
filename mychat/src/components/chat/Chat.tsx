import React, { createRef, useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import './chat.css';
interface Props {
  roomName: string;
}

export const Chat = (props: Props) => {
  // Make connection for the server
  let socket = io.connect('http://localhost:3000');

  //We init to null as the component is not rendered yet.
  const output = React.useRef<HTMLDivElement>(null);
  const feedBack = React.useRef<HTMLDivElement>(null);
  const handle = React.useRef<HTMLInputElement>(null);
  const message = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    socket.emit(props.roomName, {
      message: message.current?.value,
      handle: handle.current?.value,
    });
    if (message.current?.value) {
      message.current.value = '';
    }
  };
  const handleKeyPress = () => {
    switch (props.roomName) {
      case 'Sport':
        socket.emit('typingSport', handle.current?.value);
        break;
      case 'Science':
        socket.emit('typingScience', handle.current?.value);
        break;
      default:
        break;
    }
  };

  const cleanRoom = () => {
    output.current!.innerHTML = '';
    handle.current!.value = '';
  };
  //Life cycle: [] = did mount(only one time)
  useEffect(() => {
    console.log(' render first time the component is mounted');
  }, []);
  //Run each time the component is render (after receiving an update);
  useEffect(() => {
    cleanRoom();
    socketInit();
    console.log('render each time there is an update');
  });
  //Use state hooks. First argument the state, the second is the method to be called to change state
  const [state, setState] = useState({ room: props.roomName });

  const socketInit = () => {
    //Received data from web.socket/server
    socket.on(props.roomName, (data: any) => {
      //Clear notification
      if (feedBack.current?.innerHTML) {
        feedBack.current!.innerHTML = '';
      }
      //Display data
      if (output.current) {
        output.current!.innerHTML +=
          '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
      }
    });
    //Someone else is writing; display notification.
    let onTyping = 'typing' + props.roomName;
    socket.on(onTyping, (data: any) => {
      if (feedBack.current) {
        feedBack.current!.innerHTML =
          '<p><em>' + data + ' is typing a message...</em></p>';
      }
    });
  };
  return (
    <>
      <div id='mario-chat'>
        <h2>{props.roomName}</h2>
        <div id='chat-window'>
          <div id='output' ref={output}></div>
          <div id='feedback' ref={feedBack}></div>
        </div>
        <input id='handle' type='text' placeholder='Handle' ref={handle} />
        <input
          onKeyPress={handleKeyPress}
          id='message'
          type='text'
          placeholder='Message'
          ref={message}
        />
        <button onClick={handleClick} id='send'>
          Send
        </button>
      </div>
    </>
  );
  if (props.roomName !== state.room) {
    if (output.current) {
      output.current!.innerHTML = '';
    }
    setState({ room: props.roomName });
  }
};
