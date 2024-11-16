import classNames from 'classnames/bind';
import { CheckIcon } from 'components/Icons';
import Button from 'components/Button';
import UsePassToggle from './usePassToggle';
import style from './ContentForgotPass.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CodeAuthenemail$, Comebackpage$, ForgotPassState$, LoginRegister$} from 'redux/selectors';
import { CreateAuthencode, Forgotpass, showcontrollogin, showloadingdata } from 'redux/actions';
import Swal from 'sweetalert2';
const cx = classNames.bind(style);
function ContentForgotPass() {
    const [passwordInputType, ToggleIcon] = UsePassToggle();
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [inputcode, setInputcode] = useState('');
    const [verifycode, setVerifyCode] = useState(true);
    const [isPassValid, setIsPassValid] = useState(false);
    const [isPassValidLength, setIsPassValidLength] = useState(false);
    const [isPassConform, setIsPassConform] = useState(false);
    const [wrongemail, setWrongEmail] = useState(false);
    const [wrongpass, setWrongPass] = useState(false);
    const [Data,setData] = useState({
        email: '',
        pass: '',
    })
    const dispatch = useDispatch();

    const {data = {}} = useSelector(CodeAuthenemail$);
    
    let {errCode,message} = useSelector(ForgotPassState$) || {};

    const validateEmail = () => {
        setVerifyEmail (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(Data.email)
        ));
    };
    const validateChecknotcharspecial = () => {
        setIsPassValid(/[^\u0000-\u00ff]|[\[\]\(\),.~`!<>+=:;"'" "|\\?]/u.test(Data.pass));
    };
    const validatepasswordLength = () => {
        setIsPassValidLength(/[\d|\D|^\u0000-\u00ff]{8,}/.test(Data.pass));
    };
    const validateconformpass = () => {
        setIsPassConform(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*]).+$/.test(
                Data.pass
            ),
        );
    };
    
    const handlechangepass = useCallback(() => {
        dispatch(showloadingdata());
        dispatch(Forgotpass.ForgotpassReset());
        dispatch(Forgotpass.ForgotpassRequest(Data));
    },[Data,dispatch]);

    const handlecheckingcode = () => {
        if (inputcode !== data.info) {
            setVerifyCode(false);  // Mã code không khớp
        } else {
            setVerifyCode(true);   // Mã code khớp
        }
    };
    
    const handleanthenemail = useCallback(() => {
        dispatch(showloadingdata());
        dispatch(CreateAuthencode.createcodeRequest({email : Data.email, typeauthen: 'regainpass'}));
    },[Data,dispatch]);

    useEffect(() => {
        if(data.errCode && data.errCode != 0){
            setWrongEmail(true);
        }
    },[data])
    
    useEffect(() => {
        if(errCode != null){
            if(errCode !== 0){
                setWrongEmail(false);
                setWrongPass(true);
            }else {
                setWrongPass(false);
                dispatch(Forgotpass.ForgotpassReset());
                dispatch(showcontrollogin("DetailLogin"));
            }
        }
    },[errCode])

    useEffect(() => {
        validateEmail()
        validateChecknotcharspecial();
        validatepasswordLength();
        validateconformpass();
        handlecheckingcode();
        if(Data.email === '') {
            setWrongEmail(false);
        }
        if(Data.pass === '') {
            setWrongPass(false);
        }
    },[Data.email,Data.pass,inputcode])
    return (
        <div className={cx('content-bodyLogin')}>
            <h2 className={cx('login-title')}>Đặt lại mật khẩu</h2>
            <div className={cx('title-content-email')}>
                <p>Nhập địa chỉ email</p>
            </div>
            <div className={cx('content-email')}>
                <input
                    type="email"
                    placeholder="Địa chỉ Email"
                    onChange={(e) => setData({ ...Data, email: e.target.value })}
                    className={cx({ 'error-email': Data.email !== '' && (!verifyEmail || wrongemail) })} />
                {Data.email !== '' && !verifyEmail && <p>Email không đúng định dạng</p>}
                {Data.email !== '' && wrongemail && <p>Email không tồn tại</p>}
            </div>
            <div className={cx('content-code')}>
                <input
                    type="text"
                    placeholder="Nhập mã gồm sáu chữ số"
                    className={cx({ 'invalid-code': inputcode !== "" && !verifycode })}
                    onChange={(e) => setInputcode(e.target.value)} />
                {Data.email !== '' && verifyEmail ? (
                    <button type="button" onClick={handleanthenemail}>
                        Gửi mã
                    </button>
                ) : (
                    <button type="button" disabled>
                        Gửi mã
                    </button>
                )}
            </div>
            {inputcode !== '' && !verifycode && (
                <div className={cx('content-error-code')}>
                    <p>Mã code không khớp</p>
                </div>
            )}
            <div className={cx('content-pass')}>
                <div className={cx('paren-pass')}>
                    <input 
                        type={passwordInputType} 
                        placeholder="Password" 
                        onChange={(e) => setData({ ...Data, pass: e.target.value })}
                        className={cx({ 'invalid-pass': Data.pass !== "" && ( wrongpass || isPassValid || !isPassConform || !isPassValidLength)})}
                    />
                    <span className={cx('password-toggle-icon')}>{ToggleIcon}</span>
                </div>
            </div>
            {Data.pass !== '' && (
                <div className={cx('content-hidden')}>
                    {isPassValid && <p className={cx('error-pass')}>Mật khẩu chứa ký tự không hợp lệ</p>}
                    {wrongpass && <p className={cx('error-pass')}>Bạn đã sử dụng mật khẩu này</p>}
                    <p className={cx('inform-pass')}>Mật khẩu của bạn phải bao gồm:</p>
                    <div className={cx('hidden-one')}>
                        <CheckIcon className={cx({ 'config-icon': isPassValidLength })} />
                        <span className={cx({ 'invalid-pass': isPassValidLength })}>8 đến 20 ký tự</span>
                    </div>
                    <div className={cx('hidden-two')}>
                        <CheckIcon className={cx({ 'config-icon': isPassConform })} />
                        <span className={cx({ 'invalid-pass': isPassConform })}>Các chữ cái, số và ký tự đặc biệt</span>
                    </div>
                </div>
            )}
            <div className={cx('content-submit')}>
                {
                    Data.email !== '' &&
                    verifyEmail &&
                    Data.pass !== '' &&
                    isPassConform &&
                    isPassValidLength &&
                    !isPassValid &&
                    inputcode !== '' &&
                    verifycode ? (
                    <Button primary className={cx('btn-submit')} onClick={handlechangepass}>
                        {'Đăng nhập'}
                    </Button>
                ) : (
                    <Button basic disabled className={cx('btn-submit')}>
                        {'Đăng nhập'}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ContentForgotPass;
