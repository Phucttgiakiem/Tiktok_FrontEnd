import classNames from 'classnames/bind';
import styles from './ContentRegister.module.scss';
import { CheckIcon, WarningIcon } from '~/components/Icons';
import { useState, useEffect, useCallback } from 'react';
import usePassToggle from './usePassToggle';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAccount, CreateAuthencode, showDetailloginwithemail, showloadingdata } from 'redux/actions';
import { CodeAuthenemail$, RegisterState$ } from 'redux/selectors';
import Swal from 'sweetalert2';
const cx = classNames.bind(styles);
function DetailRegister() {
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [wrongemail, setWrongEmail] = useState(false);
    const [isPassValid, setIsPassValid] = useState(false);
    const [isPassValidLength, setIsPassValidLength] = useState(false);
    const [isPassConform, setIsPassConform] = useState(false);
    const [passwordInputType, ToggleIcon] = usePassToggle();
    // create content button push code animation
    const [remainingTime, setRemainingTime] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    const [inputcode,setInputcode] = useState('');
    // inform from server with error of field
    const [duplicatepass,setDuplipass] = useState(false);
    const [Data,setData] = useState({
        date_of_birth : '',
        email: '',
        pass: ''
    })

    const dispatch = useDispatch();

    const {data = {}} = useSelector(CodeAuthenemail$);

    const {result = {}} = useSelector(RegisterState$);

    const validateEmail = () => {
        setIsEmailValid(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
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
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*]).+$/g.test(
                Data.pass,
            ),
        );
    };
    
    // const handlerrorinform = (info) => {
    //     Swal.fire({
    //         icon: "error",
    //         text: `${info}`
    //     })
    // } 
    // const handlesuccessinform = (info) => {
    //     Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: `${info}`,
    //         showConfirmButton: false,
    //         timer: 1500
    //     });
    // }
    const handleValidEmail = useCallback(() => {
        dispatch(showloadingdata());
        dispatch(CreateAuthencode.createcodeRequest({email: Data.email,typeauthen:'existemailindatabase'}))
    },[Data.email,dispatch])

    const handleRegisteraccount = useCallback(() => {
        dispatch(showloadingdata());
        dispatch(CreateAccount.createaccountRequest({email: Data.email,password: Data.pass,dateofbirth: Data.date_of_birth}));
    },[Data,dispatch]);

    useEffect(() => {
        if(result&& result.errCode !== undefined){
           if ( result.errCode !== 0){
                setDuplipass(true);
           }
           else {
                dispatch(CreateAccount.createaccountReset());
                dispatch(showDetailloginwithemail('DetailLogin'));
           }
        }
    },[result])
    useEffect(() => {
        if(data.errCode && data.errCode !== 0){
            setWrongEmail(true);
        }
    },[data])
    useEffect(() => {
        validateEmail();
        validateChecknotcharspecial();
        validatepasswordLength();
        validateconformpass();
        if(Data.email === ''){
            setWrongEmail(false);
        }
    },[Data.pass,Data.email])
    
    return (
        <div className={cx('content-bodyRegis')}>
            <h2 className={cx('login-title')}>Đăng ký</h2>
            <div className={cx('content-one')}>
                <div className={cx('title-dateofbirth')}>
                    <h3>Ngày sinh của bạn là ngày nào?</h3>
                </div>
                <div className={cx('detail-dateofbirth')}>
                    <input type="date" onChange={(e) => setData({...Data,date_of_birth:e.target.value})} />
                </div>
            </div>
            <div className={cx('date-guide')}>
                <p>Ngày sinh của bạn sẽ không được hiển thị công khai</p>
            </div>
            <div className={cx('content-email')}>
                <input
                    onChange={(e) => setData({...Data,email: e.target.value})}
                    type="email"
                    placeholder="Địa chỉ email"
                    className={cx({ 'invalid-email': Data.email !== '' && (!isEmailValid || wrongemail)})}
                />
                {Data.email !== '' && (
                    <>
                        {!isEmailValid && (
                            <><WarningIcon className={cx('warning-icon')} /><p>Email không đúng định dạng</p></>
                        )}
                        {wrongemail && <p>{data.message}</p>}
                    </>
                )}
            </div>
            <div className={cx('content-pass')}>
                <input
                    type={passwordInputType}
                    placeholder="Mật khẩu"
                    onChange={(e) => setData({...Data,pass:e.target.value})}
                    className={cx({ 'invalid-pass': Data.pass !== '' && (isPassValid || duplicatepass)})}
                />
                {Data.pass !== '' && ( isPassValid || duplicatepass ) && <WarningIcon className={cx('warning-icon')} />}
                <span className={cx('password-toggle-icon')}>{ToggleIcon}</span>
            </div>
            {Data.pass !== '' && (
                <div className={cx('content-hidden')}>
                    {isPassValid && (<>
                        <p className={cx('error-pass')}>Mật khẩu chứa ký tự không hợp lệ</p>
                    </>)}
                    {duplicatepass && <p className={cx('error-pass')}>{result.message}</p>}
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
            <div className={cx('content-code')}>
                <input
                    type="text"
                    placeholder="Nhập mã gồm sáu chữ số"
                    onChange={(e) => setInputcode(e.target.value)}
                    className={cx({ 'invalid-code':inputcode !== '' && inputcode !== data.info })}
                />
                {data.info && inputcode !== '' && inputcode !== data.info && <WarningIcon className={cx('warning-icon')} />}
                {isEmailValid ? (
                    <button type="button" disabled={!isButtonEnabled} onClick={handleValidEmail}>
                        {remainingTime > 0 ? `Đợi ${remainingTime} giây` : 'Gửi mã'}
                    </button>
                ) : (
                    <button type="button" disabled>
                        Gửi mã
                    </button>
                )}
            </div>
            {data.info && inputcode !== '' && inputcode !== data.info && (
                <div className={cx('content-error-code')}>
                    <p>Mã code không khớp</p>
                </div>
            )}
            <div className={cx('content-accuracy')}>
                <label className={cx('custom-checkbox')}>
                    <input type="checkbox" />
                    <span className={cx('checkbox-icon')}></span>
                </label>
                <p>
                    Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài khoản được gửi đến
                    email của bạn
                </p>
            </div>
            <div className={cx('content-submitRegis')}>
                {
                    Data.date_of_birth !== '' &&
                    Data.email !== '' &&
                    isEmailValid &&
                    Data.pass !== '' &&
                    isPassConform &&
                    isPassValidLength &&
                    !isPassValid &&
                    inputcode === data.info
                    ? 
                (
                    <Button primary className={cx('btn-submit')} onClick={handleRegisteraccount}>
                        {'Tiếp'}
                    </Button>
                ) : (
                    <Button basic disabled className={cx('btn-submit')}>
                        {'Tiếp'}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default DetailRegister;
