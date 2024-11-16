import React, { useState,memo,useEffect,useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import Image from 'components/Image';
import { DotIcon,DeleteIcon } from 'components/Icons';
import Tippy from '@tippyjs/react/headless';
import Cookies from 'js-cookie';
import { TbEdit } from "react-icons/tb";
import axios from 'axios';
import { BsEmojiSmile } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaRegFlag } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Picker from "emoji-picker-react";
const cx = classNames.bind(styles);

function CommentItem({ comment,editingCommentId, setEditingCommentId,onRemove,iduser}) {
    const [detailComment, setDetailComment] = useState(comment.Detailcomment || '');
    const { id } = useParams();
    const [showPicker,setShowPicker] = useState(false);
    const isEditcomment = editingCommentId === comment.id;

    const handleEditClick = () => {
        // Chỉ cho phép chỉnh sửa nếu comment này chưa được chọn hoặc đang chỉnh sửa một comment khác
        setEditingCommentId(isEditcomment ? null : comment.id);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null); // Hủy chế độ chỉnh sửa
    };
    const handleEditcomment = async () => {
        const {data} = await axios.post('http://localhost:8096/api/editcomment',{
            id: id,
            idcomment: comment.id,
            newcomment: detailComment
        });
        console.log(data);
        handleCancelEdit();
    }
    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject.EmojiClickData);
        setDetailComment((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    
    const renderminifunction = () => {
        return (
            iduser === comment.idUser ? (
                <div className={cx('wrapper-dedot')}>
                    <div className={cx('wrapper-decom')} onClick={() => onRemove(comment.id)}>
                        <span className={cx('icon')}>
                            <DeleteIcon width='1.8rem' height='1.8rem' className={cx('style-icon')} />
                        </span>
                        <span className={cx('title-btn')} >Xóa bình luận</span>
                    </div>
                    <div className={cx('wrapper-decom')} onClick={() => handleEditClick()}>
                        <span className={cx('icon-edit')}>
                            <TbEdit />
                        </span>
                        <span className={cx('title-btn')}>Sửa bài viết</span>
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper-dedot')}>
                    <div className={cx('wrapper-decom')}>
                        <span className={cx('icon-info')}>
                            <FaRegFlag />
                        </span>
                        <span className={cx('title-btn')} >Báo cáo</span>
                    </div>
                </div>
            )
        )
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <Image
                    src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/03b6c4d4e9a3beb2a73ed5da264d9e9a.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&x-expires=1709859600&x-signature=U%2FNJ0pxNN5Q4UgG68KMndvBDstg%3D"
                    alt="Nguyen Van A"
                    className={cx('user-avatar')}
                />
            </div>
            <div className={cx('main-container')}>
                <h3 className={cx('user-title')}>{comment.Email.split('@')[0] || 'Anonymous'}</h3>
                {
                    isEditcomment ? (
                        <div className={cx('parent_wrapper')}>
                            <textarea
                                value={detailComment}
                                onChange={(e) => setDetailComment(e.target.value)}
                                placeholder="Nội dung trống, vui lòng nhập bình luận..."
                                className={cx("newcomment-edit")}
                            />
                            {
                                    showPicker && (
                                        <div
                                        style={{
                                            position: 'absolute',   // Picker luôn cố định trên màn hình
                                            top:'30px',      // Điều chỉnh khoảng cách từ đáy màn hình
                                            left:'0',         // Điều chỉnh khoảng cách từ trái màn hình (hoặc dùng right)
                                            zIndex: 12,
                                                    // Đảm bảo Picker nằm trên cùng
                                        }}
                                        >
                                            <Picker pickerStyle={{ width: "50%", height:'25rem' }} onEmojiClick={onEmojiClick} />
                                        </div>
                                    )
                            }
                            <BsEmojiSmile  className={cx('emoji_style')} onClick={() => setShowPicker((val) => !val)}/>
                            {
                                detailComment ? (<RiSendPlaneLine className={cx('send_style')} onClick={() => handleEditcomment()}/>) :
                                (
                                    <RiSendPlaneLine className={cx('send_style')} disabled/>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            <p className={cx('comment')}>{comment.Detailcomment}</p>
                            <h3 className={cx('timecreate')}>{comment.UpdatedAt}</h3>
                            <Tippy
                                interactive
                                offset={[-20,-24]}
                                delay={[0,30]}
                                placement="bottom-start"
                                render={() => renderminifunction()}
                            >
                                <span
                                    className={cx('dot-wrapper')}
                                >
                                    <DotIcon className={cx('dot-icon')} width='1.6rem' height='1.6rem' />
                                </span>
                            </Tippy>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default CommentItem;
