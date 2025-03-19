import GroceryCardList from "./GroceryCardList";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";


function DepartmentPage(props) {

    let { category } = useParams();
    const [data, setData] = useState([]);
    
    useEffect (() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`http://localhost:3000/groceries/${category}/`);
            if(!response.ok) {
                throw new Error('Grocery Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable 
            } catch (error) {
            console.error('Error fetching groceries:', error);
            }
        };
        fetchData();
        }, [category]);
    
    return(
        <>
            <Header setGroceryData={props.setGroceryData} />
            <GroceryCardList data={data}/>
        </>
    );
}

export default DepartmentPage;