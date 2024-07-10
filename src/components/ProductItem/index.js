import { useNavigate } from 'react-router-dom';
import './ProductItem.css';
// import laptop from 'https://thegioiso365.vn/san-pham/laptop-cu-hp-elitebook-840g2-core-i5-ram-4gb-ssd-128-gb-14-inch-hd/'
function ProductItem({ product }) {
    const navigate = useNavigate();
    const { _id, name, image } = product;
    return (
        <div
            className="productItem"
            style={{ minHeight: 45 }}
            onClick={() => {
                navigate(`/productdetail/${_id}`);
            }}
        >
            <img className="productImg" src={image} alt="Name" />
            <div className="Info">
                <strong>{name}</strong>
            </div>
        </div>
    );
}

export default ProductItem;
