
const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
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
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };
}

export default Search;