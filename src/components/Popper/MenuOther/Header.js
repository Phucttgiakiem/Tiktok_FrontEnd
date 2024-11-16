import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function Header({ title, handleResetMenu}) {
    return (
        <header className={cx('header')} onClick={handleResetMenu}>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
export default Header;