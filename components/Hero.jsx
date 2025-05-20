import React from 'react'
import { CheckCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300 min-h-screen flex flex-col lg:flex-row">
      {/* Left Content Section */}
      <div className="flex-1 px-4 sm:px-8 xl:pl-20 flex items-center">
        <div className="max-w-2xl py-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Manage your tasks</span>
            <span className="block text-indigo-600 dark:text-indigo-400">with ease</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
            Taskify helps you organize your work and life. Increase productivity, reduce stress, and never miss a deadline again.
          </p>
          <div className="mt-6 sm:mt-8">
            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <button
                onClick={handleRegisterRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50"
              >
                Register Now
              </button>
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-full text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
              >
                Login
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-300">Free to get started</p>
            </div>
            <div className="flex items-center mt-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-300">No credit card required</p>
            </div>
            <div className="flex items-center mt-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-300">Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 relative h-64 lg:h-auto">
        <img
          src="https://static.vecteezy.com/system/resources/previews/013/259/687/non_2x/task-management-abstract-concept-project-manager-tool-business-software-productivity-online-platform-task-management-application-vector.jpg"
          alt="Task management illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
