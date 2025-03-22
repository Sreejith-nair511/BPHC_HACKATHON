"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { indiaHealthStats } from "@/data/india-health-data"

export function HealthcareAccessChart() {
  const data = indiaHealthStats.healthcareAccess.data

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle>{indiaHealthStats.healthcareAccess.title}</CardTitle>
        <CardDescription>Percentage of population with access to healthcare facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} stackOffset="expand" barSize={60}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="region" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, ""]}
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="hasAccess"
                name="Has Access"
                stackId="a"
                fill="hsl(var(--chart-2))"
                animationDuration={1500}
              />
              <Bar
                dataKey="noAccess"
                name="No Access"
                stackId="a"
                fill="hsl(var(--chart-5))"
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

