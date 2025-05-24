import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote } from '../../features/notesSlice/notesSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import URL from '../../conf/conf';

function NoteDetail({ note, onClose }) {
  if (!note) return null;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const noteDate = new Date(note.updated);
  const noteDateString = noteDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteCategory = useSelector(state => state.notes.categories[0].find(
      cat => cat.id == note.category
  ));

  const handleDelete = (note) => {
    axios.delete(`${URL}/notes/${note.slug}`)
    .then(() => {
      dispatch(deleteNote(note.id))
      console.log('Delete Successfully')
      navigate('/');
      toast.success('Note Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    
    })
    .catch(error => {
      console.error('Error deleting note:', error)
      toast.error('Erorr Deleting Note Try Again', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    })
     navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800/60 flex items-center justify-center p-4">
      <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold font-heading">{note.title}</h2>
            <div className='flex gap-4'>
              <button 
                onClick={() => navigate("/notes/" + note.slug)}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                title="Edit note"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                  onClick={() => {
                    setIsDeleteModalOpen(true)
                  }}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                  title="Delete note"
                >
                  <i className="fas fa-trash"></i>
                </button>
              <button 
                onClick={onClose}
                className="dark:text-white text-black hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: note.body }} />
            {/* <p className="whitespace-pre-line" >{note.body}</p> */}
          {/* </div> */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
            <p>Last updated: {noteDateString}</p>
            
            {note.category && (
            <span className={`text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full `}>
              {noteCategory.name}
            </span>
          )}
          </div>
        </div>
          <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDelete(note)
            setIsDeleteModalOpen(false)
            onClose()
          }}
          message={`Are you sure you want to delete "${note.title}"?`}
        />
      </div>
    </div>
  );
}

export default NoteDetail;