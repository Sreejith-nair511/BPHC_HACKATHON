"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { indiaHealthStats } from "@/data/india-health-data"

export function DiabetesPrevalenceChart() {
  const data = indiaHealthStats.diabetesPrevalence.data

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle>{indiaHealthStats.diabetesPrevalence.title}</CardTitle>
        <CardDescription>Percentage of population with diabetes by state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" domain={[0, "dataMax + 2"]} tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Prevalence"]}
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

