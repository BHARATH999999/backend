// This is your test secret API key.
const sk = require("./raw/secrets")
const stripe = require('stripe')(sk);

const YOUR_DOMAIN = 'http://localhost:3000';

async function createSession(req, res){
    try{
        const session = await stripe.checkout.sessions.create({
            // payment_method_types:['card'],
            line_items: [
                {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '',
                quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        res.json(200).json({
            status:"success",
            session
        })}
    catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}
 
module.exports = {createSession}