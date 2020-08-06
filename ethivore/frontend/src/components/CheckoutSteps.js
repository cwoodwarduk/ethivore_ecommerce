import React from "react";

function CheckoutSteps(props){
    return <div className="checkout-steps">
        <div className={props.stepOne ? 'active' : ''}>Signin</div>
        <div className={props.stepTwo ? 'active' : ''}>Shipping</div>
        <div className={props.stepThree ? 'active' : ''}>Payment</div>
        <div className={props.stepFour ? 'active' : ''}>Place Order</div>
    </div>
}

export default CheckoutSteps;