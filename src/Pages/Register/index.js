import InputForm from '../../components/InputForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import logo from '../../images/logo_laptopShop.png';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import Loading from '../../components/Loading';
import * as Messages from '../../components/Messages';
function Register() {
    // const [isShowPassword, setIsShowPassword] = useState(false);
    // const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnchangePassword = (value) => {
        setPassword(value);
    };

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const mutation = useMutationHooks((data) => UserService.createUser(data));
    const { data, isPending, isError, isSuccess } = mutation;
    console.log(mutation);
    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'OK') {
                Messages.success(data.message);
                navigate('/login');
            } else {
                Messages.error(data.message);
            }
        }
        if (isError) {
            Messages.error();
        }
    }, [isError, isSuccess]);
    const handleRegister = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        });
        console.log(email, password);
    };
    return (
        <div>
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
                    style={{
                        width: '800px',
                        height: '445px',
                        borderRadius: '6px',
                        background: '#fff',
                        display: 'flex',
                    }}
                >
                    <div className="dangnhap">
                        <h1>Xin chào</h1>
                        <p>Hãy tạo tài khoản</p>
                        <InputForm
                            style={{ marginBottom: '10px' }}
                            value={email}
                            placeholder="abc@gmail.com"
                            onChange1={handleOnchangeEmail}
                        />
                        <div style={{ position: 'relative' }}>
                            <span
                                // onClick={() => setIsShowPassword(!isShowPassword)}
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
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange1={handleOnchangePassword}
                            />
                        </div>
                        <div style={{ position: 'relative', marginTop: 10 }}>
                            <span
                                // onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
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
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange1={handleOnchangeConfirmPassword}
                            />
                        </div>
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
                                onClick={handleRegister}
                            >
                                Đăng ký
                            </button>
                        </Loading>
                        <p>
                            Đã có tài khoản?{' '}
                            <span
                                className="taotaikhoan"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                {' '}
                                Đăng nhập
                            </span>
                        </p>
                    </div>
                    <div className="imgDangky">
                        <img src={logo} alt="iamge-logo" style={{ height: '203px', width: '203px' }} />
                        <h4>LAPTOP Shop</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
