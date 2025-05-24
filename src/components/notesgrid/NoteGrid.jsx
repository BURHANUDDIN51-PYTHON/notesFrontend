// import NoteCard from "../notecard/NoteCard";
// import NoteDetail from "../notedetail/Notedetail";
import { useState } from "react";
import { NoteCard, NoteDetail } from "../index.js";

export default function NoteGrid({ notes , searchResults}) {

  const [selectedNote, setSelectedNote] = useState(null);

  const [isGrid, setIsGrid] = useState(false);
  
  notes = searchResults ? searchResults : notes;


  return (
    <div className="flex-1 overflow-y-auto p-6">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-heading mx-auto md:m-0">Notes</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" 
            onClick={() => setIsGrid(true)}
          >
            <i className="fas fa-th-large"></i>
          </button>
          <button
            onClick={() => setIsGrid(false)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>
      <div className={isGrid ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`: `flex flex-col gap-4`}>
        {notes?.map((note) => (
          <NoteCard key={note.id} note={note} onClick={(note) => setSelectedNote(note)}/>
        ))}
      </div>

      {/* Overlay */}
      <NoteDetail
        note={selectedNote} 
        onClose={() => setSelectedNote(null)} 
      />
    </div>
  );
}