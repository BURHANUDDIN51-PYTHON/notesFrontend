import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "./AddCategory";
import { deleteCategory } from "../../features/notesSlice/notesSlice";
import axios from "axios";
import URL from "../../conf/conf";

export default function Sidebar({ activeCategory, setActiveCategory }) {

  const categories = useSelector((state) => state.notes.categories);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  // Add useEffect to handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768); // Collapse on mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteCategory = (categoryId) => {
    try { 
      
      axios.delete(`${URL}/categories/delete/${categoryId}/`)
        .then(() => {
          dispatch(deleteCategory(categoryId))
          console.log('Delete Successfully')})
        .catch(error => console.error('Error deleting note:', error))
      
    } catch (error) {
      console.log(error|| 'Failed to delete category');
    } finally {
      if (activeCategory === categoryId){
          setActiveCategory(0)
          navigate('/')
      } 
    } 
  }

  return (
     <>
      {/* Hamburger menu for mobile */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        transform ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        flex flex-col
        ${isCollapsed ? 'md:w-16' : 'md:w-64'}
      `}>
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 
              onClick={() => {
                navigate("/");
              }}
              className=" font-heading cursor-pointer text-xl font-bold text-blue-600 dark:text-blue-400 ml-10 md:m-0">📝 QuickNotes</h1>
          )}
          <ThemeToggle />
        </div>
        {!isCollapsed && <SearchBar />}
        
        <div className="flex-1 overflow-y-auto px-2">
           <button
              onClick={() => {
                if (activeCategory !== 0){
                  setActiveCategory(0);
                  navigate(`/`);
                }
              }}
              className={`flex items-center w-full px-4 py-2 rounded-lg mt-1.5 ${
                activeCategory === 0
                  ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
          {categories[0]?.map((category) => (
            <div className={`flex items-center flex-row w-full px-4 py-2 rounded-lg mt-1.5 ${
                  activeCategory === category.id 
                    ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                key={category.id}
                >
              <button
                
                onClick={() => {
                  if (activeCategory !== category.id) {
                    setActiveCategory(category.id);
                    navigate(`/category/${category.id}`);
                  }
                }}
                className={`w-80 flex item-center`}
              > 
                {!isCollapsed && category.name}
                
              </button>
              <div onClick={() => {
                handleDeleteCategory(category.id)
                }}
                
                >
                <i className="fas fa-times hover:text-red-600 text-gray-700 dark:text-white"></i>
              </div>
            </div>
          ))}
          <div>
            <button 
            onClick={() => setIsOpen(true)} 
            className={`flex items-center w-full px-4 py-2 rounded-lg mt-1.5 
                hover:bg-blue-700 text-blue-700 outline-1 outline-blue-600
                hover:text-white hover:outline-none ${isOpen ? 'hidden' : ''}
            `}>
            <i className="fas fa-plus mr-2"></i>
            {!isCollapsed && "Add Category"}
            </button>
            <AddCategory
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
          
        
        </div>
        
        <button 
          onClick={() => {
            navigate("/add-note")
          }}
          className="m-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
          <i className="fas fa-plus mr-2"></i>
          {!isCollapsed && "New Note"}
        </button>
      </div>
       {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0  bg-gray-800/60 md:hidden z-30"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
   
  );
}