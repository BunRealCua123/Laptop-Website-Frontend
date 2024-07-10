import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './useraccountheader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../../redux/slide/userSlide';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../redux/store';
import { removeAllOrder } from '../../redux/slide/orderSlide';
// import {updateUser} from '../../redux/slide/userSlide'

function UserAccountHeader({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(deleteUser({}));
        dispatch(removeAllOrder());
        localStorage.removeItem('idUser');
        // persistor.purge();
        navigate('/');
    };
    return (
        <Tippy
            // visible={true}
            interactive
            render={(attrs) => (
                <div className="userBar" tabIndex="-1" {...attrs}>
                    <button>Thông tin cá nhân</button>
                    <button
                        onClick={() => {
                            navigate('/myorder');
                        }}
                    >
                        Đơn hàng đã đặt
                    </button>
                    <button onClick={logout}>Đăng xuất</button>
                </div>
            )}
        >
            <div style={{ display: 'flex', alignItems: 'center', padding: '0px 5px', cursor: 'pointer' }}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{
                        fontSize: 40,
                        color: 'gray',
                        marginRight: 10,
                        backgroundColor: 'white',
                        borderRadius: 1000,
                    }}
                />
                {children}
            </div>
        </Tippy>
    );
}

export default UserAccountHeader;
