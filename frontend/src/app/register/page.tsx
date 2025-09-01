import AuthForm from "@components/AuthFrom";

export default function RegisterPage() {
  return (
    <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
      <h1>Регистрация</h1>
      <AuthForm type="register" />
    </div>
  );
}
