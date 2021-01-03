import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: null,
      hate_level: 'zero',
      hate_value: 0,
      linus_path: './src/0.png'
    };

    this.getRant = this.getRant.bind(this);
  }

  getRant() {
    let that = this;
    axios.get('http://api.3hz.io/linus')
      .then((response) => {
        let hate = response.data.hate;
        let imgPath, hateLevel;
        if (hate <= 0.5) {
          imgPath = './src/0.png';
          hateLevel = 'zero';
        } else if (hate <= .66) {
          imgPath = './src/1.png';
          hateLevel = 'one';
        } else if (hate < .83) {
          imgPath = './src/2.png';
          hateLevel = 'two';
        } else if (hate >= .83) {
          imgPath = './src/3.png';
          hateLevel = 'three';
        }
        that.setState({
          quote: response.data.text,
          hate_level: hateLevel,
          hate_value: hate,
          linus_path: imgPath
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <div className="container">

        <h1 className="header">

          <div className="splash_container">
            <img className="splash" src={"./src/linusrage.png"}/>
          </div>
        </h1>

        <div className="main">
          <div className="quote">
            {this.state.quote}
          </div>
          <div className="avatar_container">
            <img className ="avatar" id={this.state.hate_level} src={this.state.linus_path}></img>
          </div>
        </div>

        <div className="hate_container">
          <h2>Hate: {this.state.hate_value}</h2>
        </div>

        <div className="button_container">
          <a className="button" onClick={this.getRant}>
            Rage
          </a>
        </div>
      </div>
    )
  }
}

export default App;