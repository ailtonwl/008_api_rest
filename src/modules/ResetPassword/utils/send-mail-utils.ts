import nodemailer from 'nodemailer';

export class UtilsSendMail {
  public static async send(email: string, secret: number) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SEND_MAIL,
      to: email,
      subject: '[Segurança] Resete sua senha',
      text: `Código de segurança: ${secret}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
