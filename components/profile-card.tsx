"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProfileCard() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="profile">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" placeholder="shadcn" />
              <FieldDescription>
                Your name may appear around GitHub where you contribute or are
                mentioned. You can remove it at any time.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Public Email</FieldLabel>
              <Select items={[{ label: "m@shadcn.com", value: "m@shadcn.com" }, { label: "m@gmail.com", value: "m@gmail.com" }]} defaultValue="m@shadcn.com">
                <SelectTrigger id="email">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="m@shadcn.com">m@shadcn.com</SelectItem>
                    <SelectItem value="m@gmail.com">m@gmail.com</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                You can manage verified email addresses in your{" "}
                <a href="#email-settings">email settings</a>.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                placeholder="Tell us a little bit about yourself"
              />
              <FieldDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="profile">
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
