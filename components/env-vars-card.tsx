import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const envVars = [
  { key: "DATABASE_URL", value: "••••••••" },
  { key: "NEXT_PUBLIC_API", value: "https://api.example.com" },
  { key: "STRIPE_SECRET", value: "••••••••" },
]

export default function EnvVarsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {envVars.map(({ key, value }) => (
          <div
            key={key}
            className="flex items-center gap-2 rounded-md px-2.5 py-2 font-mono text-xs ring ring-border"
          >
            <span className="font-medium">{key}</span>
            <span className="ml-auto text-muted-foreground">{value}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit</Button>
        <Button className="ml-auto">Deploy</Button>
      </CardFooter>
    </Card>
  )
}
