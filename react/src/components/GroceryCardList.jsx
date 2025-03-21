import GroceryCard from "./GroceryCard";

const GroceryCardList =  (props) => {
    return (
        <>
                <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}> 
                    {
                        props.data.map((grocery) => (
                            <GroceryCard key={grocery.grocery_id} data={grocery} />
                        ))
                    }
                </div>
        </>
    );
};

export default GroceryCardList;