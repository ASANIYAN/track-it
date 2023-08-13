import { SearchBarProps } from "@/types/types";

const DEFAULT_WIDTH = "w-[148px]";

const SearchBar: React.FC<SearchBarProps> = ({width = DEFAULT_WIDTH}) => {
    return (
        <>
            <input 
                type="text" 
                className={`border border-color4 dark:border-darkColor4 text-sm h-[38px] outline-none rounded-2xl pl-3 transition-all placeholder:pl-3 ${width}`} 
                placeholder="Search Project" 
            />
        </>
    );
}
 
export default SearchBar;