import classNames from 'classnames/bind';
import style from './ContentLogin.module.scss';
import Button from 'components/Button';
import UsePassToggle from './usePassToggle';
import { CheckIcon } from 'components/Icons';
import { AiOutlineLoading } from 'react-icons/ai';
import { useState, useEffect,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthenLogin, hideAuthendialog, showloadingdata, showtakepassacount } from 'redux/actions';
import { loginState$ } from 'redux/selectors';
const cx = classNames.bind(style);
function DetailLogin() {
    const [passwordInputType, ToggleIcon] = UsePassToggle();
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [isPassValid, setIsPassValid] = useState(false);
    const [isPassValidLength, setIsPassValidLength] = useState(false);
    const [isPassConform, setIsPassConform] = useState(false);
    const [isFocusPass, setIsForcusPass] = useState(false);
    //const [loading, setLoading] = useState(false);
    const [Data,setData] = useState({
        email: '',
        pass: '',
    })
    const {errCode,message} = useSelector(loginState$) || {};

    const dispatch = useDispatch();

    const handleAuthen = useCallback((actionCreate) => {
        dispatch(actionCreate);
    },[dispatch]);

    const validateEmail = () => {
        setVerifyEmail (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(Data.email),
        ));
    };
    const validateChecknotcharspecial = () => {
        setIsPassValid(/[^\u0000-\u00ff]|[\[\]\(\),.~`!<>+=:;"'" "|\\?]/u.test(Data.pass));
    };
    const validatepasswordLength = () => {
        setIsPassValidLength(/[\d|\D|^\u0000-\u00ff]{8,}/.test(Data.pass));
    };
    const validateconformpass = () => {
        setIsPassConform (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*]).+$/g.test(Data.pass));
    };
    const handleLogin = useCallback(() => {
            dispatch(showloadingdata());
            dispatch(AuthenLogin.AuthenLoginReset());
            dispatch(AuthenLogin.AuthenLoginRequest(Data));
         //   dispatch(hideAuthendialog());
            
    },[Data,dispatch]);
    
    useEffect(() => {
        validateEmail();
        validateChecknotcharspecial();
        validatepasswordLength();
        validateconformpass();
    }, [Data.email,Data.pass]);

    return (
            <div className={cx('content-bodyLogin')}>
                <h2 className={cx('login-title')}>Đăng nhập</h2>
                <div className={cx('content-email')}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setData({...Data,email: e.target.value})}
                        className={cx({ 'invalid-email': (Data.email !== '' && !verifyEmail) || errCode === 1 })}
                    />
                    {Data.email !== '' && !verifyEmail && <p>Email không đúng định dạng</p>}
                    {errCode === 1 && <p>{message}</p>}
                </div>
                <div className={cx('content-pass')}>
                    <div className={cx('paren-pass')}>
                        <input
                            type={passwordInputType}
                            placeholder="Password"
                            onFocus={() => setIsForcusPass(true)}
                            onBlur={() => setIsForcusPass(false)}
                            onChange={(e) => setData({...Data,pass: e.target.value})}
                            className={cx({ 'warning-pass': (Data.pass !== '' && isPassValid) || errCode === 3 })}
                        />
                        <span className={cx('password-toggle-icon')}>{ToggleIcon}</span>
                    </div>
                    {errCode === 3 && Data.pass !== '' && <p>{message}</p>}
                </div>
                {Data.pass !== '' && isFocusPass && (
                    <div className={cx('content-hidden')}>
                        {isPassValid && <p className={cx('error-pass')}>Mật khẩu chứa ký tự không hợp lệ</p>}
                        <p className={cx('inform-pass')}>Mật khẩu của bạn phải bao gồm:</p>
                        <div className={cx('hidden-one')}>
                            <CheckIcon className={cx({ 'config-icon': isPassValidLength })} />
                            <span className={cx({ 'invalid-pass': isPassValidLength })}>8 đến 20 ký tự</span>
                        </div>
                        <div className={cx('hidden-two')}>
                            <CheckIcon className={cx({ 'config-icon': isPassConform })} />
                            <span className={cx({ 'invalid-pass': isPassConform })}>
                                Các chữ cái, số và ký tự đặc biệt
                            </span>
                        </div>
                    </div>
                )}
                <div className={cx('forgot-pass')}>
                    <p onClick={() => handleAuthen(showtakepassacount("ContentForgotPass"))}>Quên mật khẩu</p>
                </div>
                <div className={cx('content-submit')}>
                    {Data.email !== '' &&
                    verifyEmail &&
                    Data.pass !== '' &&
                    isPassConform &&
                    isPassValidLength &&
                    !isPassValid ?    
                        (
                            <Button primary className={cx('btn-submit')} onClick={handleLogin}>
                                Đăng nhập
                            </Button>
                        )
                    : (
                        <Button basic disabled className={cx('btn-submit')}>
                            {'Đăng nhập'}
                        </Button>
                    )}
                </div>
            </div>
    );
}

export default DetailLogin;
