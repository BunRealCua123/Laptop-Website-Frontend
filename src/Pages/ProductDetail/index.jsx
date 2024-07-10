import Product from '../../components/Product';
import { laptop1 } from '../../models/Laptops';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
function ProductDetail() {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const detailProduct = async () => {
            const data = await ProductService.getDetailProduct(id);
            setProduct(data?.data);
        };
        detailProduct();
    }, [id]);
    console.log('product', product);
    return (
        <div className="productDetail">
            {/* <h3 className="headProductDetail" style={{ width: '100%' }}>
                Trang chủ
            </h3> */}
            <div className="bodyProductDetail" style={{ width: '100%' }}>
                <Product product={product} />
            </div>
        </div>
    );
}

export default ProductDetail;
