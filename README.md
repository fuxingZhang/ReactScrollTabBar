# react 组件，实现移动端无穷滚动的菜单效果
基于移动端的手指触摸，不适用PC，当然简单改造也是可以适用的  

左滑、又滑动可以无限滚动图标  

灵感来源于iPhone input type == date 的效果  

## 运行  
> git clone https://github.com/fuxingZhang/ReactScrollTabBar.git   
> yarn  
> yarn start  

## DEMO  

> [demo](https://fuxingzhang.github.io/ReactScrollTabBar/)

## 效果图

![demo img](https://github.com/fuxingZhang/ReactScrollTabBar/blob/master/screenShoots/screenshoot.jpg)

## 引入antd库是仅仅是为了用里面的图标  
更高的复用性还需要再改进一下代码  

基于CSS3实现  
```  
import React, { Component } from 'react';
import { Icon } from 'antd';

const bottomButtonWrapStyle = {
  position: 'fixed',
  top: 200,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc'
};

const bottomButtonStyle = {
  position: 'relative',
  width: '80%',
  margin: '0 10%',
  textAlign: 'center',
  height: 60,
  fontSize: 40
};

const iconBoxStyle = {
  position: 'absolute',
  width: '20%',
  height: '60px',
  lineHeight: '60px',
}

class BottomButton extends Component {
  constructor(props) {
    super(props);
    this.baseScale = 1.4;
    this.start = 0;
    this.now = 0;
    this.width = document.body.clientWidth * 0.8;
    this.center = this.width * 0.4;
    this.state = {
      icon1: 'home',
      icon2: 'smile',
      icon3: 'calendar',
      icon4: 'user',
      icon5: 'setting',
      left1: 0,
      left2: this.width * 0.2,
      left3: this.width * 0.4,
      left4: this.width * 0.6,
      left5: this.width * 0.8,
      scale1: 1 - this.baseScale * 0.4,
      scale2: 1 - this.baseScale * 0.2,
      scale3: 1,
      scale4: 1 - this.baseScale * 0.2,
      scale5: 1 - this.baseScale * 0.4,
    };
    this.icons = ['search', 'delete', 'laptop'];
  }

  touchStart = e => {
    if (e.targetTouches.length > 1) {
      return
    }

    this.start = e.targetTouches[0].clientX;
  }

  touchMove = e => {
    if (e.targetTouches.length > 1) {
      return
    }

    this.now = e.targetTouches[0].clientX;

    this.handlePositon();

    this.start = this.now;
  }

  touchEnd = e => {
    if (e.changedTouches.length > 1) {
      return
    }

    this.handlePositon();

    this.now = e.changedTouches[0].clientX;
  }

  handleData = (left, icon) => {
    left = left + this.now - this.start;

    if (left <= -this.width * 0.1) {
      left += this.width;
      this.icons.unshift(icon);
      icon = this.icons.pop();
    }
    if (left >= this.width * 0.9) {
      left -= this.width;
      this.icons.push(icon);
      icon = this.icons.shift();
    };
    const scale = 1 - this.baseScale * Math.abs(left - this.center) / this.width;
    return { left, scale, icon };
  }

  handlePositon = () => {
    const { left: left1, scale: scale1, icon: icon1 } = this.handleData(this.state.left1, this.state.icon1);
    const { left: left2, scale: scale2, icon: icon2 } = this.handleData(this.state.left2, this.state.icon2);
    const { left: left3, scale: scale3, icon: icon3 } = this.handleData(this.state.left3, this.state.icon3);
    const { left: left4, scale: scale4, icon: icon4 } = this.handleData(this.state.left4, this.state.icon4);
    const { left: left5, scale: scale5, icon: icon5 } = this.handleData(this.state.left5, this.state.icon5);

    this.setState({
      left1,
      left2,
      left3,
      left4,
      left5,
      scale1,
      scale2,
      scale3,
      scale4,
      scale5,
      icon1,
      icon2,
      icon3,
      icon4,
      icon5,
    })
  }

  render() {
    return (
      <div
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        style={bottomButtonWrapStyle}
      >
        <div className="bottomButton" style={bottomButtonStyle}>
          <div style={{ ...iconBoxStyle, left: this.state.left1, transform: `scale(${this.state.scale1},${this.state.scale1})` }}>
            <Icon type={this.state.icon1} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left2, transform: `scale(${this.state.scale2},${this.state.scale2})` }}>
            <Icon type={this.state.icon2} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left3, transform: `scale(${this.state.scale3},${this.state.scale3})` }}>
            <Icon type={this.state.icon3} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left4, transform: `scale(${this.state.scale4},${this.state.scale4})` }}>
            <Icon type={this.state.icon4} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left5, transform: `scale(${this.state.scale5},${this.state.scale5})` }}>
            <Icon type={this.state.icon5} theme="outlined" />
          </div>
        </div>
      </div>
    )
  }
}

export default BottomButton
```  

基于fontSize的实现代码  
```  
import React, { Component } from 'react';
import { Icon } from 'antd';

const bottomButtonWrapStyle = {
  position: 'fixed',
  bottom: 100,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc'
};

const bottomButtonStyle = {
  position: 'relative',
  width: '80%',
  margin: '0 10%',
  textAlign: 'center',
  height: 60,
};

const iconBoxStyle = {
  position: 'absolute',
  width: '20%',
  height: '60px',
  lineHeight: '60px',
}

class BottomButton extends Component {
  constructor(props) {
    super(props);
    this.baseScale = 60;
    this.baseSize = 40;
    this.start = 0;
    this.now = 0;
    this.width = document.body.clientWidth * 0.8;
    this.center = this.width * 0.4;
    this.state = {
      icon1: 'home',
      icon2: 'smile',
      icon3: 'calendar',
      icon4: 'user',
      icon5: 'setting',
      left1: 0,
      left2: this.width * 0.2,
      left3: this.width * 0.4,
      left4: this.width * 0.6,
      left5: this.width * 0.8,
      fontSize1: this.baseSize - parseInt(this.baseScale * 0.4),
      fontSize2: this.baseSize - parseInt(this.baseScale * 0.2),
      fontSize3: this.baseSize,
      fontSize4: this.baseSize - parseInt(this.baseScale * 0.2),
      fontSize5: this.baseSize - parseInt(this.baseScale * 0.4),
    };
    this.icons = ['search', 'delete', 'laptop'];
  }

  touchStart = e => {
    if (e.targetTouches.length > 1) {
      return
    }

    this.start = e.targetTouches[0].clientX;
  }

  touchMove = e => {
    if (e.targetTouches.length > 1) {
      return
    }

    this.now = e.targetTouches[0].clientX;

    this.handlePositon();

    this.start = this.now;
  }

  touchEnd = e => {
    if (e.changedTouches.length > 1) {
      return
    }

    this.handlePositon();

    this.now = e.changedTouches[0].clientX;
  }

  handleData = (left, icon) => {
    left = left + this.now - this.start;

    if (left <= -this.width * 0.1) {
      left += this.width;
      this.icons.unshift(icon);
      icon = this.icons.pop();
    }
    if (left >= this.width * 0.9) {
      left -= this.width;
      this.icons.push(icon);
      icon = this.icons.shift();
    };
    const fontSize = 40 - parseInt(this.baseScale * Math.abs(left - this.center) / this.width);
    return { left, fontSize, icon };
  }

  handlePositon = () => {
    const { left: left1, fontSize: fontSize1, icon: icon1 } = this.handleData(this.state.left1, this.state.icon1);
    const { left: left2, fontSize: fontSize2, icon: icon2 } = this.handleData(this.state.left2, this.state.icon2);
    const { left: left3, fontSize: fontSize3, icon: icon3 } = this.handleData(this.state.left3, this.state.icon3);
    const { left: left4, fontSize: fontSize4, icon: icon4 } = this.handleData(this.state.left4, this.state.icon4);
    const { left: left5, fontSize: fontSize5, icon: icon5 } = this.handleData(this.state.left5, this.state.icon5);

    this.setState({
      left1,
      left2,
      left3,
      left4,
      left5,
      fontSize1,
      fontSize2,
      fontSize3,
      fontSize4,
      fontSize5,
      icon1,
      icon2,
      icon3,
      icon4,
      icon5,
    })
  }

  render() {
    return (
      <div
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        style={bottomButtonWrapStyle}
      >
        <div className="bottomButton" style={bottomButtonStyle}>
          <div style={{...iconBoxStyle,  left: this.state.left1, fontSize: this.state.fontSize1 }}>
            <Icon type={this.state.icon1} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left2, fontSize: this.state.fontSize2 }}>
            <Icon type={this.state.icon2} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left3, fontSize: this.state.fontSize3 }}>
            <Icon type={this.state.icon3} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left4, fontSize: this.state.fontSize4 }}>
            <Icon type={this.state.icon4} theme="outlined" />
          </div>
          <div style={{ ...iconBoxStyle, left: this.state.left5, fontSize: this.state.fontSize5 }}>
            <Icon type={this.state.icon5} theme="outlined" />
          </div>
        </div>
      </div>
    )
  }
}

export default BottomButton
``` 
