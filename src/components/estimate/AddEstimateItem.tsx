"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CostItem, EstimateItem } from "@/lib/types"
import { costItems } from "@/data/costItems"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  costItemId: z.string().min(1, { message: "항목을 선택해주세요." }),
  quantity: z.coerce.number().min(1, { message: "수량은 1 이상이어야 합니다." }),
})

type AddEstimateItemProps = {
  onAddItem: (item: EstimateItem) => void
  markupRate: number
}

export function AddEstimateItem({ onAddItem, markupRate }: AddEstimateItemProps) {
  const [selectedItem, setSelectedItem] = useState<CostItem | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      costItemId: "",
      quantity: 1,
    },
  })

  // 견적 항목 ID로 원가 항목 찾기
  const findCostItemById = (id: string): CostItem | undefined => {
    return costItems.find(item => item.id === id)
  }

  // 원가에 마크업 적용하여 판매가 계산
  const calculateUnitPrice = (unitCost: number): number => {
    return unitCost * (1 + markupRate / 100)
  }

  // 항목 선택 시 처리
  const handleItemChange = (itemId: string) => {
    const costItem = findCostItemById(itemId)
    if (costItem) {
      setSelectedItem(costItem)
    }
  }

  // 폼 제출 처리
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedItem) return

    const unitPrice = calculateUnitPrice(selectedItem.unitCost)
    const totalCost = selectedItem.unitCost * values.quantity
    const totalPrice = unitPrice * values.quantity

    const newItem: EstimateItem = {
      id: crypto.randomUUID(),
      costItemId: selectedItem.id,
      name: selectedItem.name,
      quantity: values.quantity,
      unitCost: selectedItem.unitCost,
      unitPrice: unitPrice,
      totalCost: totalCost,
      totalPrice: totalPrice,
      unit: selectedItem.unit,
    }
    
    onAddItem(newItem)
    form.reset()
    setSelectedItem(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>견적 항목 추가</CardTitle>
        <CardDescription>항목을 선택하고 수량을 입력하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="costItemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>항목 선택</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleItemChange(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="항목을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {costItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.category}) - {item.unitCost.toLocaleString()}원/{item.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>수량</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="수량" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedItem && (
              <div className="pt-2 space-y-2 text-sm">
                <p>선택 항목: {selectedItem.name}</p>
                <p>단위: {selectedItem.unit}</p>
                <p>원가: {selectedItem.unitCost.toLocaleString()}원</p>
                <p>판매가: {calculateUnitPrice(selectedItem.unitCost).toLocaleString()}원 (마크업 {markupRate}% 적용)</p>
              </div>
            )}
            <Button type="submit" className="w-full">항목 추가</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 