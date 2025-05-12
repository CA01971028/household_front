'use client';
import { useRouter } from 'next/navigation';

const SignUp = () => {

    const router = useRouter();

    const btnClick = ()=>{
        router.push("/home")
    }

    return (
        <input
            type="button"
            value="ログイン"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-200 self-center"
            onClick={btnClick}
        />
    );
}

export default SignUp;