const nodeoutlook = require('nodejs-nodemailer-outlook')
let pass = require("../pass");

async function mailSender1(email, otp) {
  try {
    await nodeoutlook.sendEmail({
      auth: {
        user: "bharath999999@hotmail.com",
        pass: pass
      },
      from: '"<bharath999999@hotmail.com>', // sender address
      to: email, // list of receivers
      subject: "FoodApp 👻 says Hello ✔ Your Reset Password Request", // Subject line
      html: `<b>Your reset Otp is ${otp}, Your otp will expire in 5 minutes</b>`, // html body
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log("Otp sent")
    })
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = mailSender1;