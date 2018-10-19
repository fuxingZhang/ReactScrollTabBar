import React, { Component } from 'react';
import './App.css';
import BottomButton from './components/bottomButton'
import BottomButton2 from './components/bottomButton.scale'

const div1 = {
  position: 'fixed',
  top: 140,
  left: 0,
  right: 0,
};

const div2 = {
  position: 'fixed',
  bottom: 200,
  left: 0,
  right: 0,
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>无穷滚动的菜单</h1>
        <div style={div1}>下面这个组件是基于CSS3写的，支持所有情况</div>
        <BottomButton />
        <div style={div2}>下面这个组件是基于字体图标的fontSize写的，仅支持字体图标</div>
        <BottomButton2 />
      </div>
    );
  }
}

export default App;
