import "bootswatch/dist/lux/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_SQFR2xXdf4XYuOEOW77GMyK8007GCzPuQh");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if (!error) {
            console.log(paymentMethod);
        }
    };

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <img
                src="https://m.media-amazon.com/images/I/71X-3musWkL._AC_SY450_.jpg"
                alt="teclado"
                className="img-fluid"
            />
            <div className="form-group">
                <CardElement className="form-control" />
            </div>

            <button className="btn btn-success">Buy</button>
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
