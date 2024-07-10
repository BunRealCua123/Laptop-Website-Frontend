import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dealhot from '../../../../images/dealhot.png';
import ProductTypeBar from '../../../ProductTypeBar';
import Tippy from '@tippyjs/react/headless';
function Navbar() {
    return (
        <nav className="navbar">
            <div className="wrapperNav">
                <Tippy
                    // visible={true}
                    interactive
                    render={(attrs) => (
                        <div className="typeNav" tabIndex="-1" {...attrs}>
                            <ProductTypeBar></ProductTypeBar>
                        </div>
                    )}
                >
                    <div className="listTypeNav">
                        <FontAwesomeIcon className="iconBar" icon={faBars} />
                        Danh mục sản phẩm
                    </div>
                </Tippy>
                <div className="listNav">
                    <Link className="linkNav" to={'/'}>
                        Trang chủ
                    </Link>
                    <Link className="linkNav" to={'/introduce'}>
                        Giới thiệu
                    </Link>
                    <Link className="linkNav" to={'/promotion'}>
                        Khuyến mãi
                    </Link>
                    <Link className="linkNav" to={'/news'}>
                        Tin tức
                    </Link>
                    <Link className="linkNav" to={'/contact'}>
                        Liên hệ
                    </Link>
                </div>
                <div className="saleNav">
                    <img src={dealhot} alt="hotdeal" style={{ height: '100%', width: 'auto' }} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
