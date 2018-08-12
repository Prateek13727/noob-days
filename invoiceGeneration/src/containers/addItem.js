import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { addItem, clearForm } from '../actions/index';

class AddItem extends Component {

  validateData(item){
    const { name, quantity, price, tax, medical } = item;
    if (quantity < 1) {
      return false;
    }
  }

  submit(event) {
    event.preventDefault()
    const { name, quantity, price, tax, medical } = event.target;
    const { addItem } = this.props;
    if(!this.validateData(event.target)) {
      return;
    }
    addItem({ 
      name: name.value, 
      quantity: quantity.value, 
      price: price.value, 
      tax: tax.value,
      medical: medical.checked ? true : false
    });
  }

  clearCart(event) {
    event.preventDefault();
    const { clearForm } = this.props;
    clearForm();
  }

  render() {
    return <div className="container"> 
      <header>
      </header>
      <main>
        <section className="section-form">
          <div className="u-center-text u-margin-bottom-small">
              <h2 className="heading-secondary">
                  Add Items
              </h2>                    
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <form className="form" onSubmit={this.submit.bind(this)}>
              <div className="form__group">
                <label htmlFor="name" className="form__label">Item Name:</label>
                <input name="name" type="text" className="form__input" placeholder="Item name" id="name" required />
              </div>
              <div className="form__group">
                <label htmlFor="quantity" className="form__label">Quantity:</label>
                <input name="quantity" type="number" className="form__input" id="quantity" 
                placeholder="Quantity" required />
              </div>
              <div className="form__group">
                <label htmlFor="price" className="form__label">ItemPrice:</label>
                <input name="price" type="text" className="form__input" placeholder="Price" id="price" required />              
              </div>
               <div className="form__group">
                <label htmlFor="tax" className="form__label">Tax:</label>
                <input name="tax" type="text" className="form__input" placeholder="Tax" id="tax" value="0.20" readOnly />
              </div>
              <div className="form__group">
                <label htmlFor="checkbox" className="form__label">Medical</label>
                <input name="medical" type="checkbox" className="form__checkbox" id="checkbox" />
              </div>
              <div className="form__group">
                <button className="btn form__add-btn" type="submit">
                    Add
                </button>
                <button className="btn form__clear-btn" type="reset">
                    Clear
                </button>
              </div>
              <div className="form__group">
                <button className="btn form__checkout-btn" type="button">
                    <Link to={`/checkout`}>
                      View Invoice
                    </Link>
                </button>
              </div>
            </form>
            </div>       
          </div>      
        </section>
      </main>
      <footer>
      </footer>
    </div>
  }
}

export default connect(null, { addItem, clearForm })(AddItem);
