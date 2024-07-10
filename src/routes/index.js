import Home from '../Pages/Home';
import Follow from '../Pages/Folow';
import Admin from '../Pages/Admin';
import DefaultLayout from '../components/layout/defaultLayout';
import NoneLayout from '../components/layout/NoneLayout';
import HomeLayout from '../components/layout/HomeLayout';
import OnlyLayout from '../components/layout/OnlyLayout';
import Promotion from '../Pages/Promotion';
import News from '../Pages/News';
import Contact from '../Pages/Contact';
import Introduce from '../Pages/Introduce';
import TypePage from '../Pages/TypePage';
import LogIn from '../Pages/LogIn';
import Cart from '../Pages/Cart';
import Register from '../Pages/Register';
import ProductDetail from '../Pages/ProductDetail';
import PaymentPage from '../Pages/PaymentPage';
import NotFound from '../Pages/NotFound';
import SuccessOrder from '../Pages/SuccessOrder';
import MyOrder from '../Pages/MyOrder';
import OrderDetail from '../Pages/OrderDetail';
const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/follow', component: Follow, layout: DefaultLayout },
    { path: '/admin', component: Admin, layout: OnlyLayout, isPrivate: true },
    { path: '/home/:idHome', component: Home, layout: DefaultLayout },
    { path: '/promotion', component: Promotion, layout: DefaultLayout },
    { path: '/news', component: News, layout: DefaultLayout },
    { path: '/contact', component: Contact, layout: DefaultLayout },
    { path: '/introduce', component: Introduce, layout: DefaultLayout },
    { path: '/type', component: TypePage, layout: DefaultLayout },
    { path: '/login', component: LogIn, layout: NoneLayout },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/payment', component: PaymentPage, layout: DefaultLayout },
    { path: '/register', component: Register, layout: NoneLayout },
    { path: '/productdetail/:id', component: ProductDetail, layout: DefaultLayout },
    { path: '/success', component: SuccessOrder, layout: DefaultLayout },
    { path: '/myorder', component: MyOrder, layout: DefaultLayout },
    { path: '/orderdetail/:id', component: OrderDetail, layout: DefaultLayout },
    { path: '*', component: NotFound, layout: NoneLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
