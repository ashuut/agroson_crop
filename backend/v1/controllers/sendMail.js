const nodemailer = require("nodemailer");
const axios = require("axios");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "livedecor.ad@gmail.com",
    pass: "tomkjrnndshfvnmp",
  },
});

async function sendwelcomeMailUser(inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: inputs.to,
    subject: "Welcome to Livedecor",
    html: `Thank you for choosing one of the best designers from our talented team of designers. Our Designer
    will contact you shortly to take you on a tour of our design process.`,
  });
}
async function sendwelcomeMailDesigner(inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: inputs.to,
    subject: "Welcome to Livedecor",
    html: "Welcome to Livedecor Family. We are glad to see you onboarded and becoming one of the best designers on our team. Stay tuned for upcoming surprises.",
  });
}
async function sendforgotMail(inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: inputs.to,
    subject: "forgotPassword",
    html: `Forgotpassword link ${inputs.link}`,
  });
}
async function contactusEmail(to, inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: to.to,
    subject: "Contact Us",
    html: `
             <html>
             <body>
             <h1> Name :>${inputs.name}  </h1>
             <h1> Email :>${inputs.email}  </h1>
             <h1> phone :>${inputs.phone}  </h1>
             <h1> subject :>${inputs.subject}  </h1>
             <h1> Message :>${inputs.message}  </h1>
             </html>`,
  });
}
async function publish(to, inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: to.to,
    subject: "Contact Us",
    html: `
             <html>
             <div
    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#ffffff;color:#718096;height:100%;line-height:1.4;margin:0;padding:0;width:100%!important">

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;margin:0;padding:0;width:100%">
        <tbody>
            <tr>
                <td align="center"
                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0;padding:0;width:100%">
                        <tbody>
                            <tr>
                                <td
                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';padding:25px 0;text-align:center">
                                    <a href="https://burnishleatherart.com/"
                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:19px;font-weight:bold;text-decoration:none;display:inline-block"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://burnishleatherart.com/&amp;source=gmail&amp;ust=1673339501935000&amp;usg=AOvVaw1B-pcZzS0z5_7ScdIQq7w2">
                                        ${inputs.title}
                                    </a>
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" cellpadding="0" cellspacing="0"
                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;border-bottom:1px solid #edf2f7;border-top:1px solid #edf2f7;margin:0;padding:0;width:100%">
                                    <table class="m_6442014345907669481inner-body" align="center" width="570"
                                        cellpadding="0" cellspacing="0" role="presentation"
                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#ffffff;border-color:#e8e5ef;border-radius:2px;border-width:1px;margin:0 auto;padding:0;width:570px">

                                        <tbody>
                                            <tr>
                                                <td
                                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
                                                    <h1
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left">
                                                        ${inputs.subject}</h1>
                                                    <p
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                                                        ${inputs.message}</p>
                                                    <table align="center" width="100%" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:30px auto;padding:0;text-align:center;width:100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center"
                                                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                    <table width="100%" border="0" cellpadding="0"
                                                                        cellspacing="0" role="presentation"
                                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                    <table border="0" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        role="presentation"
                                                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                        <tbody>
                                                                                            
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                                                        Regards,<br>
                                                        ${inputs.name}</p>


                                                    <table width="100%" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-top:1px solid #e8e5ef;margin-top:25px;padding-top:25px">
                                                      
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                    <table class="m_6442014345907669481footer" align="center" width="570"
                                        cellpadding="0" cellspacing="0" role="presentation"
                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0 auto;padding:0;text-align:center;width:570px">
                                        <tbody>
                                            <tr>
                                                <td align="center"
                                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
                                                    <p
                                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:1.5em;margin-top:0;color:#b0adc5;font-size:12px;text-align:center">
                                                        © 2023 LiveDecor. All rights reserved.</p>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="yj6qo"></div>
    <div class="adL">
    </div>
</div>
             </html>`,
  });
}
async function sendgiftCardMail(inputs) {
  let info = await transporter.sendMail({
    from: "livedecor.ad@gmail.com", // sender address
    to: inputs.to,
    subject: "Gift Cards",
    html: `This ${inputs.name} has sent a Gift PLease Login to Use it `,
  });
}
async function sendOtp(phone, name, otp) {
  let message = `Dear ${name} Your OTP for LIVEDECOR website login ${otp} Valid for 10 minutes. Please do not share this OTP. Regards, LIVEDECOR Team`;
  const response = await axios.get(
    `http://vas.themultimedia.in/domestic/sendsms/bulksms_v2.php?apikey=TFZERUNPUjo3SU5TZ2NsdQ==&type=TEXT&sender=LVDECR&entityId=1401591790000055844&templateId=1707167568453602636&mobile=${phone}&message=${message}`
  );
  return;
}
module.exports = {
  sendwelcomeMailUser,
  sendwelcomeMailDesigner,
  sendforgotMail,
  contactusEmail,
  publish,
  sendgiftCardMail,
  sendOtp,
};
