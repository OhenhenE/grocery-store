import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm)
        fetch(`http://localhost:3000/groceries/search`, {
            method: "POST",
            body:JSON.stringify({ "searchTerm": searchTerm }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                props.setGroceryData(data);
                console.log("Data Reset by search", data);
                navigate('/', { replace: true });
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    return (
        <>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        </>
    )
}

export default Search;