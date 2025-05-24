import { useSearch } from "../../context/searchContext";

export default function SearchBar({isTyping, setIsTyping}) {
  const { searchTerm, handleSearch} = useSearch();
  return (
    <div className="px-4 pb-4">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={(e) => e.key == "Enter" ? e.currentTarget.blur() : null}
          type="text"
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:outline-none focus:ring-1 focus:ring-blue-400"
        
        />
        {/* Going to be conditional */}
        {searchTerm && (
          <button onClick={() => handleSearch({ target: { value: "" } })}>
            <i className="fas fa-times absolute right-3 top-3 text-gray-400 hover:text-red-400"></i>
          </button>
        )}
        <button>
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </button>
      </div>
    </div>
  );
} 