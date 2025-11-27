'use client'

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
// นำเข้า Table Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionItem } from "@/types"; // ต้องมั่นใจว่ามีการกำหนด type นี้แล้ว
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// --- 1. กำหนด Type สำหรับ Response จาก API ---
interface PaginatedResponse {
  items: TransactionItem[];
  page: number;
  pageSize: number;
  total: number;
}

// --- 2. ค่าเริ่มต้น (Default State) ---
const INITIAL_PAGE_SIZE = 20;

export default function TransactionPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse>({
    items: [],
    page: 1,
    pageSize: INITIAL_PAGE_SIZE,
    total: 0,
  })
  // State สำหรับการควบคุมหน้าปัจจุบัน (แยกจาก paginatedData เพื่อควบคุมการเรียก fetchData)
  const [currentPage, setCurrentPage] = useState(1)


  // --- 3. ฟังก์ชันเรียก API พร้อม Pagination Logic ---
  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true)
    try {
      // ส่งค่า page และ limit (pageSize) ไปที่ API
      const res = await axios.get<PaginatedResponse>('/api/sheets/transaction', {
        params: {
          page: page,
          limit: paginatedData.pageSize,
        },
      })
      
      setPaginatedData(res.data)
      setCurrentPage(page)
      
    } catch (error) {
      console.error('Error fetching transaction data:', error)
      // หากเกิด error ควรเคลียร์ข้อมูล
      setPaginatedData({ items: [], page: 1, pageSize: INITIAL_PAGE_SIZE, total: 0 });
    } finally {
      setIsLoading(false)
    }
  }, [paginatedData.pageSize])


  // --- 4. useEffect: เรียกข้อมูลครั้งแรก ---
  useEffect(() => {
    fetchData(1)
  }, [fetchData]) 


  // --- 5. Logic สำหรับ Pagination ---
  const { items, page, pageSize, total } = paginatedData
  const totalPages = Math.ceil(total / pageSize)
  const canGoNext = page < totalPages
  const canGoPrev = page > 1

  const handleNextPage = () => {
    if (canGoNext) {
      fetchData(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (canGoPrev) {
      fetchData(page - 1)
    }
  }

  // --- 6. Loading State ---
  if (isLoading && items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  // --- 7. Render Component ---
  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Transaction Page</h1>
      <Button 
        onClick={() => fetchData(currentPage)} 
        className="mb-4"
        disabled={isLoading}
      >
        {isLoading ? <Spinner className="size-4 mr-2" /> : 'Refresh Data'}
      </Button>

      {/* --- ตารางแสดงผล --- */}
      <div className="rounded-md border shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">รหัส</TableHead>
              <TableHead className="w-[150px]">วันที่</TableHead>
              <TableHead>ประเภท</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>บัญชี</TableHead>
              <TableHead className="text-right">จำนวน</TableHead>
              <TableHead>รายละเอียด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  ไม่พบข้อมูลการทำธุรกรรมในหน้านี้
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-xs text-muted-foreground">{item.id}</TableCell>
                  <TableCell className="font-medium">
                      {item.date?.split(',')[0] || '-'}
                  </TableCell>
                  <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.type === 'รายรับ' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.type}
                      </span>
                  </TableCell>
                  <TableCell>{item.category || '-'}</TableCell>
                  <TableCell>
                      {item.fromAccount || item.toAccount || '-'}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {Number(item.amount).toLocaleString('th-TH', { 
                        style: 'currency', 
                        currency: 'THB',
                        minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-sm">{item.description || '-'}</TableCell>
                </TableRow>
              ))
            )}
            {isLoading && items.length > 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="h-12 text-center">
                        <Spinner className="size-4 inline-block mr-2" /> กำลังโหลดข้อมูล...
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- Pagination Controls --- */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          แสดงรายการที่ **{(page - 1) * pageSize + 1}** - **{Math.min(page * pageSize, total)}** จากทั้งหมด **{total}** รายการ
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={!canGoPrev || isLoading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> ก่อนหน้า
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!canGoNext || isLoading}
          >
            ถัดไป <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}