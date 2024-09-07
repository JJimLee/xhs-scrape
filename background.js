document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('authorizeButton').addEventListener('click', handleAuthClick);
});

let gapiInited = false;
let tokenClient;
const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';  // Replace with your actual client ID
const API_KEY = 'YOUR_API_KEY';  // Replace with your actual API Key
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}

/**
 * Authenticate and authorize Google Sheets API access.
 */
function handleAuthClick() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
            // Callback when authorization is successful
            console.log('Authorization successful');
        },
    });

    tokenClient.requestAccessToken({ prompt: 'consent' });
}

// Load the Google API client library.
function loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = gapiLoaded;
    document.body.appendChild(script);
}

loadGapi();
