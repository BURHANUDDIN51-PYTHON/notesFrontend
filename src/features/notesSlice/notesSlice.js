import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [], 
  categories: [] // Default empty array
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            // Check if the category already exists
            const exists = state.categories.some(category => category.name === action.payload.name);
            if (exists) {
                return;
            }
            if (Array.isArray(action.payload)) {
                state.categories = [action.payload];
            } else {
                // Add single note to beginning of array
                state.categories[0].push(action.payload);
            }
           
        },
        deleteCategory: (state, action) => {
            
            // Remove the category from the array
            state.categories[0] = state.categories[0].filter(category => category.id !== action.payload);
        },

        addNote: (state, action) => {
           if (Array.isArray(action.payload)) {
                state.notes = [action.payload];
            } else {
                // Add single note to beginning of array
                state.notes[0].push(action.payload);
            }
        },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        }
    }
});

// Export The reducer funtions
export const { addNote, updateNote, deleteNote, addCategory, deleteCategory } = notesSlice.actions;
//  Export the reducer for the store
export default notesSlice.reducer; 