"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function AuthForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Sign up form state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupYear, setSignupYear] = useState("")
  const [signupBranch, setSignupBranch] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (signInError) {
        throw signInError
      }

      const accessToken = data.session?.access_token
      const userId = data.user?.id

      if (!accessToken || !userId) {
        throw new Error("Login succeeded but session data is missing.")
      }

      localStorage.setItem("sb-token", accessToken)

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id, name, email, role, year, branch")
        .eq("id", userId)
        .single()

      if (profileError) {
        throw profileError
      }

      localStorage.setItem("sb-profile", JSON.stringify(profile))

      if (profile.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/feed")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!signupName || !signupEmail || !signupPassword || !signupYear || !signupBranch) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      })

      if (signUpError) {
        throw signUpError
      }

      const userId = data.user?.id
      if (!userId) {
        throw new Error("Sign up succeeded but no user was returned.")
      }

      if (data.session?.access_token) {
        localStorage.setItem("sb-token", data.session.access_token)
      }

      const { data: insertedProfile, error: insertError } = await supabase
        .from("users")
        .insert({
          id: userId,
          name: signupName,
          email: signupEmail,
          role: "student",
          year: signupYear,
          branch: signupBranch,
        })
        .select("id, name, email, role, year, branch")
        .single()

      if (insertError) {
        throw insertError
      }

      localStorage.setItem("sb-profile", JSON.stringify(insertedProfile))
      router.push("/feed")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const switchToSignup = () => {
    setActiveTab("signup")
    setError(null)
  }

  const switchToLogin = () => {
    setActiveTab("login")
    setError(null)
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <span className="text-xl font-bold text-primary-foreground">CC</span>
        </div>
        <CardTitle className="text-2xl font-bold">CampusConnect</CardTitle>
        <CardDescription>Your gateway to campus events</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@college.edu"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Field>

                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </FieldGroup>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={switchToSignup}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@college.edu"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Year</FieldLabel>
                  <Select value={signupYear} onValueChange={setSignupYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-branch">Branch</FieldLabel>
                  <Input
                    id="signup-branch"
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={signupBranch}
                    onChange={(e) => setSignupBranch(e.target.value)}
                  />
                </Field>

                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </FieldGroup>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-primary font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </TabsContent>
        </Tabs>

        {/* Error message area */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
