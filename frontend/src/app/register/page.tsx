import AuthForm from "@components/AuthFrom";

export default function RegisterPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Регистрация</h1>
      <AuthForm type="register" />
    </div>
  );
}
