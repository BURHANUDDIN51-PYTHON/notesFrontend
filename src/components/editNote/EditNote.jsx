import { useForm} from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, updateNote } from '../../features/notesSlice/notesSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TinyMCEEditor from '../toolbar/TinyMCEEditor';
import { toast } from "react-toastify";
import URL from '../../conf/conf';

export default function EditNote({ note, slug}) {

  // Initialize form data with saved data
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch, 
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: note?.title || '',
      body: note?.body || '',
      category: note?.category || '',
    }
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleLength = watch('title')?.length || 0;
  const categories = useSelector(state => state.notes.categories[0]);

  // solve the issue of the date time 
  const onSubmit = (data) => {
    axios.put(`${URL}/notes/${slug.slug}`, data)
      .then((response) => {
        dispatch(updateNote(response.data));
        navigate("/")
        toast.success('Changes Made Successfully', {
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
      .catch((error) => {
        console.error(error)
        navigate("/")
        toast.error('Error saving changes', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      
  };
  



  return (
    <div className="w-full md:w-3/4 p-10 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-heading">Edit Note</h1>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <i className="fas fa-save"></i>
            Save Changes
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <input
            {...register('title',{
              required: 'Title is required',
              maxLength: {
                value: 100,
                message: 'Title cannot exceed 100 characters'
              }
            })}
            placeholder="Note Title"
            className={`w-full p-4 text-2xl font-bold bg-transparent border-b ${
              errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
            } focus:outline-none focus:border-blue-500`}
          />
          <div className="flex justify-between mt-1">
            {errors.title ? (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            ) : (
              <span></span>
            )}
            <span className="text-sm text-gray-500">
              {titleLength}/100
            </span>
          </div>
        </div>

        {/* TinyMice Editor */}
        <div className="mb-6">
         <TinyMCEEditor 
            control={control}
            name='body'
            initialContent={note.body}
            rules={{
              required: 'Content is required',
              validate: (value) => 
                value.replace(/<[^>]+>/g, '').trim().length > 0 || 'Content cannot be empty'
            }}
            
          />
          <div className="mt-6">
            <select
              {...register('category')}
              className={`w-full p-3 bg-transparent border rounded-lg 
                ${errors.category ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
                focus:outline-none focus:border-blue-500
                dark:bg-gray-800 dark:text-white`}
            >
              <option selected value={''}>Select a category...</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              {/* Add more categories as needed with mapping*/}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}