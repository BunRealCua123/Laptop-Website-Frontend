import { useNavigate } from 'react-router-dom';
import './producttypebar.css';
function ProductTypeBar() {
    const navigate = useNavigate();
    return (
        <div className="productTypeBar">
            <div
                className="typeNew"
                onClick={() => {
                    navigate({ pathname: '/type' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/59505-300x300.png"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Sản phẩm
            </div>
            <div
                className="typeStudent"
                onClick={() => {
                    navigate({ pathname: '/type', search: '?type=student' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/2icon_menu-300x300.webp"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Laptop cho Sinh viên
            </div>
            <div
                className="typeGamming"
                onClick={() => {
                    navigate({ pathname: '/type', search: '?type=gaming' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/game1.png"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Laptop Gaming
            </div>
            <div
                className="typeGraphic"
                onClick={() => {
                    navigate({ pathname: '/type', search: '?type=graphic' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/laptop-6087062_960_720-1-300x300.png"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Laptop Đồ Họa-Kỹ Thuật
            </div>
            <div
                className="typeMacbook"
                onClick={() => {
                    navigate({ pathname: '/type', search: '?type=macbook' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/22791-300x300.png"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Macbook
            </div>
            <div
                className="typeSurface"
                onClick={() => {
                    navigate({ pathname: '/type', search: '?type=surface' });
                }}
            >
                <img
                    src="https://thegioiso365.vn/wp-content/uploads/2023/01/615761-200.png"
                    alt="laptop"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                Laptop Surface
            </div>
        </div>
    );
}

export default ProductTypeBar;
