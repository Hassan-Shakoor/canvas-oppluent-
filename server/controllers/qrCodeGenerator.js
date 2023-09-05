import React, { useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios'

export const getQRCode = async (req, res) => {
  try {
    const { url } = req.query;
    const qrCodeDataURL = await QRCode.toDataURL(url); // Await the result
    res.json({ qrCodeDataURL }); // Send it as JSON
    /*res.send(`
      <html>
        <body>
          <img src="${qrCodeDataURL}" alt="QR Code">
        </body>
      </html>
    `);*/
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating QR code' });
  }
};



