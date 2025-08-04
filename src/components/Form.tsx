'use client';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ENDPOINTS } from '@/path/PathObject';

type FormProps = {
  name: 'サインイン' | 'サインアップ';
};

const Form = ({ name }: FormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const router = useRouter();

  const handleSubmit = async () => {
    try {
      const endpoint = name === 'サインアップ' ? ENDPOINTS.signup : ENDPOINTS.login;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error(`${name} に失敗しました`);
      }

      const data = await res.json();
      console.log(`${name} 成功:`, data);

      // 成功時に /home へ遷移（戻れないようにする）
      // router.replace('/home');
    } catch (error) {
      setErrorMessage('ユーザー名またはパスワードが正しくありません');
    }
  };

  return (
    <div className="w-[80%] md:w-[60%] lg:w-[80%] flex justify-center rounded-lg bg-white">
      <div className="flex flex-col w-full p-6 items-start">
        <div className="pt-4 self-center text-3xl md:text-4xl">{name}</div>

        <label className="text-lg pt-6">ユーザー名</label>
        <input
          type="text"
          name="username"
          placeholder="ユーザ名を入力"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md p-2 my-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-lg pt-6">パスワード</label>
        <input
          type="password"
          name="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 my-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errorMessage && (
          <p className="text-red-500 my-2">{errorMessage}</p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {name}
        </button>

        {name === 'サインイン' ? (
          <div className="text-2xl self-end underline decoration-gray-600 mt-4">
            <Link href="/signup">新規登録</Link>
          </div>
        ) : (
          <div className="text-2xl self-end underline decoration-gray-600 mt-4">
            <Link href="/">戻る</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
