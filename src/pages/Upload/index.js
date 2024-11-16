import classNames from 'classnames/bind';
import { useState,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './Upload.module.scss';
import { useRef } from 'react';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';
import Button from 'components/Button';
import { showloadingdata,hideloadingdata } from 'redux/actions';
const cx = classNames.bind(styles);


function Upload() {
    const [file, setFile] = useState(null);
    const fileNameDisplayRef = useRef(null);
    const informVideoSpanRef = useRef(null);
    const videoPlayerRef = useRef(null);
    const inputfileRef = useRef(null);
    const dispatch = useDispatch();
    const [datapost,setDatapost] = useState({
        description: "",
        pathvideo: "",
        namemusicvideo: "",
        iduser : Cookies.get('iduser')? Cookies.get('iduser') : "",
    })

    const cancalUpload = () => {
        setDatapost({
            description: "",
            pathvideo: "",
            namemusicvideo: "",
            iduser: Cookies.get('iduser') ? Cookies.get('iduser') : "",
        });
        setFile(null); // Reset file state
        fileNameDisplayRef.current.value = "";
        inputfileRef.current.value = "";
        videoPlayerRef.current.style.display = "none";
        informVideoSpanRef.current.style.display = "block";
    }
    const updateFileName = (event) => {
        const input = event.target;
        const selectedFile = input.files[0];
        
        if ( selectedFile && selectedFile.type.startsWith("video/")) {
            setFile(selectedFile);
            // Hiển thị tên tệp
            if (fileNameDisplayRef.current) {
                setDatapost({...datapost,pathvideo: selectedFile.name});
            }

            // Tạo URL tạm thời cho video và hiển thị nó trong trình phát video
            const videoURL = URL.createObjectURL(selectedFile);
            if (informVideoSpanRef.current) {
                informVideoSpanRef.current.style.display = "none";
            }
            if (videoPlayerRef.current) {
                videoPlayerRef.current.src = videoURL;
                videoPlayerRef.current.style.display = "block";
            }
        } else {
            // Xóa tên tệp và ẩn video player nếu không phải video
            if (fileNameDisplayRef.current) {
                setDatapost({...datapost,description:""});
                fileNameDisplayRef.current.value = "";
            }
            if (informVideoSpanRef.current) {
                informVideoSpanRef.current.style.display = "block";
            }
            if (videoPlayerRef.current) {
                videoPlayerRef.current.style.display = "none";
                videoPlayerRef.current.src = "";
            }
            toast.error('Vui lòng chọn đúng loại tệp video');
            input.value = "";
        }
    }
    const handlecreatepost = useCallback (async () => {
        if(!datapost.iduser || !datapost.description || !datapost.namemusicvideo || !file){
            toast.error("all fields cannot be empty!!!");
        }
        else {
            dispatch(showloadingdata());
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(datapost));
            try {
            
                const {data} = await axios.post('http://localhost:8096/api/createpost', formData);
                if(data.errCode === 1) {
                    toast.error(`${data.message}`);
                } else {
                    toast.success(`${data.message}`);
                    
                    // Reset all fields and state after successful post creation
                    setDatapost({
                        description: "",
                        pathvideo: "",
                        namemusicvideo: "",
                        iduser: Cookies.get('iduser') ? Cookies.get('iduser') : "",
                    });
                    setFile(null); // Reset file state
    
                    // Reset file input
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) {
                        fileInput.value = ""; // Reset the file input
                    }
    
                    // Hide video player
                    if (videoPlayerRef.current) {
                        videoPlayerRef.current.src = "";
                        videoPlayerRef.current.style.display = "none"; // Hide the video player
                    }
                    if (informVideoSpanRef.current) {
                        informVideoSpanRef.current.style.display = "block"; // Show the info span
                    }
                    if (fileNameDisplayRef.current) {
                        fileNameDisplayRef.current.value = ""; // Clear file name display
                    }
                }
            } catch (error) {
                console.error('Error uploading file and data:', error);
            }finally {
                // Ensure loading is hidden after request completes, success or failure
                dispatch(hideloadingdata());
                setTimeout(()=> {
                    window.location.replace("/mypost");
                },6000)
            }

        }
    },[dispatch,file,datapost])
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper_description')}>
                <textarea className={cx('description')} placeholder="Nhập nội dung mô tả video !!!" 
                    onChange={(e) => setDatapost({...datapost,description:e.target.value})}
                    value={datapost.description}
                />
            </div>
            <div className={cx('wrapper_namemusic')}>
                <input type="text" placeholder="Nhập tên bài hát"
                    onChange={(e) => setDatapost({...datapost,namemusicvideo: e.target.value})}
                    value={datapost.namemusicvideo}
                />
            </div>
            <div className={cx('wrapper_file')}>
                <div className={cx('parent_inputfile')}>
                    <input 
                        type="file" 
                        id="fileInput"
                        ref={inputfileRef} 
                        className={cx("custom-file-input")} 
                        onChange={(e) => updateFileName(e)} 
                        accept="video/*"
                        
                    />
                    <label htmlFor="fileInput" className={cx("custom-file-label")}>Tải tệp lên</label>
                    <input 
                        type="text" 
                        id="fileNameDisplay" 
                        className={cx("file-name-display")} 
                        ref={fileNameDisplayRef}
                        readOnly 
                        placeholder="Tên tệp sẽ hiển thị ở đây"
                        value={datapost.pathvideo}
                    />
                </div>
            </div>
            <div className={cx('wrapper_video')}>
                <span ref={informVideoSpanRef} className={cx('inform-video')}>
                    Video sẽ được hiển thị ở đây
                </span>
                <video ref={videoPlayerRef} id="videoPlayer" width="400" controls>
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
            </div>
            <div className={cx('wrapper_post')}>
                {
                     !datapost.description.trim() 
                     || !datapost.pathvideo.trim()
                     || !datapost.namemusicvideo.trim() ?
                   (<Button basic disabled className={cx('btn-post')} onClick={() => handlecreatepost()}>Đăng bài</Button>) :
                   (<Button primary className={cx('btn-post')} onClick={() => handlecreatepost()}>Đăng bài</Button>)
                }
                <Button basic className={cx('btn-remove')} onClick={() => cancalUpload()}>Hủy</Button>
            </div>
        </div>
    );
}


export default Upload;