import React, { Component } from 'react';
import './App.css';
import Slider from "react-slick";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      items: [],
      value: 1768629
    };

    this.getProduct = this.getProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //1768629
  getProduct(e) {
    e.preventDefault();

    fetch("http://localhost:3001/product/" + this.state.value)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.data
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  listProducts = () => {
    let products = [];
    let objProducts = this.state.items;

    if (this.state.items) {
      for (let recommendation in objProducts.recommendation) {
        let productRecommendation = objProducts.recommendation[recommendation];

        products.push(
          <div key={productRecommendation.businessId.toString()} className="App-box txt-center">
            <img src={productRecommendation.imageName} alt="" className="App-img" />
            <label>{productRecommendation.name}</label>
            <div className="mt-10">
              De: {productRecommendation.oldPrice}
            </div>
            <div className="text-red">
              Por: {productRecommendation.price}
              <div dangerouslySetInnerHTML={{ __html: productRecommendation.productInfo.paymentConditions + ' sem juros' }}></div>
            </div>
          </div>
        )
      }

    } else {
      products.push(
        <div className="App-box txt-center">
          <label>Produto não encontrado</label>
        </div>
      )
    }

    return products
  }

  listReference = () => {
    let product = [];
    let objProducts = this.state.items;

    if (this.state.items) {
      if (typeof objProducts.reference === 'object') {
        let reference = objProducts.reference.item;

        product.push(
          <div key={reference.businessId.toString()}>
            <div className="App-title"><h2>Você visitou</h2></div>

            <div className="App-box txt-center">
              <img src={reference.imageName} alt="" className="App-img" />
              <label>{reference.name}</label>
              <div className="mt-10">
                De: {reference.oldPrice}
              </div>
              <div className="text-red">
                Por: {reference.price}
                <div dangerouslySetInnerHTML={{ __html: reference.productInfo.paymentConditions + ' sem juros' }}></div>
              </div>
            </div>
          </div>
        )
      }
    }

    return product
  }

  title = () => {
    if (this.state.items.recommendation) {
      return <div className="App-title"><h2>e talvez se interesse por:</h2></div>
    }
  }

  render() {

    const settings = {
      dots: true,
      infinite: false,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    return (
      <div>

        <header>
          <div className="topnav">
            <a className="active">Home</a>
            <div className="search-container">
              <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Id Product" />
              <button type="button" onClick={this.getProduct}>Go</button>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="App-main">
            {this.listReference()}
          </div>

          {this.title()}

          <Slider {...settings} className="App-menu">
            {this.listProducts()}
          </Slider>
        </div>

        {/* <div id="container"></div> */}

      </div>
    );
  }
}

export default App;
