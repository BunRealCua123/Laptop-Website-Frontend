import Footer from '../Components/Footer';
import Header from '../Components/Header';
import NavbarHome from './NavbarHome';
import './defaultLayout.css';
function HomeLayout({ children }) {
    return (
        <div className="wrapper_Layout">
            <Header />
            <div className="container">
                <NavbarHome />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default HomeLayout;
