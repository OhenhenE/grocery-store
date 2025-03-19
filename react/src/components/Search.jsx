import React, { useState } from "react";

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/groceries/search`, {
            method: "POST",
            body: JSON.stringify({ searchTerm }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                props.setData(data);
                console.log("search results", data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search for groceries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2">
                Search
            </button>
        </form>
    );
}

export default Search;