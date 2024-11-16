import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';
import { useDispatch,useSelector } from 'react-redux';
import SprinerCircle from 'components/SprinerCircle/SprinerCircle';
import Comment from 'pages/Comment';
import { GetStatusListComment$, ShowLoadingNotification$ } from 'redux/selectors';
//import Login from 'pages/login';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const {isshowloading} = useSelector(ShowLoadingNotification$);
    //const {isshowlc} = useSelector(GetStatusListComment$)
    return (
        <div className={cx('wrapper')}>
           {isshowloading && <div className={cx('wrapper-loading')}><SprinerCircle/></div>}
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
export default DefaultLayout;
