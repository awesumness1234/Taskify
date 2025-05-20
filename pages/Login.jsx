import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/authServices';
import { getErrorMessage } from '../util/GetError';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
  try {
    setLoading(true);
    const data = { username, password };
    const response = await AuthServices.loginUser(data);
    console.log(response.data);
    localStorage.setItem('toDoAppUser', JSON.stringify(response.data));
    alert("Logged in Successfully!");
    navigate('/Todo');
  } catch (err) {
    console.error(err);
    alert(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="dark flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="m-auto w-full max-w-md">
        <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-blue-100 dark:text-gray-400">Login to your account</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-6 sm:p-8">
            <div className="space-y-6">

              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2.5 pl-10 text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2.5 pl-10 pr-10 text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-center text-base font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'LOGIN'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or</span>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="button"
                onClick={handleRegisterRedirect}
                className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-full cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-center text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              >
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
