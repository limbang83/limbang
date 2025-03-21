"use client"

import { EstimateItem, EstimateSummary } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type EstimateTableProps = {
  items: EstimateItem[]
  summary: EstimateSummary
  onRemoveItem: (id: string) => void
  onClearItems: () => void
}

export function EstimateTable({ items, summary, onRemoveItem, onClearItems }: EstimateTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>견적서</CardTitle>
        <CardDescription>
          총 견적 금액: {summary.totalPrice.toLocaleString()}원 
          (원가: {summary.totalCost.toLocaleString()}원, 이익: {summary.totalProfit.toLocaleString()}원)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>품목명</TableHead>
                <TableHead>단위</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">단가(원)</TableHead>
                <TableHead className="text-right">금액(원)</TableHead>
                <TableHead className="text-center">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.totalPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="destructive" size="sm" onClick={() => onRemoveItem(item.id)}>삭제</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-8">추가된 항목이 없습니다.</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">총 원가:</span>
            <span>{summary.totalCost.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">총 이익:</span>
            <span>{summary.totalProfit.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">이익률:</span>
            <span>{summary.profitRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>총 견적 금액:</span>
            <span>{summary.totalPrice.toLocaleString()}원</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={onClearItems}>
          모두 삭제
        </Button>
      </CardFooter>
    </Card>
  )
} 