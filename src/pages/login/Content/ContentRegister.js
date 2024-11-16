import classNames from 'classnames/bind';
import styles from '../login.module.scss';
import { UserIcon } from '~/components/Icons';
import Button from 'components/Button';
import { useCallback } from 'react';
import { useDispatch} from 'react-redux';
import { showcontrollogin,showDetailregisterwithemail,hideAuthendialog } from 'redux/actions';
const cx = classNames.bind(styles);
function ContentRegister() {
    
    const dispatch = useDispatch();
    
    const handleAuthen = useCallback((actionCreate) => {
        dispatch(actionCreate);
    },[dispatch]);
    const handlehideDialog = useCallback(() => {
        dispatch(hideAuthendialog())
    },[dispatch])
    return (
        <>
            <h2 className={cx('login-title')}>Đăng ký TikTok</h2>
            <div className={cx('content-one')}>
                <Button
                    className={cx('box-type-one')}
                    leftIcon={<UserIcon />}
                    onClick={() => handleAuthen(showDetailregisterwithemail("DetailRegister"))}
                >
                    Sử dụng email
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
                <span>Bạn đã có tài khoản?</span>
                <span onClick={() => handleAuthen(showcontrollogin("ContentLogin"))} className={cx('span_login')}>
                    Đăng nhập
                </span>
            </div>
        </>
    );
}

export default ContentRegister;
