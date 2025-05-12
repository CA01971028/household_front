import Link from 'next/link';
import LoginButtun from './LoginButtun';
import SignUp from './SignUp';

type FormProps = {
    name: string;
  };

const Form = ({name}:FormProps) => {
    return (
        <>
            <div className="w-[80%] md:w-[60%] lg:w-[80%] flex justify-center rounded-lg bg-white">
                <div className="flex flex-col w-full p-6 items-start">
                    <div className="pt-4 self-center text-3xl md:text-4xl">{name}</div>

                    <label className="text-lg pt-6">ユーザー名</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="ユーザ名を入力"
                    className="border border-gray-300 rounded-md p-2 my-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="text-lg pt-6">パスワード</label>
                    <input
                    type="text"
                    name="pw"
                    placeholder="パスワードを入力"
                    className="border border-gray-300 rounded-md p-2 my-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {name === "サインアップ" ? 
                        (
                            <LoginButtun/>
                        ):(
                            <SignUp/>
                        )
                    }
                    {name === "サインイン" ?
                    (
                        <div className="text-2xl self-end underline decoration-gray-600"><Link href="/signup">新規登録</Link></div>
                    ):
                    (
                        <div className="text-2xl self-end underline decoration-gray-600"><Link href="/">戻る</Link></div>
                    )
                    }
                </div>
            </div>

        </>
    );
}

export default Form;