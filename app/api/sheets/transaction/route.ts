import { getSheetsClient } from "@/lib/google-sheets"
import { nanoid } from "nanoid"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // For pagination
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit') ?? 20)
    const page = Number(searchParams.get('page') ?? 1)
    const start = (page - 1) * limit + 2; 
    const end = start + limit - 1;

    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Transaction!A${start}:K${end}`, // <-- เริ่มต้นที่แถวที่ 2 (A2) และไปจนถึงคอลัมน์ K
    })
    return Response.json({ data: res.data.values })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, category, formAccount, toAccount, amount, note } = await req.json()
    const sheets = await getSheetsClient()
    const id = nanoid(12)
    const now = new Date()

    const timestamp = now.toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })

    const data = [id, timestamp, type, category, formAccount, toAccount, amount, note, timestamp]

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Transaction!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data]
      }
    })

    return Response.json({ 
      message: 'Data added successfully', 
      data, updatedRange: res.data.updates?.updatedRange
    })
  } catch (error) {
    console.error("Error appending data:", error)
    return Response.json({ error: 'Failed to add data' }, { status: 500 })
  }
}