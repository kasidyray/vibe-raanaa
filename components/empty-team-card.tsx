import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"

const members = [
  { src: "https://github.com/shadcn.png", alt: "@shadcn", fallback: "SC" },
  { src: "https://github.com/maxleiter.png", alt: "@maxleiter", fallback: "ML" },
  { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit", fallback: "ER" },
]

export default function EmptyTeamCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-lg border text-center text-balance">
          <div className="flex max-w-sm flex-col items-center gap-3">
            <AvatarGroup className="grayscale">
              {members.map(({ src, alt, fallback }) => (
                <Avatar key={alt} size="lg">
                  <AvatarImage src={src} alt={alt} />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">No Team Members</p>
              <p className="text-sm text-muted-foreground">
                Invite your team to collaborate on this project.
              </p>
            </div>
          </div>
          <Button size="sm">Invite Members</Button>
        </div>
      </CardContent>
    </Card>
  )
}
