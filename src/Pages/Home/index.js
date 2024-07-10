import './home.css';
import { useEffect, useState } from 'react';
import SlideComponent from '../../components/SliderComponent';
import CardProduct from '../../components/CardProduct';
import * as ProductService from '../../services/ProductService';
import ProductHome from '../../components/ProductHome';
import Slide1 from '../../images/Slide/slide1.jpg';
import Slide2 from '../../images/Slide/slide2.jpg';
import Slide3 from '../../images/Slide/slide3.jpg';
import Slide4 from '../../images/Slide/slide4.jpg';
import sieudeal from '../../images/Slide/dealhot.jpg';
import { laptop1 } from '../../models/Laptops';
import Loading from '../../components/Loading';
function Home() {
    // const [allproduct, setAllproduct] = useState([]);
    // useEffect(() => {
    //     const getProduct = async () => {
    //         const data = await ProductService.getAllProduct({});
    //         // console.log('data', data);
    //         setAllproduct(data.data);
    //     };
    //     getProduct();
    // }, []);
    // console.log('allproduct', allproduct);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Set loading state to false after 1 second

        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, []);
    return (
        <div className="home">
            <div className="showSideBar">
                <div className="sideBar"></div>
                <div className="ads">
                    <SlideComponent arrs={[Slide1, Slide2, Slide3, Slide4]} />
                    <div className="sieudeal">
                        {/* Rồi thêm 2 ảnh vào để đỡ trống */}
                        <img src={sieudeal} alt="deal" style={{ width: '95%', height: 300 }} />
                    </div>
                </div>
            </div>
            {/* <div className="bodyHome">
                    {/* Thêm các sản phẩm vào */}
            {/* <CardProduct product={laptop1} />
                    <CardProduct product={laptop1} /> */}
            {/* {allproduct.map((product) => {
                        return <CardProduct product={product} key={product._id} />;
                    })}
                </div>  */}
            <br />

            <Loading isLoading={isLoading}>
                <ProductHome type="" limit={10} />
                <ProductHome type="student" limit={10} />
                <ProductHome type="gaming" limit={10} />
                <ProductHome type="graphic" limit={5} />
                <ProductHome type="macbook" limit={5} />
                <ProductHome type="surface" limit={5} />
            </Loading>
        </div>
    );
}

export default Home;
