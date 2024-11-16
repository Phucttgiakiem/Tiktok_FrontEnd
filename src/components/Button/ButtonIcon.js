import classNames from 'classnames/bind';
import styles from './ButtonIcon.module.scss';

const cx = classNames.bind(styles);
function ButtonIcon({ children, rounded = false, Background = false, onClick, className, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx('wrapper', {
        [className]: className,
        rounded,
        Background,
    });
    return (
        <Comp className={classes} {...props}>
            <span className={cx('icon')}>{children}</span>
        </Comp>
    );
}

export default ButtonIcon;
