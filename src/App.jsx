import MainLayout from "./mainLayout/MainLayout.jsx"
import { useEffect } from 'react';
import { SearchProvider } from "./context/searchContext.jsx";
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addNote, addCategory } from './features/notesSlice/notesSlice.js';
import axios from 'axios';
import URL from './conf/conf.js'

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();


  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/notes/`);
      dispatch(addNote(response.data));
    } catch (error) {
      console.error('Error fetching notes:', error);

    }
  }, [dispatch]);

  const fetchCategories = useCallback(async () => {
      setIsLoading(true);
      try {
        const reponse = await axios.get(`${URL}/categories/`);
        dispatch(addCategory(reponse.data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      
      }
  }, [dispatch]);

   useEffect(() => {
    setIsLoading(true);
      fetchCategories();
      fetchNotes();
    setIsLoading(false);
  }, [fetchNotes, fetchCategories, location.key, dispatch]); 



 

  return (
    <SearchProvider>
      <MainLayout isLoading={isLoading}/>
    </SearchProvider>
  );
}

export default App;
