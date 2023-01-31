import React from "react";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import Field from "./Field";
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from '../../services/cardService'
import Payment from 'payment'

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    };
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = ({target}) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  }

  render() {
    return (
      <div className="div-80">
         <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <form>
            <Field type="tel" name="number" 
                placeholder="Card Number" 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
                error={Payment.fns.validateCardNumber(this.state.number) ? "" : "Card number is not valid."}/>
            <Field type="text" name="name"
                placeholder="Card Holder Name" 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus}
                error={this.state.name.length > 0 ? "" : "Card holder name is mandatory"}
                />
            <span className="inline">
              <Field type="tel" name="expiry"
                  placeholder="MM/YY"
                  onChange={this.handleInputChange} 
                  onFocus={this.handleInputFocus} 
                  error={Payment.fns.validateCardExpiry(this.state.expiry) ? "" : "Invalid date"}
                  classProp="div-25"/>
              <Field type="tel" name="cvc"
                  placeholder="CVC"
                  onChange={this.handleInputChange} 
                  onFocus={this.handleInputFocus} 
                  error={Payment.fns.validateCardCVC(this.state.cvc) ? "" : "Invalid"}
                  classProp="div-20"/>
            </span>
          </form>

          
      </div>
    );
  }
}

export default CreditCardForm;
