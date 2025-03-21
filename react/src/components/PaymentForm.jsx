import React, { useState } from "react";

const PaymentForm = () => {

    return (
        <div className="container mt-5">
          <h2 className="mb-4" style={{color:"#333333"}}>Credit Card Payment</h2>
          <form >
            <div className="form-group" >
              <label htmlFor="cardName" style={{display:"flex"}}>Cardholder Name</label>
              <input
                type="text"
                className="form-control"
                id="cardName"
                name="cardName"
                placeholder="Enter cardholder name"
                required
              />
            </div>
            <div className="form-group" >
              <label htmlFor="cardNumber" style={{display:"flex"}}>Card Number</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter card number"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="expiryDate" style={{display:"flex"}}>Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cvv" style={{display:"flex"}}>CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      );
};

export default PaymentForm;