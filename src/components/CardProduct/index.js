import './cardproduct.css';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils';
function CardProduct({ product }) {
    const { _id, name, type, producer, image, price } = product;
    return (
        <Link to={`/productdetail/${_id}`} style={{ textDecoration: 'none', paddingBottom: 10 }}>
            <div className="cardProduct">
                <img
                    src={image}
                    alt="product"
                    style={{
                        width: 220,
                        height: 220,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        marginBottom: 5,
                        marginTop: 10,
                    }}
                />
                <div className="nameCard">{name}</div>
                <div className="priceCard">{convertPrice(price)}</div>
            </div>
        </Link>
    );
}

export default CardProduct;
