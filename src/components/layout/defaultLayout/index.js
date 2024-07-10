import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './defaultLayout.css';
function DefaultLayout({ children }) {
    return (
        <div className="wrapper_Layout">
            <Header />
            <div className="container">
                <Navbar></Navbar>
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
