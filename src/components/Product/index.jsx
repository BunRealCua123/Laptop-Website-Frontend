import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product.css';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderProduct } from '../../redux/slide/orderSlide';
import { convertPrice } from '../../utils';
import * as Messages from '../Messages/index';
function Product({ product }) {
    const { _id, name, type, Producer, image, price, status, amount, ram, cpu, screen, description } = product;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.user);
    console.log('loginUser', loginUser);
    const handleAddProduct = () => {
        if (!loginUser._id) {
            navigate('/login', { state: location.pathname });
        } else {
            Messages.success('Thêm sản phẩm vào giỏ hàng thành công');
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: name,
                        amount: 1,
                        image: image,
                        price: price,
                        product: _id,
                    },
                }),
            );
        }
    };
    const data = [
        {
            category: 'CPU',
            value: cpu,
        },
        {
            category: 'RAM',
            value: ram,
        },
        {
            category: 'Ổ cứng',
            value: '512GB PCIe NVMe SSD',
        },
        {
            category: 'Card VGA',
            value: 'NVIDIA GeForce RTX 4050 6GB (140W)',
        },
        {
            category: 'Màn hình',
            value: screen,
        },
        {
            category: 'Webcam',
            value: 'HD Webcam',
        },
        {
            category: 'Cổng kết nối',
            value: '2x USB 3.2 Type-C Gen 2, 1x USB 3.2 Type-A Gen 1, 2x USB 3.2 Type-A Gen 2, 1x microSD™ Card reader, 1x HDMI 2.1, 1x RJ45, 1x Jack 3.5mm',
        },
        {
            category: 'Pin',
            value: '4-cell, 90 Wh',
        },
        {
            category: 'Hệ điều hành',
            value: 'Windows 11',
        },
        {
            category: 'Trọng lượng',
            value: '2.6 kg',
        },
    ];
    return (
        <div>
            <h3>Sản phẩm/{type}</h3>
            <div className="product">
                <div className="mainProduct">
                    <div className="infoProduct">
                        <img src={image} alt="product" style={{ width: '100%', height: '350px' }} />
                    </div>
                    <div className="priceProduct">
                        <div
                            style={{
                                fontSize: '20px',
                                color: 'black',
                                fontWeight: '700',
                            }}
                        >
                            {name}
                        </div>
                        <br />
                        <div style={{ fontSize: 25, color: 'red' }}>{convertPrice(price)}</div>
                        <br />
                        <button
                            style={{
                                width: '100%',
                                // height: 70,
                                backgroundColor: 'red',
                                borderRadius: '10px',
                                color: 'white',
                                padding: '10px 0px',

                                textAlign: 'center',
                                fontSize: 20,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleAddProduct}
                        >
                            Mua ngay
                            <div style={{ fontSize: 13, paddingTop: '10px' }}>Giao tận nơi hoặc nhận tại cửa hàng</div>
                        </button>
                        <div className="tragop">
                            <button
                                style={{
                                    width: '48.5%',
                                    // height: 70,
                                    backgroundColor: '#0664f9',
                                    borderRadius: '10px',
                                    color: 'white',
                                    padding: '10px 0px',
                                    margin: '10px 10px 0px 0px',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleAddProduct}
                            >
                                Trả góp 0%
                                <div style={{ fontSize: 13, paddingTop: '10px' }}>Duyệt nhanh qua điện thoại</div>
                            </button>
                            <button
                                className="buttonCart"
                                style={{
                                    width: '48.5%',
                                    // height: 70,
                                    backgroundColor: '#0664f9',
                                    borderRadius: '10px',
                                    color: 'white',
                                    padding: '10px 0px',
                                    margin: '10px 0px 0px 0px',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleAddProduct}
                            >
                                Trả góp qua thẻ
                                <div style={{ fontSize: 13, paddingTop: '10px' }}>Visa, Master Card, JCB</div>
                            </button>
                        </div>
                    </div>
                    <div className="guarantee">
                        <div className="yentammuahang">
                            <div
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '10px 0px',
                                    fontWeight: 700,
                                }}
                            >
                                YÊN TÂM MUA HÀNG
                            </div>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Cam kết
                                bán hàng mới 100%{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Bảo hành
                                chính hãng{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Tư vấn
                                chuyên nghiệp, nhiệt tình{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Bảo hành
                                tận nơi cho doanh nghiệp{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Cam kết
                                giá tốt nhất thị trường{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Cam kết
                                giá tốt nhất thị trường{' '}
                            </p>
                        </div>
                        <div className="chinhsach" style={{ marginTop: 10 }}>
                            <div
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '10px 0px',
                                    fontWeight: 700,
                                }}
                            >
                                CHÍNH SÁCH GIAO HÀNG
                            </div>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Giao hàng
                                miễn phí nội thành Hà Nội, HCM siêu tốc trong 60 phút{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Giao hàng
                                COD Toàn Quốc{' '}
                            </p>
                            <p style={{ marginLeft: 10 }}>
                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(23, 148, 23)' }} /> Thời gian
                                làm việc: Từ thứ 2 - Chủ nhật(8h30 - 20h30){' '}
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: 20, marginTop: 30 }}>
                    <span className="parameter">Thông số kĩ thuật</span>
                    <div className="tableParameter" style={{ marginTop: 10 }}>
                        <table
                            style={{
                                width: 1000,
                                borderCollapse: 'collapse',
                                // backgroundColor: 'rgb(248, 248, 250)',
                                // borderRadius: 10,
                            }}
                        >
                            <thead></thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.category} style={{}}>
                                        <td
                                            style={{
                                                padding: 12,
                                                color: 'inherit',
                                                borderBottom: '1px solid rgb(210, 210, 210)',
                                                width: 130,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.category}
                                        </td>
                                        <td style={{ borderBottom: '1px solid rgb(210, 210, 210)', color: 'inherit' }}>
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ marginLeft: 20, marginTop: 30 }}>
                    <div className="description">Mô tả sản phẩm</div>
                    <div className="bodyDescription" style={{ width: 1000 }}>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
