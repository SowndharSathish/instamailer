const express = require('express');
const router = express.Router();

// Temporary in-memory store
const activeEmails = new Map();

// Helper: Generate random masked email
function generateMaskedEmail(domain) {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const mailDomain = domain || 'example.com';
  return `masked_${randomPart}@${mailDomain}`;
}

// POST /generate
router.post('/generate', (req, res) => {
  try {
    const { email, domain } = req.body;

    if (!email) {
      return res.status(400).json({
        provided_by: 'instamailer-api',
        success: false,
        status: 400,
        message: 'Email field is required.',
        data: null
      });
    }

    const finalDomain = domain || email.split('@')[1] || 'example.com';
    const maskedEmail = generateMaskedEmail(finalDomain);

    activeEmails.set(maskedEmail, { original: email, createdAt: Date.now() });

    res.status(201).json({
      provided_by: 'instamailer-api',
      success: true,
      status: 201,
      message: 'Masked email created successfully.',
      data: {
        original_email: email,
        masked_email: maskedEmail
      }
    });

    setTimeout(() => {
      activeEmails.delete(maskedEmail);
      console.log(`🧹 Masked email expired: ${maskedEmail}`);
    }, 5 * 60 * 1000);
  } catch (error) {
    console.error('Error generating masked email:', error);
    res.status(500).json({
      provided_by: 'instamailer-api',
      success: false,
      status: 500,
      message: 'Internal server error while generating masked email.',
      data: null
    });
  }
});

// GET /active
router.get('/active', (req, res) => {
  try {
    if (!activeEmails || !(activeEmails instanceof Map)) {
      throw new Error('Active emails store is not available.');
    }

    const list = Array.from(activeEmails.entries())
      .filter(([masked, info]) => masked && info && info.original && info.createdAt)
      .map(([masked, info]) => ({
        masked_email: masked,
        original_email: info.original,
        createdAt: new Date(info.createdAt).toISOString()
      }));

    res.json({
      provided_by: 'instamailer-api',
      success: true,
      status: 200,
      message: 'Active masked emails list.',
      data: list
    });
  } catch (error) {
    console.error('Error fetching active masked emails:', error);
    res.status(500).json({
      provided_by: 'instamailer-api',
      success: false,
      status: 500,
      message: 'Internal server error while fetching active masked emails.',
      data: null
    });
  }
});

module.exports = router;
