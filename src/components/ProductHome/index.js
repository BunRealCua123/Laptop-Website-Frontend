import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import CardProduct from '../CardProduct';
import './producthome.css';
function ProductHome({ type, limit }) {
    const [allproduct, setAllproduct] = useState([]);
    let head = '';
    if (type === 'gaming') {
        head = 'LAPTOP GAMING';
    } else if (type === 'student') {
        head = 'LAPTOP VĂN PHÒNG';
    } else if (type === 'graphic') {
        head = 'LAPTOP ĐỒ HỌA';
    } else if (type === 'macbook') {
        head = 'MACBOOK';
    } else if (type === 'surface') {
        head = 'LAPTOP SURFACE';
    } else if (type === '') {
        head = 'LAPTOP NỔI BẬT';
    }
    useEffect(() => {
        const getProduct = async () => {
            const data = await ProductService.getAllProduct({ type: type, limit: limit });
            // console.log('data', data);
            setAllproduct(data.data);
        };
        getProduct();
    }, [limit, type]);
    console.log('tesst');
    return (
        <div className="productHome">
            <span
                style={{
                    // width: 220,
                    marginTop: 20,
                    // height: 50,
                    backgroundColor: '#eb2028',
                    marginLeft: 20,
                    marginBottom: 0,
                    padding: '10px',
                    fontSize: 25,
                    display: 'inline-flex',
                    alignContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    position: 'relative',
                    // borderRadius: 10,
                }}
            >
                {head}
                <img
                    src="https://thegioiso365.vn/wp-content/themes/the-gioi-laptop/images/bg_title.png"
                    alt="anh"
                    style={{ position: 'absolute', right: -30, top: 0, height: '50px', width: 'auto' }}
                />
            </span>
            {/* <img src="https://thegioiso365.vn/wp-content/themes/the-gioi-laptop/images/bg_title.png" alt="anh" /> */}
            <div className="bodyProductHome">
                {allproduct.map((product) => {
                    return <CardProduct product={product} key={product._id} />;
                })}
            </div>
        </div>
    );
}

export default ProductHome;
