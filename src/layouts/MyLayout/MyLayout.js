
import Header from './Header';
import styles from './UploadLayout.module.scss';
import classNames from 'classnames/bind';
import SprinerCircle from 'components/SprinerCircle/SprinerCircle';
import { ShowLoadingNotification$ } from 'redux/selectors';
import {useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function MyLayout ({children}) {
    const {isshowloading} = useSelector(ShowLoadingNotification$);
    return (
        <div className={cx('wrapper')}>
        {isshowloading && <div className={cx('wrapper-loading')}><SprinerCircle/></div>}
            <Header />
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    )
}
export default MyLayout;