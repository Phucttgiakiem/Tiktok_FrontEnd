import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState} from 'react';
import axios from 'axios';
import styles from './Editpost.module.scss';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';
import Button from 'components/Button';
const cx = classNames.bind(styles);


function Editpost() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
   
    const [datapost,setDatapost] = useState({
        description: queryParams.get('des'),
        namemusicvideo: queryParams.get('nameus'),
        idpost : queryParams.get('id'),
    })
    const handleDestroycreatepost = () => {
        setDatapost({
            description: "",
            namemusicvideo: "",
            idpost: "",
        })
        setTimeout(()=> {
            window.location.replace('/mypost');
        },3000);
    }
    const handlecreatepost = async () => {
        if(!datapost.idpost || !datapost.description || !datapost.namemusicvideo){
            toast.error("all fields cannot be empty!!!");
        }
        else {
            try {
                const {data} = await axios.post('http://localhost:8096/api/updatepost',datapost);
                if(data.errCode !== 0) {
                    toast.error(`${data.message}`);
                } else {
                    toast.success(`${data.message}`);
                    
                    // Reset all fields and state after successful post creation
                    setDatapost({
                        description: "",
                        namemusicvideo: "",
                        idpost: "",
                    });
                    setTimeout(() => {
                        window.location.replace('/mypost');
                    },6000)
                }
            } catch (error) {
                console.error('Error uploading data:', error);
            }
        }
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper_description')}>
                <textarea className={cx('description')} placeholder="Nhập nội dung mô tả mới của video !!!" 
                    onChange={(e) => setDatapost({...datapost,description:e.target.value})}
                    value={datapost.description}
                />
            </div>
            <div className={cx('wrapper_namemusic')}>
                <input type="text" placeholder="Nhập tên bài hát mới"
                    onChange={(e) => setDatapost({...datapost,namemusicvideo: e.target.value})}
                    value={datapost.namemusicvideo}
                />
            </div>
            <div className={cx('wrapper_post')}>
                {
                    !datapost.description.trim()
                    || !datapost.namemusicvideo.trim() ? 
                    (<Button basic disabled className={cx('btn-post')} onClick={() => handlecreatepost()}>Cập nhật</Button>):
                    (<Button primary className={cx('btn-post')} onClick={() => handlecreatepost()}>Cập nhật</Button>) 
                }
                
                <Button basic className={cx('btn-remove')} onClick={() => handleDestroycreatepost()}>Hủy</Button>
            </div>
        </div>
    );
}


export default Editpost;