import React, { Component } from 'react';
import './Carousel.css';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      teste: 'name'
    };

    this.getProduct = this.getProduct.bind(this);
  }

  getProduct(e) {
    e.preventDefault();

    fetch("http://localhost:3000/product/1768629")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result', result);
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  listProducts = () => {
    let products = [];
    let objProducts = this.state.items;

    for (let x in objProducts.recommendation) {
      products.push(
        <div key={objProducts.recommendation[x].businessId.toString()} className="Box">
          <div className="">
          <label>{objProducts.recommendation[x].name}</label>
          <div>
            De: {objProducts.recommendation[x].oldPrice} <br />
            Por: {objProducts.recommendation[x].price}
          </div>
          <div>
            <div className="content" dangerouslySetInnerHTML={{ __html: objProducts.recommendation[x].productInfo.paymentConditions }}></div>
          </div>
          <img src={objProducts.recommendation[x].imageName} alt="" />
        </div>
        </div>
      )
    }
    return products
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Carousel</h1>
        </header>
        <div className="Line">
          {this.listProducts()}
        </div>

      </div>
    );
  }
}

export default Carousel;
