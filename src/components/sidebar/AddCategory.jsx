import React, { useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addCategory } from '../../features/notesSlice/notesSlice';
import URL from '../../conf/conf';

const AddCategory = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const response = await axios.post(`${URL}/categories/add-category/`, {
        name: categoryName.trim()
      });
      dispatch(addCategory(response.data));
      setCategoryName('');
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add category');
    }
  };


  if (!isOpen) return null;

  return (
    <div className="pb-7 mt-2 mb-3">
          <div className="relative">
            <input
              value={categoryName}
              autoFocus
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyDown={(e) => e.key == 'Enter' ? handleSubmit(e) : null}
              type="text"
              placeholder="Category..."
              className={`w-full pl-4 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:outline-none focus:ring-1 focus:ring-blue-400`}
              />
            {/* Going to be conditional */}
              <button
                onClick={() => {
                  setCategoryName('')
                  onClose()}}>
                <i className="fas fa-times absolute right-10 top-3 hover:text-red-400"></i>
              </button>
               <button 
                onClick={handleSubmit}
               >
                <i className="fas fa-check absolute right-3 top-3 hover:text-blue-400"></i>
              </button>
              {error && (
                <p className="text-red-500 text-xs mt-1.5 pl-2">{error}</p>
              )}
          </div>
        </div>
  );
};

export default AddCategory;