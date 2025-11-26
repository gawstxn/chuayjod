import { Auth, google } from 'googleapis';

const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

if (!CLIENT_EMAIL || !PRIVATE_KEY) throw new Error('Missing Google Sheets API environment variables.')

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export async function getSheetsClient() {
    const client = await auth.getClient()
    
    const sheets = google.sheets({ 
        version: 'v4', 
        auth: client as Auth.JWT 
    })
    return sheets
}