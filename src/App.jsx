import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: null,
      hate_level: null
    };

    this.getRant = this.getRant.bind(this);
  }

  getRant() {
    let that = this;
    axios.get('http://api.3hz.io/linus')
      .then((response) => {
        that.setState({
          quote: response.data.text,
          hate_level: response.data.hate
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
          <div className="avatar">

          </div>
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