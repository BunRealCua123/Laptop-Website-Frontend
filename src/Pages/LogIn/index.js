import InputForm from '../../components/InputForm';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import logo from '../../images/logo_laptopShop.png';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import Loading from '../../components/Loading';
import * as Messages from '../../components/Messages';
// import { useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slide/userSlide';

function LogIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    console.log(email);
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };

    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isPending, isSuccess, isError } = mutation;

    const handlegetDetailUser = async (id) => {
        const res = await UserService.getDetailUser(id);
        // console.log('data', res);
        // return res.data;
        dispatch(updateUser({ ...res.data }));
    };

    useEffect(() => {
        const test = async () => {
            if (isSuccess) {
                if (data.status === 'OK') {
                    Messages.success(data.message);
                    localStorage.setItem('idUser', JSON.stringify(data?.data));
                    if (data?.data.id) {
                        handlegetDetailUser(data.data.id);
                    }
                    // console.log(data)
                    if (location?.state) {
                        navigate(location.state);
                    } else {
                        if (data.data.admin === true) {
                            navigate('/admin');
                        } else {
                            navigate('/');
                        }
                    }
                } else {
                    Messages.error(data.message);
                }
            }
            if (isError) {
                Messages.success();
            }
        };
        test();
    }, [isSuccess, isError]);
    // const data1 = UserService.getDetailUser('662b66d0a83c9a68250d7788');
    // console.log('dataUser', data1);
    // useEffect(() => {
    //     const handlegetDetailUser = async () => {
    //         // UserService.getDetailUser('128378');
    //         const res = await UserService.getDetailUser('128378');
    //         console.log('data', res);
    //     };
    //     handlegetDetailUser();
    // });
    function handleLogin() {
        mutation.mutate({
            email,
            password,
        });
        console.log(email, password);
        console.log(typeof isPending);
    }
    // console.log('mutation', mutation);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.53)',
                height: '100vh',
            }}
        >
            <div
                style={{ width: '800px', minHeight: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}
            >
                <div className="dangnhap">
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tài khoản</p>
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        value={email}
                        placeholder="abc@gmail.com"
                        onChange1={handleOnchangeEmail}
                    />

                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {/* {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />} */}
                        </span>
                        <InputForm
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange1={handleOnchangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && (
                        <span style={{ color: 'red', fontSize: 16, marginTop: 20 }}>{data.message}</span>
                    )}
                    <Loading isLoading={isPending}>
                        <button
                            style={{
                                width: '100%',
                                // height: 70,
                                backgroundColor: '#0664f9',
                                borderRadius: '10px',
                                color: 'white',
                                padding: '10px 0px',
                                margin: '10px 0px 0px 0px',
                                textAlign: 'center',
                                fontSize: 16,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>
                    </Loading>
                    <p>
                        <span className="quenmatkhau">Quên mật khẩu?</span>
                    </p>
                    <p>
                        Chưa có tài khoản?{' '}
                        <span
                            className="taotaikhoan"
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            {' '}
                            Tạo tài khoản
                        </span>
                    </p>
                </div>
                <div className="imgDangnhap">
                    <img src={logo} alt="iamge-logo" style={{ height: '203px', width: '203px' }} />
                    <h4>LAPTOP Shop</h4>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
