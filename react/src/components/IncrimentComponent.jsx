function IncrimentComponent(props) { 

    decreaseQuantity = () => {
        const newQuanity = props.quanityIndicator - 1
        if (newQuanity < 1) {
            props.changeQuantityIndicator(0)
        } else {
            props.changeQuantityIndicator(newQuanity)
        }
        
    }
    
    increaseQuantity = () => {
        newQuanity = props.quanityIndicator + 1
        props.changeQuantityIndicator(newQuanity)
    }
    
    handleChange = (e) => {
        if (e.target.value < 1) {
            props.changeQuantityIndicator(0)
        } else {
            props.changeQuantityIndicator(e.target.value)
        }
    }

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>-</button>
            </div>
            <input type="text" className="form-control" value={props.quanityIndicator} onChange={handleChange} />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>+</button>
            </div>
        </div>
    )

}

export default IncrimentComponent;