import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

export const sendRegistrationEmailToUser = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Email: ", email)
        const encodedEmail = Buffer.from(email).toString('base64'); // Use Buffer instead of btoa
        const registrationLink = `${process.env.BASE_URL}register-by-email/${encodedEmail}`;

        // Create a transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Define the email options
        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'Complete Your Registration',
        //     text: `Click the following link to complete your registration: ${registrationLink}`,
        // };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Complete Your Registration',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Complete Your Registration</h2>
                <p style="color: #333;">Dear User,</p>
                <p style="color: #333;">You are invited to register with Claircius Group International. Please click the following link to complete your registration:</p>
                <a href="${registrationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Complete Registration</a>
                <p style="color: #333;">Best regards,<br/>Claircius Group International</p>
              </div>
            `,
          };
          
        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ', info.response);

        // Send success response
        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email: ', error);

        // Send error response
        return res.status(500).json({ success: false, message: 'Error sending email.' });
    }
};
