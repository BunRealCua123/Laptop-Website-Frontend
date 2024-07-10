import Header from '../Components/Header';
function OnlyLayout({ children }) {
    return (
        <div className="wrapper_Layout">
            <Header />
            <div className="container1" style={{ width: '100%', minHeight: 500 }}>
                <div className="content1">{children}</div>
            </div>
        </div>
    );
}

export default OnlyLayout;
