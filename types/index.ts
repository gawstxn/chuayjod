import { LucideIcon } from "lucide-react";

export interface Route {
  label: string
  path: string
  icon: LucideIcon
}

export interface TransactionItem {
  [key: string]: string | number | null; 
}

export interface PaginatedData {
  items: TransactionItem[];
  page: number;
  pageSize: number;
  total?: number;
}