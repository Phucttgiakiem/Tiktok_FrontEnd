import classNames from 'classnames/bind';
import {useCallback, useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { StatusEditprofile$ } from 'redux/selectors';
import styles from './Profile.module.scss'
import Button from 'components/Button';
import Image from 'components/Image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link,useParams } from 'react-router-dom';
import {GridVideo,LikeVideo,NoneVideo} from '~/components/Icons';
import { showEditprofile } from 'redux/actions';
import Editprofile from './Editprofile';
const cx = classNames.bind(styles);
function Profile() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Videos');
    const [datauser,setDatauser] = useState({});
    const [totallike,setTotallike] = useState(0);
    const [datavideoowner,setDatavideoowner] = useState([]);
    const [datavideolike,setDatavideolike] = useState([]);
    const iduser = Cookies.get('iduser');
    const {showEdit} = useSelector(StatusEditprofile$);
    const dispatch = useDispatch();
    const handlechangeEditprofile = useCallback(() => {
        dispatch(showEditprofile());
    },[dispatch])
    useEffect(() => {
        const fetchProfile = async() => {
            const {data} = await axios.post('http://localhost:8096/api/Profileuser',{id:id});
            if(data.errCode === 1){
                window.location.replace('/');
            }
            setDatauser(data.profileuser.profile);
            setTotallike(data.profileuser.totallike);
            setDatavideolike(data.profileuser.videolike);
            setDatavideoowner(data.profileuser.videoowner);
        }
        fetchProfile()
    },[])
    let datavideo = activeTab === 'Videos' ? datavideoowner : datavideolike
    return (
        <>
            {showEdit && <Editprofile prop={datauser}/>}
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('avatar')}>
                        <Image className={cx('user-avatar')} src={"https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D"} alt="avatar user"/>
                    </div>
                    <div className={cx('title')}>
                        <div className={cx('userIdentifier')}>
                            <h1>
                                {datauser && datauser.fullName ? datauser.fullName : datauser?.email}
                            </h1>
                        </div>
                        {
                            iduser == datauser.id && (
                                <div className={cx('btnpanel')}>
                                    <Button primary onClick={() => handlechangeEditprofile()}>Edit profile</Button>
                                </div>
                            )
                        }
                        
                        <div className={cx('CountInfo')}>
                            <div className={cx('Info-one')}>
                                <strong>0</strong>
                                <span>Followers</span>
                            </div>
                            <div className={cx('Info-two')}>
                                <strong>{totallike}</strong>
                                <span>Likes</span>
                            </div>
                        </div>
                        <div className={cx('Bio')}>
                            <p>{datauser.Bio}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('main')}>
                    <div className={cx('FeedTabwrapper')}>
                        <div
                            onClick={() => setActiveTab('Videos')}
                            className={cx({ active: activeTab === 'Videos' })}
                        >
                            <GridVideo className={cx('icon-feed')}/>
                            <span>Videos</span>
                        </div>
                        <div
                            onClick={() => setActiveTab('Liked')}
                            className={cx({ active: activeTab === 'Liked' })}
                        >
                            <LikeVideo className={cx('icon-feed')}/>
                            <span>
                                Liked
                            </span>
                        </div>
                    </div>
                    <div className={cx('maindetailwrapper')}>
                        {
                            datavideo.length > 0 ? (
                                datavideo.map((item,index) => (
                                    <Link to={`/Comment/${item.id}`} key={index} >
                                        <div 
                                            style={{width:"240px",height:"400px"}} 
                                            
                                            className={cx('wrapper-videoitem')}
                                            onMouseEnter={(e) => {
                                                const video = e.currentTarget.querySelector("video");
                                                video.play();
                                                video.muted = true;
                                                video.currentTime = 0;
                                            }}
                                            onMouseLeave={(e) => {
                                                const video = e.currentTarget.querySelector("video");
                                                video.pause();
                                            }}
                                        >
                                            <video className={cx('video-style')} muted>
                                                <source src={item.MediaURL}/>
                                            </video>
                                        </div>
                                    </Link>
                                        
                                ))
                            ) : (
                                <div className={cx('diverrorContainer')}>
                                    <div className={cx('diverrorIconwrapper')}>
                                        <NoneVideo/>
                                    </div>
                                    <p>Upload your first video</p>
                                    <p>Your videos will appear here</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;