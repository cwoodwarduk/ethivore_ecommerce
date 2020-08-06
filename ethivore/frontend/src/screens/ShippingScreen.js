import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {saveShipping} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen (props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, country, postalCode}));
        props.history.push('payment');
    };

    return <div>
        <CheckoutSteps stepOne stepTwo ></CheckoutSteps>

        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            Post Code
                        </label>
                        <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="action-button">Continue</button>
                    </li>

                </ul>
            </form>
        </div>
    </div>

}

export default ShippingScreen;