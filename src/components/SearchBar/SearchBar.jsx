import { useState } from "react";

function SearchBar({onSearch}) {
    const [userInput, setUserInput] = useState('')

    const handleInput = ({target}) => (
        setUserInput(target.value)
    );

    return(
        <div>
            <input value={userInput} onChange={handleInput} />
            <button onClick={() => {
                onSearch(userInput)
                setUserInput('')
            }}>Search</button>
        </div>
    );
};

export default SearchBar;