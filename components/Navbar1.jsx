import React from 'react'
import { CheckSquareIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar1 = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleHome = () => {
    navigate('/')
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <CheckSquareIcon 
              onClick={handleHome}
              className="h-8 w-8 text-indigo-600 dark:text-indigo-400 cursor-pointer" 
            />
            <span 
              onClick={handleHome}
              className=" ml-2 text-xl font-bold text-gray-900 dark:text-white cursor-pointer"
            >
              Taskify
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/todo')}
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10 ">My Task</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="relative cursor-pointer text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group transition-all duration-300 ease-in-out
                hover:text-white hover:shadow-lg hover:shadow-red-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110" />
              <span className="relative z-10">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar1