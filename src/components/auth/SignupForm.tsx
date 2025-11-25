import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldGroup, FieldDescription } from '@/components/ui/field'
import { useSignup } from '@/hooks/queries/useAuthQueries'
import type { SignupRequest } from '@/types/auth.types'

export function SignupForm() {
  const [formData, setFormData] = useState<SignupRequest>({
    email: '',
    name: '',
    password: '',
  })

  const signupMutation = useSignup()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signupMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signup-name">Name</FieldLabel>
          <Input
            id="signup-name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <Input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FieldDescription>
            Password must be at least 8 characters
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? 'Creating account...' : 'Sign Up'}
        </Button>
      </FieldGroup>
    </form>
  )
}

