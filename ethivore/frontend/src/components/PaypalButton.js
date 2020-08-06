import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

function PaypalButton(props){

    const [sdkReady, setSdkReady] = useState(false);

    const addPaypalSdk = async () => {
        const result= await Axios.get("/api/config/paypal");
        const clientId = result.data;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=GBP';
        script.async = true;
        script.onload = () =>{
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    const createOrder = (data, actions) => actions.order.create({
        purchase_units: [{
            amount: {
                currency_code: 'GBP',
                value: props.amount
            }
        }]
    });

    const onApprove = (data, actions) => actions.order
        .capture()
        .then(details => props.onSuccess(data, details))
        .catch(error => console.log(error));

    useEffect(() => {
        if(!window.paypal){
            addPaypalSdk();
        }

        return () => {
            //
        };
    }, []);

    if (!sdkReady){
        return <div>Loading...</div>
    }

    const Button = window.paypal.Buttons.driver('react', {React, ReactDOM});

    return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
                   onApprove={(data, actions) => onApprove(data, actions)}/>
}

export default PaypalButton;