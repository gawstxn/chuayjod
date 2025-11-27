import { getSheetsClient } from "@/lib/google-sheets"
import { PaginatedData, TransactionItem } from "@/types"
import { nanoid } from "nanoid"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit') ?? 20)
    const page = Number(searchParams.get('page') ?? 1)
    const sheetName = 'Transaction'
    const dataStartRow = (page - 1) * limit + 2
    const dataEndRow = dataStartRow + limit - 1

    const sheets = await getSheetsClient()
    const headerRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A1:K1`,
    })

    // ดึงชื่อคอลัมน์ออกมาจากผลลัพธ์ (คาดว่าอยู่ที่ index 0)
    const COLUMN_HEADERS: string[] = headerRes.data.values?.[0] || []
    if (COLUMN_HEADERS.length === 0) throw new Error('ไม่พบข้อมูลส่วนหัว (Header Row) ในชีต')

    const dataRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A${dataStartRow}:K${dataEndRow}`,
    })
    // ดึงจำนวนแถวทั้งหมด (เพื่อหาค่า total)
    // const totalRes = await sheets.spreadsheets.values.get({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   range: `${sheetName}!A:A`, 
    // })
    // จำนวนแถวทั้งหมด = จำนวนแถวที่ดึงมา - 1 (ลบแถว Header ออก)
    // const totalRows = totalRes.data.values ? totalRes.data.values.length - 1 : 0

    // Map ข้อมูลเข้ากับ Header Keys
    const rawValues = dataRes.data.values || []
    const items: TransactionItem[] = rawValues.map((row: string[]) => {
      const item: Partial<TransactionItem> = {}
      COLUMN_HEADERS.forEach((header, index) => {
        // ใช้ค่าจากแถวที่ 1 เป็นชื่อ key
        item[header] = row[index] ?? null // ใช้ null ถ้าไม่มีค่า
      });
      return item as TransactionItem
    })

    const paginatedResponse: PaginatedData = {
      items: items,
      page: page,
      pageSize: limit,
      // total: totalRows, // จำนวนข้อมูลทั้งหมด (ไม่รวม header)
    }
    return Response.json(paginatedResponse)
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