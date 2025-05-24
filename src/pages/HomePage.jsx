import { NoteGrid } from '../components/index.js'
import { useSelector} from 'react-redux';
import { useSearch } from '../context/searchContext.jsx'



const HomePage = () => {
 
  const notes = useSelector(state => state.notes.notes)
  const {searchResults} = useSearch();
  return (  
    <>
        <NoteGrid  notes={notes[0]} searchResults={searchResults}/>
    </>
  )
}

export default HomePage