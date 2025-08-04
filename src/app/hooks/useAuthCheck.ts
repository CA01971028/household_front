'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '@/path/PathObject'; // あなたの環境に合わせて調整

export const useAuthCheck = ({
  requireAuth = false, // trueならログインしてなければリダイレクト
  redirectTo = '/home', // ログイン済みならリダイレクトする先
  fallbackTo = '/signin', // 未ログインなら遷移させる先
} = {}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(ENDPOINTS.auth, {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setAuthenticated(true);
          if (!requireAuth) {
            router.replace(redirectTo); // 例: サインインページからホームへ
          }
        } else {
          setAuthenticated(false);
          if (requireAuth) {
            router.replace(fallbackTo); // 例: ホームページからサインインへ
          }
        }
      } catch (err) {
        console.error('認証チェック失敗:', err);
        setAuthenticated(false);
        if (requireAuth) {
          router.replace(fallbackTo);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, authenticated };
};