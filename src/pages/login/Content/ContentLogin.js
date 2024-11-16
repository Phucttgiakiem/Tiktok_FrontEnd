import classNames from 'classnames/bind';
import styles from '../login.module.scss';

import { UserIcon } from '~/components/Icons';
import {useCallback } from 'react';
import { useDispatch} from 'react-redux';
import Button from 'components/Button';
import { showcontrolregister,showDetailloginwithemail,hideAuthendialog } from 'redux/actions';
const cx = classNames.bind(styles);
function ContentLogin() {
    const dispatch = useDispatch();
    
    const handleAuthen = useCallback((actionCreate) => {
        dispatch(actionCreate);
    },[dispatch]);

    const handlehideDialog = useCallback(() => {
        dispatch(hideAuthendialog())
    },[dispatch])
    return (
        <>
            <h2 className={cx('login-title')}>Đăng nhập vào TikTok</h2>
            <div className={cx('content-one')}>
                <Button
                    className={cx('box-type-one')}
                    leftIcon={<UserIcon />}
                    onClick={() => handleAuthen(showDetailloginwithemail('DetailLogin'))}
                >
                    Email / TikTok ID
                </Button>
            </div>
            <div className={cx('content-two')}>
                <h2 className={cx('choose-title')}>
                    <span>Hoặc</span>
                </h2>
            </div>
            <div className={cx('content-three')}>
                <Button className={cx('box-type-three')} primary onClick={handlehideDialog}>
                    Tiếp tục với tư cách là khách
                </Button>
            </div>
            <div className={cx('group_function')}>
                <span>Bạn không có tài khoản?</span>
                <span onClick={() => handleAuthen(showcontrolregister("ContentRegister"))} className={cx('span_register')}>
                    Đăng ký
                </span>
            </div>
        </>
    );
}

export default ContentLogin;
