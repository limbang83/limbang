"use client"

import { useState, useEffect } from "react"
import { EstimateItem, EstimateSummary } from "@/lib/types"
import { AddEstimateItem } from "@/components/estimate/AddEstimateItem"
import { EstimateTable } from "@/components/estimate/EstimateTable"
import { MarkupSettings } from "@/components/estimate/MarkupSettings"

export default function Home() {
  // 견적 항목 상태
  const [items, setItems] = useState<EstimateItem[]>([])
  
  // 마크업 비율 상태 (기본값 30%)
  const [markupRate, setMarkupRate] = useState(30)
  
  // 견적 요약 정보 상태
  const [summary, setSummary] = useState<EstimateSummary>({
    totalCost: 0,
    totalProfit: 0,
    totalPrice: 0,
    profitRate: 0,
    markupRate: markupRate
  })

  // 마크업 비율이 변경되면 모든 항목의 가격 재계산
  useEffect(() => {
    if (items.length === 0) return
    
    const updatedItems = items.map(item => {
      const newUnitPrice = item.unitCost * (1 + markupRate / 100)
      const newTotalPrice = newUnitPrice * item.quantity
      
      return {
        ...item,
        unitPrice: newUnitPrice,
        totalPrice: newTotalPrice
      }
    })
    
    setItems(updatedItems)
  }, [markupRate])

  // 항목이 변경될 때마다 견적 요약 정보 업데이트
  useEffect(() => {
    const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const totalProfit = totalPrice - totalCost
    const profitRate = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0
    
    setSummary({
      totalCost,
      totalProfit,
      totalPrice,
      profitRate,
      markupRate
    })
  }, [items, markupRate])

  // 항목 추가 함수
  const handleAddItem = (newItem: EstimateItem) => {
    setItems(prev => [...prev, newItem])
  }

  // 항목 삭제 함수
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // 모든 항목 삭제 함수
  const handleClearItems = () => {
    setItems([])
  }

  // 마크업 비율 변경 함수
  const handleMarkupChange = (rate: number) => {
    setMarkupRate(rate)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">견적 프로그램</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AddEstimateItem 
            onAddItem={handleAddItem} 
            markupRate={markupRate} 
          />
          <MarkupSettings 
            markupRate={markupRate}
            onMarkupChange={handleMarkupChange}
          />
        </div>
        
        <div className="lg:col-span-2">
          <EstimateTable 
            items={items}
            summary={summary}
            onRemoveItem={handleRemoveItem}
            onClearItems={handleClearItems}
          />
        </div>
      </div>
    </div>
  )
}
