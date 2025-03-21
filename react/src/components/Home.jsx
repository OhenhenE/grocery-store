import GroceryCardList from "./GroceryCardList";
import Header from "./Header";
import SubHeader from "./SubHeader";

function Home(props) {
    return(
        <>
            <SubHeader />
            <Header setGroceryData={props.setGroceryData} />
            <GroceryCardList data={props.grocery_data}/>
        </>
    );
}

export default Home;