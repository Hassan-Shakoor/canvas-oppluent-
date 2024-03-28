import QRCode from 'qrcode';

export const getQRCode = async (req, res) => {
  try {
    const url = req.query.url;
    const qrCodeDataURL = await QRCode.toDataURL(url,{
      color: {
        dark: '#000000ff', // Transparent color
        light: '#00000000' // Color of the QR code
      }
    }); // Await the result
    res.json({ qrCodeDataURL }); // Send it as JSON
    // res.send(`
    //   <html>
    //     <body>
    //       <img src="${qrCodeDataURL}" alt="QR Code">
    //     </body>
    //   </html>
    // `);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating QR code' });
  }
};