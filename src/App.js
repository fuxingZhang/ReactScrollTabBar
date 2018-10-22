import React, { Component } from 'react';
import './App.css';
import BottomButton1 from './components/bottomButton.scale'
import BottomButton2 from './components/bottomButton.center'
import BottomButton3 from './components/bottomButton.fontsize'

const divStyle = {
  padding: '40px 10% 10px'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React移动端无穷滚动菜单组件</h1>
        <div style={divStyle}>下面这个组件是基于CSS3写的，支持所有情况</div>
        <BottomButton1 />
        <div style={divStyle}>下面这个组件是上面的组件加入回弹效果,手指离开屏幕后图标居中</div>
        <BottomButton2 />
        <div style={divStyle}>下面这个组件是基于字体图标的fontSize写的，仅支持字体图标</div>
        <BottomButton3 />
      </div>
    );
  }
}

export default App;
