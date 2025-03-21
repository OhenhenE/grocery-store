function IncrementComponent(props) { 

    const decreaseQuantity = () => {
        const newQuantity = parseInt(props.quantityIndicator, 10) - 1;
        if (newQuantity < 1) {
            props.changeQuantityIndicator(0);
        } else {
            props.changeQuantityIndicator(newQuantity);
        }
    }
    
    const increaseQuantity = () => {
        const newQuantity = parseInt(props.quantityIndicator, 10) + 1;
        props.changeQuantityIndicator(newQuantity);
    }
    
    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 1) {
            props.changeQuantityIndicator(0);
        } else {
            props.changeQuantityIndicator(value);
        }
    }

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>-</button>
            </div>
            <input type="number" className="form-control" value={props.quantityIndicator} onChange={handleChange} />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>+</button>
            </div>
        </div>
    );
}

export default IncrementComponent;
