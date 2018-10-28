import React, { Component } from 'react';
import { Card, Row, Col, Rate } from 'antd';
import BottomButton from '../components/BottomButton';
import SearchButton from '../components/SearchButton';

const { Meta } = Card;

class Home extends Component {
  constructor(props) {
    super(props);
    this.now = 0;
    this.start = 0;
    this.max = 0;
    this.state = {
      icon1: 'home',
      bottom1: 40,
      bottom2: -80
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  getTop = () => Math.max(document.documentElement.scrollTop, document.body.scrollTop)

  getMax = () => Math.max(document.documentElement.scrollHeight - document.documentElement.clientHeight, document.body.scrollHeight - document.body.clientHeight)

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    this.now = this.getTop();
    this.max = this.getMax();
    console.log('---',this.now,this.max)
    if(this.now >= this.max - 100 || this.now <= 0) return;
    console.log(this.now + ',' + this.start)

    if(this.now !== this.start) {
      window.removeEventListener("scroll", this.onScroll);
      setTimeout( () => {
        window.addEventListener("scroll", this.onScroll, false);
        this.start = this.getTop();
      }, 300)
    }

    if(this.now < this.start) {
      this.setState({
        bottom1: 20,
        bottom2: -80
      })
    } else {
      this.setState({
        bottom1: -80,
        bottom2: 20
      })
    }
  }

  touchStart = e => {
    window.addEventListener("scroll", this.onScroll, false);

    // if (e.targetTouches.length > 1) {
    //   return
    // }

    // this.start = e.targetTouches[0].clientY;
  }

  touchMove = e => {
    if (e.targetTouches.length > 1) {
      return
    }

    this.now = e.targetTouches[0].clientY;

    if(this.now > this.start) {
      this.setState({
        bottom1: 20,
        bottom2: -80
      })
    } else {
      this.setState({
        bottom1: -80,
        bottom2: 20
      })
    }

    // if(Math.abs(this.start - this.now) > 20) this.start = this.now;
  }

  touchEnd = e => {
    window.removeEventListener("scroll", this.onScroll);

    // if (e.targetTouches.length > 1) {
    //   return
    // }

    // this.now = e.changedTouches[0].clientY;

    // if(this.now > this.start) {
    //   this.setState({
    //     bottom1: 20,
    //     bottom2: -80
    //   })
    // } else {
    //   this.setState({
    //     bottom1: -80,
    //     bottom2: 20
    //   })
    // }
  }

  render() {
    const obj = {
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: "上滑下滑", 
      // description: "www.instagram.com"
    }
    let res = [];
    for(let i = 0;i< 13;i++) {
      res.push(obj);
    }
    let items = [];
    res.forEach((item, index) => {
      let i = parseInt(index/2);
      if(!(index % 2)) items[i] = [];
      items[i].push(item);
    })
    
    const Cell = ({value}) => (
      <Col span={12}>
        <div 
          style={{
            margin: 10,
            display: 'block',
            // backgroundColor: '#f6f6f6'
            borderRadius: 25,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          <Card
            hoverable={false}
            bordered={false}
            // style={{ width: 240 }}
            cover={<img alt="example" src= {value.url}/>}
            >
            <Meta
              title= {value.title}
              description={value.description}
            />
            <Rate disabled defaultValue={2} style={{
              fontSize: 16,
              marginTop: 10
            }}/>
          </Card>
        </div>
      </Col>
    )
    
    const listItems = items.map((item, index) => {
      if(item.length === 1) {
        return (
          <Row key={index.toString()}>
            <Cell value={item[0]}/>
          </Row>
        )
      } else {
        return (
          <Row key={index.toString()}>
            <Cell value={item[0]}/>
            <Cell value={item[0]}/>
          </Row>
        )
      }
    });

    return (
      <div 
        className="list"
        style={{
          padding: '10px 10px 68px',
          // backgroundColor: '#f6f6f6'
        }}
        onTouchStart={this.touchStart}
        // onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        {listItems}
        <BottomButton bottom={this.state.bottom1} onScroll={this.onScroll}/>
        <SearchButton bottom={this.state.bottom2}/>
      </div>
    );
  }
}

export default Home
