import AuthForm from "@components/AuthFrom";

export default function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Вход</h1>
      <AuthForm type="login" />
    </div>
  );
}
