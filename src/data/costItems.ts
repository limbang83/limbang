import { CostItem } from "@/lib/types";

// 원가 데이터베이스 (실제 프로젝트에서는 API 또는 데이터베이스로 대체)
export const costItems: CostItem[] = [
  {
    id: "item1",
    name: "LED 조명",
    category: "조명",
    unitCost: 35000,
    unit: "개"
  },
  {
    id: "item2",
    name: "네트워크 케이블",
    category: "네트워크",
    unitCost: 1500,
    unit: "m"
  },
  {
    id: "item3",
    name: "전기 배선",
    category: "전기",
    unitCost: 2000,
    unit: "m"
  },
  {
    id: "item4",
    name: "CCTV 카메라",
    category: "보안",
    unitCost: 120000,
    unit: "대"
  },
  {
    id: "item5",
    name: "모니터",
    category: "디스플레이",
    unitCost: 250000,
    unit: "대"
  },
  {
    id: "item6",
    name: "스위치 허브",
    category: "네트워크",
    unitCost: 85000,
    unit: "대"
  },
  {
    id: "item7",
    name: "벽면 콘센트",
    category: "전기",
    unitCost: 12000,
    unit: "개"
  },
  {
    id: "item8",
    name: "네트워크 공사",
    category: "서비스",
    unitCost: 150000,
    unit: "일"
  },
  {
    id: "item9",
    name: "전기 공사",
    category: "서비스",
    unitCost: 180000,
    unit: "일"
  },
  {
    id: "item10",
    name: "보안 소프트웨어",
    category: "소프트웨어",
    unitCost: 350000,
    unit: "라이센스"
  }
]; 