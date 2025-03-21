"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type MarkupSettingsProps = {
  markupRate: number
  onMarkupChange: (rate: number) => void
}

export function MarkupSettings({ markupRate, onMarkupChange }: MarkupSettingsProps) {
  const [inputValue, setInputValue] = useState(markupRate.toString())
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  const handleApply = () => {
    const rate = parseFloat(inputValue)
    if (!isNaN(rate) && rate >= 0) {
      onMarkupChange(rate)
    } else {
      // 유효하지 않은 값이면 기존 값으로 다시 설정
      setInputValue(markupRate.toString())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>마크업 설정</CardTitle>
        <CardDescription>원가 대비 판매가의 마크업 비율을 설정하세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="markup-rate">마크업 비율 (%)</Label>
          <div className="flex gap-2">
            <Input 
              id="markup-rate"
              type="number" 
              min="0" 
              step="1" 
              value={inputValue}
              onChange={handleChange}
            />
            <Button onClick={handleApply}>적용</Button>
          </div>
        </div>
        <div className="text-sm">
          <p>현재 적용된 마크업: {markupRate}%</p>
          <p className="text-muted-foreground">마크업 {markupRate}%는 원가의 {markupRate}%만큼 추가된 가격입니다.</p>
          <p className="text-muted-foreground">예: 원가 100,000원 × (1 + {markupRate/100}) = {(100000 * (1 + markupRate/100)).toLocaleString()}원</p>
        </div>
      </CardContent>
    </Card>
  )
} 