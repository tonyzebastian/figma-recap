import './catstyles.scss'; // Add this import at the top

function CatLoader() {
    return (
        <div className="box w-24">
            <div className="cat">
                <div className="cat__body"></div>
                <div className="cat__body"></div>
                <div className="cat__tail"></div>
                <div className="cat__head"></div>
            </div>
        </div>  
    );
}

export default CatLoader;