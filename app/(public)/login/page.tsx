import { LoginForm } from "@/components/login/login-form";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card className="w-full max-w-xl p-8">
        <LoginForm />
      </Card>
    </div>
  )
}
