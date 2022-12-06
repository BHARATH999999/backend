// This is your test secret API key.
const sk = require("./secrets")
const stripe = require('stripe')(sk);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1MBxvqSI1okai3JGoCVlDgiK',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.get('/',function(req,res){
    res.sendFile("D:\\CODE\\backend\\raw\\public\\checkout.html")
})

app.listen(4242, () => console.log('Running on port 4242'));
