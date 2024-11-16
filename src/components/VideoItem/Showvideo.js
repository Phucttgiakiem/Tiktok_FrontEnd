import classNames from 'classnames/bind';
import { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faMusic } from '@fortawesome/free-solid-svg-icons';
import Videos from './Videos';
import ButtonIcon from 'components/Button/ButtonIcon';
import styles from './Showvideo.module.scss';
import Image from 'components/Image';
import Button from 'components/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAuthendialog} from 'redux/actions';
const cx = classNames.bind(styles);
function Showvideo({ prop,user}) {
    const id = prop.idpost
    console.log(prop);
    const dispatch = useDispatch();
   
    const replacestatusshowlogin = useCallback(() => {
        dispatch(showAuthendialog())
    },[dispatch])
    
    const addlike = async () => {
        if(user.id === undefined){
            replacestatusshowlogin()
        }else{
            try {
                const {data} = await axios.post('http://localhost:8096/api/createLikepost',{
                    iduser: user.id,
                    idpost: prop.idpost,
                })
            } catch(err){
                console.log(err.response.data.error);
            }
        }
    }

    const removelike = async () => {
        if(user.id === undefined){
            replacestatusshowlogin()
        }else{
            try {
                
                const {data} = await axios.post('http://localhost:8096/api/removeLikepost',{
                    iduser : user.id,
                    idpost: prop.idpost
                })
            } catch (err){
                console.log(err.response.data.error);
            }
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('AuthorContentWrapper')}>
                <div className={cx('Avatar-container')}>
                    <a href={`/profile/${prop.userinfo.id}`} className={cx('AvatarLink')}>
                        <Image
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D"
                            alt="Nguyen Van A"
                            className={cx('user-avatar')}
                        />
                    </a>
                </div>
                <div className={cx('postinfo-container')}>
                    <div className={cx('Main-ContentWrapper')}>
                        {prop.userinfo.fullName ? (
                            <span className={cx('span-text')}>{prop.userinfo.fullName}</span>
                        ) : (
                            <span className={cx('span-text')}>{prop.userinfo.email}</span>
                        )}
                        {/* <span className={cx('span-text')}>{Titlepost}</span> */}
                        <div className={cx('maincontain-wrapper')}>
                            <p>{prop.content}</p>
                        </div>
                    </div>
                    <div className={cx('Final-MainWrapper')}>
                        <FontAwesomeIcon icon={faMusic} className={cx('music-note')} />
                        <span className={cx('span-text-music')}>{prop.namemusicvideo}</span>
                    </div>
                </div>
                {/* <span className={cx('author-title')}>{Titleuser}</span> */}
                <div className={cx('follow-container')}>
                    <Button outline small>
                        Follow
                    </Button>
                </div>
            </div>

            <div className={cx('Actionvideowrapper')}>
                <div className={cx('video-container')}>
                    <Videos className={cx('video-itemone')} src={prop.mediaURL} />
                </div>
                <div className={cx('ActionContainer')}>
                        {
                           prop.iduserlike.some(users => users.UserID === user.id) ?  
                                (
                                    <div className={cx('likeaction')} onClick={removelike}>
                                        <ButtonIcon rounded className={cx('btnlike')}>
                                            {<FontAwesomeIcon icon={faHeart} className={cx('likevideo')} />}
                                        </ButtonIcon>
                                        <h4 className={cx('alllike')}>{prop.alllike}</h4>
                                    </div> 
                                ) : 
                                (
                                    <div className={cx('likeaction')} onClick={addlike}>
                                        <ButtonIcon rounded className={cx('btnlike')}>
                                            {<FontAwesomeIcon icon={faHeart} />}
                                        </ButtonIcon>
                                        <h4 className={cx('alllike')}>{prop.alllike}</h4>
                                    </div> 
                                )
                        }
                   <Link to={`/Comment/${id}`}>
                        <div className={cx('commentaction')}>
                            <ButtonIcon rounded className={cx('btncomment')}>
                                {<FontAwesomeIcon icon={faCommentDots} />}
                            </ButtonIcon>
                            <h4 className={cx('allcomment')}>{prop.allcomment}</h4>
                        </div>
                   </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Showvideo);
