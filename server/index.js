const express = require("express");
const stripe = require("stripe");
const cors = require("cors");

const app = express();

const Stripe = new stripe("sk_test_k1M0FrRk2Qq7sdhA4yfUPXI200jXm9Q9Wz");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
    try {
        const { id, amount } = req.body;
        const payment = await Stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Gaming keyborad",
            payment_method: id,
            confirm: true,
        });
        console.log(payment, "payment");
        res.send({ message: `Succesfull payment` });
    } catch (error) {
        console.log(error);
        res.json({ message: error.raw.message });
    }
});

app.listen(3001, () => {
    console.log(`server on port:`, 3001);
});
