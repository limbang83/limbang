"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// 견적 항목 타입 정의
type EstimateItem = {
  id: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

// 폼 스키마 정의
const formSchema = z.object({
  name: z.string().min(1, { message: "품목명을 입력해주세요." }),
  quantity: z.coerce.number().min(1, { message: "수량은 1 이상이어야 합니다." }),
  unitPrice: z.coerce.number().min(0, { message: "단가는 0 이상이어야 합니다." }),
})

export default function Home() {
  const [items, setItems] = useState<EstimateItem[]>([])
  const [totalEstimate, setTotalEstimate] = useState(0)

  // form 설정
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      unitPrice: 0,
    },
  })

  // 항목 추가 함수
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newItem: EstimateItem = {
      id: crypto.randomUUID(),
      name: values.name,
      quantity: values.quantity,
      unitPrice: values.unitPrice,
      totalPrice: values.quantity * values.unitPrice,
    }
    
    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    
    // 총액 업데이트
    const newTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
    setTotalEstimate(newTotal)
    
    // 폼 초기화
    form.reset()
  }

  // 항목 삭제 함수
  function removeItem(id: string) {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    
    // 총액 업데이트
    const newTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
    setTotalEstimate(newTotal)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">견적 프로그램</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>견적 항목 추가</CardTitle>
            <CardDescription>새로운 견적 항목을 추가하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>품목명</FormLabel>
                      <FormControl>
                        <Input placeholder="품목명을 입력하세요" {...field} />
                      </FormControl>
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
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>단가</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="단가" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">항목 추가</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>견적 요약</CardTitle>
            <CardDescription>총 견적 금액: {totalEstimate.toLocaleString()}원</CardDescription>
          </CardHeader>
          <CardContent>
            {items.length > 0 ? (
              <Table>
                <TableCaption>총 견적 금액: {totalEstimate.toLocaleString()}원</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>품목명</TableHead>
                    <TableHead className="text-right">수량</TableHead>
                    <TableHead className="text-right">단가</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                    <TableHead className="text-center">삭제</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.totalPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>삭제</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground">추가된 항목이 없습니다.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => {
              setItems([])
              setTotalEstimate(0)
            }}>
              모두 삭제
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
