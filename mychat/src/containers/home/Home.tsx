import React from 'react';
import { Component } from 'react';
import './Home.css';
import { Chat } from '../../components/chat/Chat';
// Using class => import Chaton from '../../components/chat/Chaton';

interface IState {
  room: string;
  isRoomPicked: boolean;
}
interface IProps {}

class Home extends Component<IProps, IState> {
  private inputRef: React.RefObject<HTMLSelectElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      room: '',
      isRoomPicked: false,
    };
    this.inputRef = React.createRef();
  }

  handleClick = () => {
    let value = this.inputRef.current?.value;
    this.setState({
      room: value!,
      isRoomPicked: true,
    });
    //console.log(this.state.room, 'your room when clicked');
  };

  render() {
    const { room } = this.state;
    return (
      <>
        <div id='home'>
          <h1> Hello home</h1>
          <div id='container-select-room'>
            <select name='rooms' id='rooms' ref={this.inputRef}>
              <option value='Sport'>Sport</option>
              <option value='Science'>Science</option>
            </select>
            <button onClick={this.handleClick}> Join</button>
          </div>
        </div>
        {/*  Using Class {this.state.isRoomPicked && <Chaton roomName={room} />} */}
        {/* Using functional component */}{' '}
        {this.state.isRoomPicked && <Chat roomName={room} />}
      </>
    );
  }
}

export default Home;
