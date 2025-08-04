'use client';

import Form from "../components/Form";
// import { useAuthCheck } from "../app/hooks/useAuthCheck"

export default function Home() {
  // const { loading } = useAuthCheck({
  //   requireAuth: false,
  //   redirectTo: '/home',
  // });

  // if (loading) return null; // チェック中は何も表示しない（もしくはローディングUIに）

  return (
    <div className="h-svh w-screen bg-green-300 flex items-center justify-center">
      <Form name="サインイン" />
    </div>
  );
}
