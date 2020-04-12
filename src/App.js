import React, { Component } from 'react';
import './scss/app.scss';
import arrow from './images/arrow.svg';
import menu from './images/menu.svg';

import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      national:[],
      name:'Infomation',
      keyword:'',
      hiddenMenu:false 
    }
  }

  componentDidMount() {
    axios.get('https://pomber.github.io/covid19/timeseries.json').then(res => {
      this.setState({
        list: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  };

  changeData = (list,item) => {
    let arr = Object.keys(list).map(key => {
      return list[key];
    });
    this.setState({
      national: arr,
      name: item,
      hiddenMenu:!this.state.hiddenMenu
    })
  };

  onChange = (event) => {
    let value = event.target.value;
    this.setState({
      keyword:value
    })
  };

  displayMenu = () => {
    this.setState({
      keyword:'',
      hiddenMenu:!this.state.hiddenMenu
    })
  }
 
  render(){
    let { list, national,name,keyword } = this.state;

    //show list
    let result = Object.keys(list).map((item, index) => {
      return  <li className="item" key={index} onClick={() => this.changeData(list[item],item)}>
                <button className="btn">
                  <img src={arrow} alt=""></img>
                  {item}
                </button>
              </li>
    });
    
    //show table
    let result2 = national.map((item,index) => {
      return <tr key={index}>
              <td>{item.date}</td>
              <td>{item.confirmed}</td>
              <td>{item.deaths}</td>
              <td>{item.recovered}</td>
            </tr>
    });

    //total
    let total = national.slice(-1).map((item, index) => {
      return <div className="infomation" key={index}>
              <span className="infomation__text">Số ca nhiễm:&nbsp;
                { item.confirmed }
              </span>
              <span className="infomation__text">Số ca tử vong: &nbsp;
              { item.deaths }
              </span>
              <span className="infomation__text">Số ca phục hồi: &nbsp;
              { item.recovered }
              </span>
            </div>
    });
    //search 
    result = Object.keys(list).map((key, index) => {
      if(key.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
        return  <li className="item" key={index} onClick={() => this.changeData(list[key],key)}>
                  <button className="btn">
                    <img src={arrow} alt=""></img>
                    {key}
                  </button>
                </li>
      }
    });
    
    return (
      <div className="wrapper">
        <div className="wide">
          <label htmlFor="collapse" className="menu" onClick={this.displayMenu}>
            <img src={menu} alt=""></img>
          </label>
          <input id="collapse" type="checkbox" hidden></input>
          <div className={this.state.hiddenMenu ? 'menu__wrapper' : 'hiddenMenu'}>
            <input className="searchInput" placeholder="Nhập quốc gia" value={keyword} onChange={this.onChange}></input>
            <ul className="list">
              { result }
            </ul>
          </div>
          <article className="heading">Data Corona</article>
  
          <div className="row">
            <div className="col l-3">
              <input className="searchInput" placeholder="Nhập quốc gia" value={keyword} onChange={this.onChange}></input>
              <ul className="list">
                { result }
              </ul>
            </div>
            <div className="col l-9">
              <div className="data">
                  <article className="national__heading">{name}</article>
                  <div className="table__wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Confirmed</th>
                          <th>Deaths</th>
                          <th>Recovered</th>
                        </tr>
                      </thead>
                      <tbody>
                        { result2 }
                      </tbody>
                    </table>
                  </div>
                   {/* total */}
                    {total}
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
