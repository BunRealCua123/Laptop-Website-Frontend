// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { publicRoutes } from './routes';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { isJsonString } from './utils';
import { updateUser } from './redux/slide/userSlide';
import { useDispatch } from 'react-redux';
import * as UserService from '../src/services/UserService';
import Loading from './components/Loading';
import { useLocation } from 'react-router-dom';

function App() {
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isJsonString(localStorage.getItem('idUser')) && localStorage.getItem('idUser')) {
            // console.log('localStorage', localStorage.getItem('idUser'));
            const user = JSON.parse(localStorage.getItem('idUser'));
            if (user.id) {
                handlegetDetailUser(user.id);
            }
            // console.log(user.id);
        }
    }, []);
    const handlegetDetailUser = async (id) => {
        const res = await UserService.getDetailUser(id);
        // console.log('data', res);
        // return res.data;
        dispatch(updateUser({ ...res.data }));
    };
    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    });
    return (
        <Loading isLoading={loading}>
            <div>
                <Router>
                    <ScrollToTop />
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Layout = route.layout;
                                const Page = route.component;
                                const check = loginUser.isAdmin || !route.isPrivate;
                                return (
                                    check && (
                                        <Route
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                            key={index}
                                        ></Route>
                                    )
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </div>
        </Loading>
    );
}

export default App;
