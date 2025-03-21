// 데이터베이스 아이템 타입 정의
export interface CostItem {
  id: string;
  name: string;
  category: string;
  unitCost: number;
  unit: string;
}

// 견적서 아이템 타입 정의
export interface EstimateItem {
  id: string;
  costItemId: string;
  name: string;
  quantity: number;
  unitCost: number; // 원가
  unitPrice: number; // 판매가
  totalCost: number; // 총 원가
  totalPrice: number; // 총 판매가
  unit: string;
}

// 견적서 요약 정보 타입 정의
export interface EstimateSummary {
  totalCost: number; // 총 원가
  totalProfit: number; // 총 이익
  totalPrice: number; // 총 판매가
  profitRate: number; // 이익률 (%)
  markupRate: number; // 마크업 비율 (%)
} 