import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState,useEffect } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {}

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn,...passProps }) {

    const [history, setHistory] = useState([{ data: items }]);
    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        onChange(item.title);
                    }}
                />
            );
        });
    };

    const RenderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && 
                    <Header
                        title={current.title}
                        onClick={handleResetMenu}
                    />
                }
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )
    // Reset to First Page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0,1))
    }
    
    return (
        <Tippy
            {...passProps}
            interactive
            delay={[0, 300]}
            offset={[0,8]}
            hideOnClick={hideOnClick}
            placement="bottom-start"
            render={RenderResult}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
