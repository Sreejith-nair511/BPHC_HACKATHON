"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { indiaHealthStats } from "@/data/india-health-data"

export function HypertensionChart() {
  const data = indiaHealthStats.hypertensionPrevalence.data

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle>{indiaHealthStats.hypertensionPrevalence.title}</CardTitle>
        <CardDescription>Percentage of population with hypertension by age and gender</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="age" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Prevalence"]}
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="male"
                name="Male"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="female"
                name="Female"
                fill="hsl(var(--chart-4))"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

