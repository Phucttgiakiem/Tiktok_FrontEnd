import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { useCallback, useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { LoginRegister$,Comebackpage$  } from "redux/selectors"
import { IoChevronBackSharp } from "react-icons/io5";
import ContentLogin from './Content/ContentLogin';
import ContentRegister from './Content/ContentRegister';
import DetailLogin from './Content/detailLogin';
import DetailRegister from './Content/detailRegister';
import ContentForgotPass from './Content/ContentForgotPass';
import { addhistory, removehistory,edithtmlcode } from 'redux/actions';
import Button from 'components/Button';

const cx = classNames.bind(styles);

function Login() {
    const {htmlcode} = useSelector(LoginRegister$);
    const {history} = useSelector(Comebackpage$);
    const dispatch = useDispatch();
    const renderComponent = (value) => {
        switch (value) {
            case "ContentLogin":
                return <ContentLogin />;
            case "ContentRegister":
                return <ContentRegister />;
            case "DetailLogin":
                return <DetailLogin />;
            case "DetailRegister":
                return <DetailRegister />;
            case "ContentForgotPass":
                return <ContentForgotPass />;
            default:
                return <ContentLogin />;
        }
    };
    useEffect(() => {
        if (htmlcode) {
            dispatch(addhistory(htmlcode)); // Thêm htmlcode vào lịch sử
            renderComponent(htmlcode);
        }
    }, [htmlcode, dispatch]);

    // Xử lý khi bấm nút back
    const handleBackClick = useCallback(()=>{
        if (history.length > 0) {
            dispatch(removehistory(htmlcode)); // Xóa lịch sử hiện 
            const previousHtmlCode = history[history.length - 2]; // Lấy phần tử trước đó
            dispatch(edithtmlcode(previousHtmlCode)); // Cập nhật htmlcode
        }
    },[history,htmlcode,dispatch]);
    return (
        <div className={cx('background-login')}>
            <div className={cx('dialog_login')}>
                <div className={cx('wrapper_comeback')} >
                    {history.length >= 1 
                        &&  
                        <Button onClick={() => handleBackClick()} className={cx('btn-comeback')}>
                            <IoChevronBackSharp />
                        </Button>
                    }
                </div>
                <div className={cx('wrapper')}>{renderComponent(htmlcode)}</div>
            </div>
        </div>
    );
}

export default Login;
