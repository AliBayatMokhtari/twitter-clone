import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-48 space-y-20">
      <Image
        src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg"
        width={150}
        height={150}
        alt="Twitter"
        className="object-contain"
      />

      <div>
        {Object.keys(providers).map((provider) => (
          <div key={providers[provider].id}>
            <button
              className="loginBtn"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {providers[provider].name}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
