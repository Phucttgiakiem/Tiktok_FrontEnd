import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
const cx = classNames.bind(styles);

function AccountItem () {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
            <PopperWrapper>
                <AccountPreview/>
            </PopperWrapper>
        </div>
        )
    };
    return ( 
        <div>
            <Tippy
                interactive
                offset={[-20,0]}
                delay={[400,0]}
                placement="bottom"
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <img 
                    className={cx('avatar')}
                    src="https://files.fullstack.edu.vn/f8-prod/user_photos/390191/65dbf5490804b.jpg"
                    alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>quocnguyenphu</strong>
                            <FontAwesomeIcon className={cx('check')}  icon={faCheckCircle}/>
                        </p>
                        <p className={cx('name')}>Quốc Nguyễn Phú</p>
                    </div>
                </div>
            </Tippy>
        </div>
     );
}

// AccountItem.propTypes = {};
export default AccountItem;
