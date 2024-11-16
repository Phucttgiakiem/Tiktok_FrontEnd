import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import images from 'assets/images';
import Image from '~/components/Image';
import config from '~/config';
import { RiUser3Line } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AuthenLogin } from 'redux/actions';
import {useDispatch } from 'react-redux';
import {useCallback } from 'react';
import Menu from '~/components/Popper/Menu';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function HeaderUpload () {
    const savedUser = {
        email: Cookies.get('useremail'),
        avatar: Cookies.get('avatar'),
        fullName: Cookies.get('username'),
        id: Cookies.get('iduser'),
    };
    const currentUserData = savedUser;
    const MENU_ITEMS = [
        {
            icon: <RiUser3Line />,
            title: "Profile",
            to: `/profile/${currentUserData.email}`
        },
        {
            icon: <RiLogoutBoxLine />,
            title: "Log out",
            to: '/logout',
            separate: true,
        }
    ]
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/logout':
                handleLogoutAccount();
                break;
            case `/profile/${currentUserData.email}`:
                navigate(`/profile/${currentUserData.email}`);
                break;
            default:
        }
    };
    const handleLogoutAccount = useCallback(() => {
        // remove all Cookies
        Cookies.remove('useremail');
        Cookies.remove('avatar');
        Cookies.remove('username');
        Cookies.remove('iduser');
        dispatch(AuthenLogin.AuthenLoginReset());
        setTimeout(()=> {
            window.location.replace('/');
        },100)
        
    },[dispatch])
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>
                <div className={cx('actions')}>
                    <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                            <Image
                                    src={
                                        currentUserData.avatar ||
                                        'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D'
                                    }
                                    className={cx('user-avatar')}
                                    alt="Nguyen Van A"
                            />
                    </Menu>
                </div>
            </div>
        </header>
    )
}
export default HeaderUpload;