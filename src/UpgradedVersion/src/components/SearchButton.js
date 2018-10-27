import React, { Component } from 'react';
import { Icon } from 'antd';

class SearchButton extends Component {
  render() {
    const bottomButtonWrapStyle = {
      position: 'fixed',
      bottom: this.props.bottom,
      left: 0,
      right: 0,
      height: '30px',
      backgroundColor: 'rgba(0,0,0,0)',
      transition: 'bottom 0.5s'
    };

    const iconBoxStyle = {
      position: 'absolute',
      width: 30,
      height: 30,
      lineHeight: '30px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      boxShadow: 'rgba(0, 0, 0, .9) 0px 2px 8px',
      borderColor: 'rgba(0, 0, 0, 1)',
      left: "50%",
      marginLeft: -15,
      textAlign: 'center',
      fontSize: 20
    }

    return (
      <div
        style={{...bottomButtonWrapStyle, bottom: this.props.bottom}}
      >
        <div style={iconBoxStyle}>
          <Icon type='search' theme="outlined" />
        </div>
      </div>
    )
  }
}

export default SearchButton
