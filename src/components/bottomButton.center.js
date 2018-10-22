import React, { Component } from 'react';
import { Icon } from 'antd';

const bottomButtonWrapStyle = {
  position: 'relative',
  backgroundColor: '#fff',
  borderTop: '1px solid #ccc',
  borderBottom: '1px solid #ccc'
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
    this.end = false;
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

    this.now = e.changedTouches[0].clientX;

    this.end = true;

    this.handlePositon();

    this.end = false;
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
    
    if(this.end) left = this.handleCenter(left);

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

  handleCenter = left => {
    let baseWidth = this.width * 0.2
    let ratio = left / baseWidth
    let ratioInt = parseInt(ratio)
    let remainder = ratio - ratioInt
    if (remainder < 0.5) {
      left = ratioInt * baseWidth
    } else {
      left = (ratioInt + 1) * baseWidth
    }
    return left
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
