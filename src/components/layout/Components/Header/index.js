import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
// import 'tippy.js/dist/tippy.css';
import Logo from '../../../../images/logo_laptopShop.png';
import { faCartShopping, faCircleXmark, faL, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../../../popper';
import ProductItem from '../../../ProductItem';
import { useSelector } from 'react-redux';
import UserAccountHeader from '../../../UserAccountHeader';
import * as ProductService from '../../../../services/ProductService';

function Header() {
    const loginUser = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [result, setResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [outside, setOutside] = useState(false);
    let colorBackround = 'white';
    let color = 'black';
    if (loginUser.isAdmin) {
        colorBackround = 'rgb(255, 70, 50)';
        color = 'white';
    }
    const [obj, setObj] = useState({ limit: 5 });
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setObj({ ...obj, name: e.target.value });
        // console.log(e.target.value);
    };
    const handleDeleteSearch = () => {
        setSearchValue('');
    };
    const handleOutside = () => {
        setOutside(true);
    };
    useEffect(() => {
        const searchResult = async () => {
            const data = await ProductService.getAllProduct(obj);
            if (searchValue) {
                setResult(data?.data);
            } else setResult([]);
        };
        searchResult();
    }, [searchValue]);
    console.log('result', result);
    return (
        <header className="wrapper" style={{ backgroundColor: colorBackround, color: color }}>
            <div className="inner" style={{ backgroundColor: colorBackround, color: color }}>
                <img
                    src={Logo}
                    alt="Logo"
                    style={{
                        width: 60,
                        height: 60,
                        marginRight: 70,
                        borderRadius: '15px 15px',
                    }}
                />
                {!loginUser.isAdmin && (
                    <Tippy
                        visible={result.length > 0 && !outside}
                        interactive
                        render={(attrs) => (
                            <div className="searchResult" tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className="searchTitle">Products</h4>
                                    {result.map((product) => {
                                        return <ProductItem key={product._id} product={product} />;
                                    })}
                                </PopperWrapper>
                            </div>
                        )}
                        onClickOutside={handleOutside}
                    >
                        <div className="search">
                            <input
                                className="Input"
                                placeholder="Search Products"
                                value={searchValue}
                                onChange={handleSearch}
                                onFocus={() => setOutside(false)}
                            />
                            {searchValue.length > 0 && (
                                <button className="buttonClose" onClick={handleDeleteSearch}>
                                    {/* Close */}
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}

                            {/* nút loading */}
                            {/* <FontAwesomeIcon className="loading" icon={faSpinner} /> */}
                            <button className="buttonSearch">
                                <Link className="linkSearch" to={{ pathname: '/type', search: `?name=${searchValue}` }}>
                                    {/* Search */}
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Link>
                            </button>
                        </div>
                    </Tippy>
                )}
                <div className="action">
                    {!loginUser.isAdmin &&
                        (loginUser?.name ? (
                            <Link className="cartButton" to={'/cart'} style={{ position: 'relative' }}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <div
                                    style={{
                                        backgroundColor: 'red',
                                        width: 18,
                                        height: 18,
                                        color: 'white',
                                        fontSize: 11,
                                        borderRadius: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 1,
                                        right: 1,
                                    }}
                                >
                                    {order?.orderItems?.length}
                                </div>
                            </Link>
                        ) : (
                            <FontAwesomeIcon className="cartButton" icon={faCartShopping} />
                        ))}
                    {loginUser?.name ? (
                        <UserAccountHeader>
                            <span style={{ fontSize: 17, fontWeight: '700' }}>{loginUser?.name}</span>
                        </UserAccountHeader>
                    ) : (
                        <Link className="LoginButton" to={'/login'}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
