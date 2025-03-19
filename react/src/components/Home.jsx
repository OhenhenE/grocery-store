import GroceryCardList from "./GroceryCardList";
import Header from "./Header";

function Home(props) {
    return(
        <>
            <Header setGroceryData={props.setGroceryData} />
            <GroceryCardList data={props.grocery_data}/>
        </>
    );
}

export default Home;