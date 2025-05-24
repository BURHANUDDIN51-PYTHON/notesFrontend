import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import URL from '../conf/conf';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const notes = useSelector(state => state.notes.notes);
    // UseEffect for fetching search results
    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${URL}/notes-search/?search=${searchTerm}/`)
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (searchTerm.length >= 3) {
            fetchSearchResults();
        } else {
            setSearchResults(null);
        }
    }, [searchTerm]);
    


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <SearchContext.Provider 
            value = {{
                searchTerm,
                searchResults,
                isLoading,
                handleSearch
            }}
        >
        {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}