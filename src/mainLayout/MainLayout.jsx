import React, {useState} from 'react'
import { Sidebar} from "../components/index.js";
import { Loader } from "../components/index.js";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = ({isLoading}) => {
 
  const [activeCategory, setActiveCategory] = useState();

  

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      { isLoading ? <Loader /> : <Outlet/>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default MainLayout