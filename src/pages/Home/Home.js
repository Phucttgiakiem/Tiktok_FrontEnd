import classNames from 'classnames/bind';
import { useState, useEffect,memo, useCallback } from 'react';
import axios from 'axios';
import Showvideo from 'components/VideoItem/Showvideo';
import Comment from 'pages/Comment/Comment';
import Login from 'pages/login/Login';
import styles from './Home.module.scss';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllpostState$, loginState$ } from 'redux/selectors';
import { GetAllpost } from 'redux/actions';
const cx = classNames.bind(styles);

const socket = io('http://localhost:8096', {
    reconnection: true
});

function Home() {
    const [datapost, setDatapost] = useState([]);
   /*  const [showComment, setShowComment] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showLogin, setShowLogin] = useState(false); */
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);

   /*  const dispatch = useDispatch();

    const userFromState = useSelector(loginState$);  // Lấy user từ Redux store */
    
    const userFromCookies = {
        email: Cookies.get('useremail'),
        avatar: Cookies.get('avatar'),
        fullName: Cookies.get('username'),
        id: Cookies.get('iduser'),
    };  // Lấy user từ cookies
    
    const user = userFromCookies;   

    const showPost = async (user) => {
        try {
            const {data} = await axios.post("http://localhost:8096/api/getPost",{ Iduser: user.id || null});
            setDatapost(data.post);
        }catch(err){
            console.log(err);
        }
    }

    

   /*  const handleShowComment = (post) => {
        const iduser = Cookies.get('iduser');
        if (iduser !== undefined) {
            setSelectedPost(post);
            setShowComment(true);
        } else {
            setShowLogin(true);
        }
    }; */
    /* const totalcom = async (idpost) => {
        await axios
            .post('http://localhost:8096/api/getTotalcomment', {
                IDpost: idpost,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleCloseComment = () => {
        setShowComment(false);
        setSelectedPost(null);
    }; */
    
    useEffect(() => {
       // socket.connect();
        socket.on('add-like', (newpost) => {
            console.log("newlike: ",newpost)
            setPostAddLike(newpost);  // Cập nhật nếu cần
            setPostRemoveLike('');  // Reset remove-like nếu cần
        });
        socket.on('remove-like', (newpost) => {
            console.log("removelike: ",newpost)
            setPostRemoveLike(newpost);
            setPostAddLike('');
        });
    }, []);
    useEffect(() => {
        showPost(user);
    }, []);
    let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : datapost;
    
    return (
        <div className={cx('home')}>
            {   
                uiPosts.length > 0 ? (
                    uiPosts.map((post,index) => (
                        <Showvideo
                            key={index}
                            prop={post}
                            user={user}
                        />   
                    ))
                ):
                (
                    <p>Không tìm thấy bài đăng</p>
                )
                
            }
        </div>
            
    );
}
export default memo(Home);
