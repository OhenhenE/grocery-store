
import Header from "./Header";
import { useState, useEffect } from "react";

import AllGroceries from "./AllGroceries";

function Home() {
    const [groceries, setGroceries] = useState([]);
  return (
    <>
      <h1>Home page func.</h1>
      <Header>
        <h1>Header here</h1>
      </Header>
      <AllGroceries data={groceries}>
        <h1>All groceries here</h1>
      </AllGroceries>
    </>
  );
}

export default Home;
