const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
  const FORM_NAME = "your-form-name"; // <-- Change to your Netlify form name

  const siteId = process.env.SITE_ID;

  const url = `https://api.netlify.com/api/v1/sites/${siteId}/submissions`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${NETLIFY_API_TOKEN}`
      }
    });

    const submissions = await response.json();
    const filtered = submissions.filter(sub => sub.form_name === FORM_NAME);

    return {
      statusCode: 200,
      body: JSON.stringify(filtered)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
