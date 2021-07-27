import "bootswatch/dist/lux/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
const KEY_PRIVATE_STRIPE = process.env.REACT_APP_KEY_PRIVATE_STRIPE;
const stripePromise = loadStripe(KEY_PRIVATE_STRIPE);

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        setLoading(true);
        if (!error) {
            const { id } = paymentMethod;
            let _data = {
                id,
                amount: 10000,
            };
            try {
                await fetch("http://localhost:3001/api/checkout", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                    .then((response) => response.json())

                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
            elements.getElement(CardElement).clear();
        }
    };

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <img
                src="https://m.media-amazon.com/images/I/71X-3musWkL._AC_SY450_.jpg"
                alt="teclado"
                className="img-fluid"
            />

            <h3 className="text-center my-2">Price: $100</h3>

            <div className="form-group">
                <CardElement className="form-control" />
            </div>

            <button className="btn btn-success" disabled={!stripe}>
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    "Buy"
                )}
            </button>
        </form>
    );
};

function App() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    );
}

export default App;
