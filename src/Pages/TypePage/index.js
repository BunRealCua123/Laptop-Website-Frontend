import FilterBar from '../../components/FilterBar';
import CardProduct from '../../components/CardProduct';
import './typepage.css';
import { laptop1 } from '../../models/Laptops';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/Loading';

function TypePage() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramsArray = [...queryParams.entries()];
    const obj = Object.fromEntries(paramsArray);
    if (obj.name === '') {
        obj.name = null;
    }
    // const updateParams = () => {
    //     setParamsObject(obj);
    // };

    // updateParams();
    const [title, setTitle] = useState('Cửa hàng');
    useEffect(() => {
        const titleResult = () => {
            if (obj.name) {
                setTitle(`Kết quả của tìm kiếm: ${obj.name}`);
            } else if (obj.type) {
                if (obj.type === 'gaming') {
                    setTitle('Laptop Gaming');
                } else if (obj.type === 'student') {
                    setTitle('Laptop cho sinh viên');
                } else if (obj.type === 'graphic') {
                    setTitle('Laptop đồ họa');
                } else if (obj.type === 'macbook') {
                    setTitle('Macbook');
                } else if (obj.type === 'surface') {
                    setTitle('Laptop Surface');
                }
            } else {
                setTitle('Cửa hàng');
            }
        };
        titleResult();
    }, [location.search]);
    useEffect(() => {
        const searchResult = async () => {
            setIsLoading(true);
            const data = await ProductService.getAllProduct(obj);
            setIsLoading(false);
            setResult(data?.data);
        };
        searchResult();
    }, [location.search]);
    console.log('queryParams', obj);
    return (
        <div className="mainType">
            <h2 style={{ marginLeft: 10 }}>{title}</h2>
            <Loading isLoading={isLoading}>
                <div className="typePage">
                    <FilterBar />
                    <div className="bodyTypePage">
                        {result.length > 0 ? (
                            result.map((product) => {
                                return <CardProduct key={product._id} product={product} />;
                            })
                        ) : (
                            <div style={{ textAlign: 'center', width: '100%', fontSize: 20, marginTop: 80 }}>
                                Không tìm thấy sản phẩm
                            </div>
                        )}
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default TypePage;
