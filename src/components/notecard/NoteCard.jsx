import { useSelector} from 'react-redux';
import FormattedPreview from './FormattedPreview'


export default function NoteCard({ note, onClick }) {
 
  const noteDate = new Date(note.updated);
  const noteDateString = noteDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const noteCategory = useSelector(state => state.notes.categories[0]?.find(
    cat => cat.id == note.category
  ));

  return (
    <div 
      className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start cursor-pointer" onClick={() => onClick(note)}>
          <h3 className="font-bold font-heading text-lg mb-2">{note.title} </h3>
        </div>
         
        <FormattedPreview html={note.body} className={`text-gray-600 dark:text-gray-300 text-sm mb-`}/>
        
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{noteDateString}</span>
          {note.category && (
            <div className="flex space-x-1">
              <span className={`w-2 h-2 rounded-full`}></span>
              <span>{noteCategory?.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}