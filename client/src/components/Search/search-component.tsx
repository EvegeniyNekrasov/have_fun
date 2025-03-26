import { Eraser, Search } from "lucide-react";

type SearchComponentProps = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchComponent = ({ search, setSearch }: SearchComponentProps) => (
    <div className="flex bg-neutral-50 rounded-md items-center gap-1 flex-row p-2 w-full">
        <Search size={18} />
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full h-full active:border-none focus-within:outline-none"
        />
        <button
            onClick={() => setSearch("")}
            className="w-[25px] h-[20px] cursor-pointer rounded flex items-center justify-center bg-white">
            <Eraser size={14} />
        </button>
    </div>
);

SearchComponent.displayName = "SearchComponent";

export default SearchComponent;
