"use client"

import { Eye, EyeOff } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PasswordProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputPassword = ({value, onChange}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="password-toggle">Password</Label>
      <div className="relative">
        <Input
          className="bg-background"
          id="password-toggle"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          minLength={8}
        />
        <Button
          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default InputPassword
