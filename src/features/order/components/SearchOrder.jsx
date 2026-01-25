import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query, setQueryTerm] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here
        if (!query) return;
        navigate(`/order/${query}`);
        setQueryTerm("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search order..."
                value={query}
                onChange={(e) => setQueryTerm(e.target.value)}
            />
        </form>
    )
}

export default SearchOrder