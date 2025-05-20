import React, { useState } from 'react'
import { CheckSquareIcon, MenuIcon, XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 flex items-center">
            <CheckSquareIcon className=" h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className=" ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Taskify
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10">Home</span>
            </button>
            <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span
              onClick={handleLogin}
               className="relative z-10">Login</span>
            </button>
            <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span onClick={handleRegisterRedirect}
              className="relative z-10">Register</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-2 px-2">
          <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10">Home</span>
            </button>
            <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10">Login</span>
            </button>
            <button
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10">Register</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar