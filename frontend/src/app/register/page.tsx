import AuthForm from "@components/AuthFrom";
import { House } from "@components/icons/House";

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <House role="img" aria-label="RoboBroni" className="mx-auto h-10 w-auto fill-indigo-600"/>
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Регистрация</h1>
      </div>
      <AuthForm type="register" />
    </div>
  );
}
