import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import Logo from '../../../../images/logo_laptopShop.png';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="footer" style={{ marginTop: 20 }}>
                <div className="footer-container">
                    <div className="footer-about">
                        <div className="footer-logo">
                            <img
                                src={Logo}
                                alt="logo"
                                onClick={() => (window.location.href = '/')}
                                style={{ width: 40, height: 40 }}
                            />
                        </div>
                        <div className="footer-detail">
                            <p>This is a website for selling laptops online, created with React. Contact me via: </p>
                            <div className="footer-icon">
                                <li
                                    onClick={() =>
                                        (window.location.href = 'https://www.facebook.com/quan.nguyenhoang25/')
                                    }
                                >
                                    <FaFacebook />
                                </li>
                                <li onClick={() => (window.location.href = 'https://www.instagram.com/qniichan/')}>
                                    <FaInstagram />
                                </li>
                                <li
                                    onClick={() =>
                                        (window.location.href =
                                            'https://www.youtube.com/channel/UC5XNf11qMCQ75wwDIXKMmwA')
                                    }
                                >
                                    <FaYoutube />
                                </li>
                                <li onClick={() => (window.location.href = 'https://github.com/hoangQuan25')}>
                                    <FaGithub />
                                </li>
                            </div>
                        </div>
                    </div>
                    <div className="footer-account">
                        <h3>My account</h3>
                        <ul>
                            <li>Account</li>
                            <li>Order</li>
                            <li>Cart</li>
                            <li>Shipping</li>
                            <li>Return</li>
                        </ul>
                    </div>
                    <div className="footer-page">
                        <h3>Pages</h3>
                        <ul>
                            <li
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                Home
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/type');
                                }}
                            >
                                Product
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/cart');
                                }}
                            >
                                Cart
                            </li>
                            <li>Login</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
