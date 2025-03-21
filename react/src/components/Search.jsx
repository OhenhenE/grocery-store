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
        <form className="form-inline my-2 my-lg-0" 
        onSubmit={handleSubmit}
        style={{
            display: "flex", 
            paddingLeft:"600px",
            paddingRight:"20px"
        }}
        >
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleChange} style={{paddingRight:"20px", marginRight:"10px"}}/>
            <button className="btn my-2 my-sm-0" type="submit" style={{backgroundColor:"#E8F6F6", color:"#333333", fontSize:"18px", fontWeight:"bold", borderColor: "#ffffff"}}>Search</button>
        </form>
        </>
    )
}

export default Search;