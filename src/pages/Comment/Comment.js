import classNames from 'classnames/bind';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './Comment.module.scss';
import CommentItem from './CommentItem';
import { OffIcon } from 'components/Icons';
import Image from 'components/Image';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Videos from 'components/VideoItem/Videos';
import Button from 'components/Button';
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from 'react-redux';
import { showAuthendialog } from 'redux/actions';
import { AuthenDialogState$ } from 'redux/selectors';
import Login from 'pages/login';
const cx = classNames.bind(styles);

const socket = io('http://localhost:8096', {
    reconnection: true
});
function Comment() {
    const { id } = useParams();
    const [contentpost,setData] = useState([]);
    const [inputStr, setInputStr] = useState("");
    const [datacomment,setDatacomment] = useState([]);
    const [totalcomment,setDatatotalcomment] = useState(0);
    const [showPicker,setShowPicker] = useState(false);
    const [lscommentAdd,setAddcom] = useState([]);
    const [lscommentRem,setRemove] = useState([]);
    const [lscommentEdit,setEditcom] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const {isshow} = useSelector(AuthenDialogState$);
    //console.log(id);

    const iduser = Cookies.get('iduser');
    const dispatch = useDispatch();
   
    const replacestatusshowlogin = useCallback(() => {
        dispatch(showAuthendialog())
    },[dispatch])
    const fetchpostwithid = async () => {
        const {data} = await axios.post('http://localhost:8096/api/getPostwithid',{Id: id})
        setData(data.post);
    }
    const fetChcommentswithidpost = async () => {
        const {data} = await axios.post('http://localhost:8096/api/getDetailcomment',{IDpost: id})
        setDatacomment(data.data);
        setDatatotalcomment(data.data.length);
    }
    const handleInputFocus = () => {
        // Tắt textarea của comment đang chỉnh sửa khi input được focus
        setEditingCommentId(null);
    };
    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject.EmojiClickData);
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    
    const addcomment = async () => {
        const {data} = await axios.post('http://localhost:8096/api/createcomment',{
            idpost: id,
            comment: inputStr,
            iduser: Cookies.get('iduser')
        });
        setInputStr('');
    }
    
    const removeComment = async (idcomment) => {
        const {data} = await axios.post('http://localhost:8096/api/removecomment',{idcomment: idcomment,id:id});
    }
    useEffect(() => {
        fetchpostwithid();
        fetChcommentswithidpost();
    },[])
    useEffect(() => {
        socket.on('add-comment',(newltcm) => {
            setAddcom(newltcm);
            setDatatotalcomment(newltcm.length);
            setRemove('');
            setEditcom('');
        })
        socket.on('remove-com',(newltcm) => {
            console.log(newltcm);
            setRemove(newltcm);
            setDatatotalcomment(newltcm.length);
            setAddcom('');
            setEditcom('');
        })
        socket.on('edit-com',(newltcm) => {
            setEditcom(newltcm);
            setDatatotalcomment(newltcm.length);
            setRemove('');
            setAddcom('')
        })
    },[]);

    let uiComments = lscommentAdd.length > 0 ? lscommentAdd : lscommentRem.length > 0 ? lscommentRem : lscommentEdit.length > 0 ? lscommentEdit : datacomment
    return (
        <div className={cx('wrapper')}>
            {isshow && <Login />}
            <div className={cx('userpost')}>
                <Videos className={cx('stylevideo')} src={contentpost.MediaURL} />
                <Link to={"/"}>
                    <span className={cx('btn-closewrap')}>{<OffIcon className={cx('close-video')} width='1.8rem' height='1.8rem' />}
                    </span>
                </Link>
            </div>
            <div className={cx('Description_of_post')}>
                <div className={cx('Detail_description')}>
                    <div className={cx('Header_description')}>
                        <div className={cx('info_auther')}>
                            <Image src={contentpost.UserAvatar ||
                                'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D'}
                                alt={contentpost.UserFullName || contentpost.UserEmail}
                                className={cx('user-avatar')} />
                        </div>
                        <span className={cx('name-user')}>{contentpost.UserFullName ? contentpost.UserFullName : contentpost?.UserEmail?.split('@')[0] || ''}</span>
                        <Button small primary className={cx('btn-follow')}>Follow</Button>
                    </div>
                    <div className={cx('main_description')}>
                        <span className={cx('titlepost')}>
                            {contentpost.content}
                        </span>
                        <span className={cx('hashtappost')}>
                            {contentpost.hashtabvideo}
                        </span>
                    </div>
                    <div className={cx('footer_description')}>
                        <span className={cx('music_background')}>Nhạc nền -</span>
                        <span className={cx('name_music')}>{contentpost.Namemusicvideo}</span>
                    </div>
                </div>
                <div className={cx('Detail_another_info')}>
                    <span className={cx('total_comment')}>{"Bình luận (" + totalcomment + ")"}</span>
                    <span className={cx('another_info')}>Video khác</span>
                </div>
                <div className={cx('Detail_all_comments')}>
                    {totalcomment === 0 ? (
                        <div className={cx('wrapper_none_comment')}>
                            <span>
                                <Image src="/chat.png" className='img-nonecomment' />
                            </span>

                            <span className={cx('inform_comment')}>Không có comment</span>
                        </div>
                    ) : (
                        <div className={cx('wrapper_comment')}>
                            {uiComments.map((detailcomment, index) => (
                                <CommentItem
                                    comment={detailcomment}
                                    key={index}
                                    onRemove={removeComment}
                                    editingCommentId={editingCommentId}
                                    setEditingCommentId={setEditingCommentId}
                                    iduser={iduser} />
                            ))}
                        </div>
                    )}
                </div>
                <div className={cx('Footer')}>
                    <div className={cx('func_another')}>
                        {iduser ? (
                            <>
                                <div className={cx('parent_inp_comt')}>
                                    <input type="text" placeholder='Type content of your comment' className={cx('commenthere')} value={inputStr}
                                        onChange={(e) => setInputStr(e.target.value)}
                                        onFocus={handleInputFocus} />
                                    {showPicker && (
                                        <div
                                            style={{
                                                position: 'absolute', // Picker luôn cố định trên màn hình
                                                bottom: '50px', // Điều chỉnh khoảng cách từ đáy màn hình
                                                right: '0px', // Điều chỉnh khoảng cách từ trái màn hình (hoặc dùng right)
                                                zIndex: 10,
                                                // Đảm bảo Picker nằm trên cùng
                                            }}
                                        >
                                            <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                                        </div>
                                    )}
                                    <BsEmojiSmile className={cx('emoji_style')} onClick={() => setShowPicker((val) => !val)} />
                                </div>
                                {inputStr ? (
                                    <Button className={cx('btn-sendlight')} onClick={addcomment}>Send</Button>
                                ) : (
                                    <Button disabled>Send</Button>
                                )}

                            </>
                        ) : (
                            <div className={cx('wrapper_info_login')} onClick={replacestatusshowlogin}>
                                Đăng nhập để bình luận
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
