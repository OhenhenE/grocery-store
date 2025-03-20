// import Images from "";

function AllGroceries(props){

    // console.log("props", props);
    return (
        <>
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {props.data.map((grocery, index) => (
          <div className="card" style={{ width: '18rem' }} key={index}>
            <img 
            src={`/Images/${grocery.grocery_id}.jpg`} 
            className="card-img-top" 
            alt={grocery.name} />
            <div className="card-body">
              <h5 className="card-title">{grocery.name}</h5>
              <p className="card-text">{grocery.id}</p>
              <p className="card-text">{grocery.description}</p>
              <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </>
    );
};

export default AllGroceries;