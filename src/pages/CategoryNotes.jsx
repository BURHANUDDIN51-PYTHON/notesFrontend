import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NoteGrid } from '../components/index.js';
import { useSearch } from '../context/searchContext.jsx'


const CategoryNotes = () => {
    const { categoryId } = useParams();
    const notes = useSelector((state) => state.notes.notes);
    const {searchResults} = useSearch();
    const filteredNotes = notes[0]?.filter(note => note.category == categoryId);
    const searchCatResult = searchResults?.filter(note => note.category == categoryId);
    
  return filteredNotes && ( 
    <NoteGrid notes={categoryId == 0 ? notes[0]: filteredNotes} searchResults={searchCatResult}/>
  ) 
}

export default CategoryNotes