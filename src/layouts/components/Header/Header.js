import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import config from '~/config';
import styles from './Header.module.scss';
import images from 'assets/images';
import Button from '~/components/Button';
import 'tippy.js/dist/tippy.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState, useEffect,useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AuthenLogin, showAuthendialog } from 'redux/actions';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import Menu from '~/components/Popper/Menu';
// import { faKeybase } from '@fortawesome/free-brands-svg-icons';
import { AuthenDialogState$, loginState$ } from 'redux/selectors';
import { faUser, faCoins, faGear } from '@fortawesome/free-solid-svg-icons';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '~/pages/Search';
import Login from 'pages/login/Login';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            user: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const [Avatar, setAvatar] = useState('');
    const {isshow} = useSelector(AuthenDialogState$);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Kiểm tra cookie để lấy thông tin user
    const savedUser = {
        email: Cookies.get('useremail'),
        avatar: Cookies.get('avatar'),
        fullName: Cookies.get('username'),
        id: Cookies.get('iduser'),
    };

    //const {user} = useSelector(loginState$);
    const currentUserData = savedUser;
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/logout':
                handleLogoutAccount();
                break;
            case `/profile/${savedUser.id}`:
                window.location.replace(`/profile/${savedUser.id}`);
                break;
            default:
                break;
        }
    };
    // const handleSaveuserinfo = () => {
    //     Cookies.set('useremail', currentUserData.email, { expires: 1 });
    //     Cookies.set('avatar', currentUserData.avatar, { expires: 1 });
    //     Cookies.set('username', currentUserData.fullName, { expires: 1 });
    //     Cookies.set('iduser', currentUserData.id, { expires: 1 });
    // }
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/profile/${savedUser.id}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'My All Videos',
            to: '/mypost',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    const handleLogin = useCallback(() => {
        dispatch(showAuthendialog());
    },[dispatch]);
    
    const handleLogoutAccount = useCallback(() => {
        // remove all Cookies
        Cookies.remove('useremail');
        Cookies.remove('avatar');
        Cookies.remove('username');
        Cookies.remove('iduser');
        dispatch(AuthenLogin.AuthenLoginReset());
        window.location.reload();
    },[dispatch])

    useEffect(() => {
        if (!currentUserData && !currentUserData.email && Object.keys(currentUserData).length > 0) {
            handleLogin();
        }
    }, [currentUserData]);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUserData && currentUserData.email ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <Link to={"/upload"}>
                                    <button className={cx('action-btn')} >
                                            <UploadIcon />
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary onClick={handleLogin}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUserData && currentUserData.email ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUserData.email ? (
                            <Image
                                src={
                                    currentUserData.avatar ||
                                    'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D'
                                }
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                // fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/390191/65dbf5490804b.jpg"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
            {isshow && <Login />}
        </header>
    );
}

export default Header;
