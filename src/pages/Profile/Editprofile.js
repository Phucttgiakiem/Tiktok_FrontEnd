import classNames from 'classnames/bind';
import styles from './Editprofile.module.scss';
import Button from 'components/Button';
import Image from 'components/Image';
import { AiOutlineEdit } from "react-icons/ai";
import { useCallback, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { hideEditprofile } from 'redux/actions';
import { StatusEditprofile$ } from 'redux/selectors';
import { showloadingdata,hideloadingdata } from 'redux/actions';
import { useDispatch,useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Editprofile ({prop}) {
    const {Bio,fullName,id} = prop
    const {showEdit} = useSelector(StatusEditprofile$);
    const dispatch = useDispatch();
    const [dataprofile,setDataprofile] = useState({
        bio:Bio,
        fullName:fullName,
        id:id
    });

    const handleUnEditprofile = useCallback(() => {
        dispatch(hideEditprofile());
    },[dispatch])
    // Track the length of bio to show the character count
    const [bioCharCount, setBioCharCount] = useState(Bio ? Bio.length : 0);
    const maxBioLength = 80;

    const handleBioChange = (e) => {
        const bioValue = e.target.value;
        if (bioValue.length <= maxBioLength) {
            setDataprofile({ ...dataprofile, bio: bioValue });
            setBioCharCount(bioValue.length);
        }
    };
    
    const fetchupdateprofile = async () => {
        dispatch(showloadingdata());
        const {data} = await axios.post('http://localhost:8096/api/updateprofile',{
            fullname:dataprofile.fullName,
            bio:dataprofile.bio,
            iduser:dataprofile.id
        })
        dispatch(hideloadingdata());
        if(data.errCode !== 0){
            toast.error(`${data.message}`);
        }else {
            toast.success(`${data.message}`);
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }
    }

    return (
        <div className={cx('background_editprofile')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <span>Edit profile</span>
                </div>
                <div className={cx('main')}>
                    <div className={cx('wrapper-profilephoto')}>
                        <div>
                            <h3>Profile photo</h3>
                        </div>
                        <div>
                            <Image src="" className={cx('avatar-edit')}/>
                            <button className={cx('btn-edit')}>
                                <AiOutlineEdit />
                            </button>
                                
                            
                        </div>
                    </div>
                    <div className={cx('wrapper-username')}>
                        <div>
                            <h3>Username</h3>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                value={dataprofile.fullName? `${dataprofile.fullName}`:"" } 
                                placeholder='Type your username in field'
                                onChange={(e) => setDataprofile({...dataprofile,fullName:e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={cx('wrapper-name')}>
                        <div>
                            <h3>Name</h3>
                        </div>
                        <div>
                            <input type="text" placeholder='Type your name in field'/>
                        </div>
                    </div>
                    <div className={cx('wrapper-Bio')}>
                        <div>
                            <h3>Bio</h3>
                        </div>
                        <div>
                            <textarea 
                                placeholder='Bio' 
                                value={dataprofile.bio? `${dataprofile.bio}`:""}
                                onChange={handleBioChange}
                                maxLength={maxBioLength}
                            />
                            <span>{bioCharCount}/{maxBioLength}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-footer')}>
                    <Button basic onClick={handleUnEditprofile}>Cancel</Button>
                    {
                        dataprofile.bio && dataprofile.fullName ? (
                            <Button primary onClick={() => fetchupdateprofile()}>Save</Button>
                        ) :(
                            <Button disabled basic>Save</Button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default Editprofile;