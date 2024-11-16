import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from 'components/Button';
import styles from './Posts.module.scss';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Menu from '~/components/Popper/MenuOther';
import Video from 'components/VideoItem/Videos';
import Swal from 'sweetalert2'

const cx = classNames.bind(styles);

const DATA_SORT = [
    {   
        title: "Type",
    },
    {
        title: "Oldest to Newest",
        clicked: false,
        icon: null

    },
    {
        title: "Newest to Oldest",
        clicked: false,
        icon: null
    }
]

function Posts () {
    const [dataSort, setDataSort] = useState(DATA_SORT);
    const [datapost,setDatapost] = useState([]);
    const [dataportSort,setDataportSort] = useState([]);
    const [contentsearch,setContentsearch] = useState('');
    const [cleanbtn,setCleanbtn] = useState(false);
    const [datasearch,setDatasearch] = useState([]);
    const navigate = useNavigate();
    const addtextsearch = (e) => {
        let text = e.target.value
        setContentsearch(text);
        if(text !== ''){
            setCleanbtn(true)
        }
        else {
            setCleanbtn(false);
            setDatasearch([]);
        }
    }
    const handlecleantext = () => {
        setCleanbtn(false);
        setContentsearch('');
        setDatasearch([]);
    }

    const handlereplace = (description,namemusic,idpost) => {
        navigate(`/path?id=${idpost}&des=${description}&nameus=${namemusic}`);
    }

    const handleDeletevideo = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your video will remove forever from the storage!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ed1555",
            cancelButtonColor: "#bfbfbf",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
                if (result.isConfirmed) {
                        // Bắt đầu loading khi người dùng xác nhận xóa
                    Swal.fire({
                        html: "Please wait...",
                        didOpen: async () => {
                            Swal.showLoading();

                            try {
                                const { data } = await axios.post('http://localhost:8096/api/removepost', { idpost: id });
                                

                                // Sau khi nhận được dữ liệu, dừng loading
                                Swal.hideLoading();

                                // Kiểm tra kết quả và hiển thị thông báo phù hợp
                                if (data.errCode === 0) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: `${data.message}`,
                                        icon: "success",
                                        timer: 3000,
                                      //  timerProgressBar: true,
                                    }).then(() => {
                                        // Reload lại trang sau khi thông báo đóng
                                        window.location.reload();
                                    });
                                } else {
                                    Swal.fire({
                                        title: "Error!",
                                        text: `${data.message}`,
                                        icon: "error",
                                        timer: 3000,
                                      //  timerProgressBar: true,
                                    });
                                }
                            } catch (error) {
                                Swal.hideLoading();
                                Swal.fire({
                                    title: "Error!",
                                    text: "An error occurred while trying to delete the video.",
                                    icon: "error",
                                    timer: 3000,
                                   // timerProgressBar: true,
                                });
                            }
                        }
                    });
                }
          });
    }

    const handleSearch = () => {
        if(contentsearch === ''){
            setDatasearch([]);
            return
        }
        if(datapost.length > 0){
            let arrsearch = []
            for(const item of datapost){
                if(item.description === contentsearch){
                    arrsearch.push(item);
                }
            }
            setDatasearch(arrsearch);
        }
    }

    //sort array increase
    const mergeSort = (array) => {
        if (array.length <= 1) {
            return array;
        }
    
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));
    
        return merge(left, right);
    }
    
    const merge = (left, right) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
    
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].id < right[rightIndex].id) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
    
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }


    // sort array decrease

    const mergeDescending = (left, right) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
    
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].id > right[rightIndex].id) {  // Thay đổi dấu so sánh
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
    
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
    
    // Hàm Merge Sort cho sắp xếp giảm dần
    const mergeSortDescending = (array) => {
        if (array.length <= 1) {
            return array;
        }
    
        const mid = Math.floor(array.length / 2);
        const left = mergeSortDescending(array.slice(0, mid));
        const right = mergeSortDescending(array.slice(mid));
    
        return mergeDescending(left, right);
    }
    
    const handleMenuChange = (menuItem) => {
        const updatedDataSort = dataSort.map(item =>
            menuItem === "Type"
                ? { ...item, clicked: false, icon: null } // Reset tất cả clicked thành false nếu title là "Type"
                : item.title === menuItem
                    ? { ...item, clicked: true , icon: <FaCheck /> } // Đặt clicked thành true cho item được chọn
                    : { ...item, clicked: false ,icon: null} // Các item khác giữ clicked là false
        )
        setDataSort(updatedDataSort);
        // Sắp xếp dữ liệu dựa trên mục được chọn
       
        if(datapost.length > 0) {
            let sortedData;
            if (menuItem === "Oldest to Newest") {
                sortedData = mergeSort(datapost);
            } else if (menuItem === "Newest to Oldest") {
                sortedData = mergeSortDescending(datapost);
            } else {
                sortedData = []; // Nếu không chọn sắp xếp, giữ nguyên dữ liệu
            }
    
            setDataportSort(sortedData);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.post('http://localhost:8096/api/getallpostwithowner', {
                    iduser: Cookies.get('iduser')
                });
                console.log(data.data.post);
                setDatapost(data.data.post)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    },[]);
   let datapoststable = datasearch.length > 0 ? datasearch : dataportSort.length > 0 ? dataportSort : datapost
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-title')}>
                <span>Manage your posts</span>
                <div className={cx('wrapper-search')}>
                    <button className={cx('search-btn')} onClick={() => handleSearch()}>
                        <IoSearch />
                    </button>
                    <input type="text" placeholder='Search for post description' value={contentsearch} onChange={(e) => addtextsearch(e)} />
                    {
                        cleanbtn && (
                            <button className={cx('clear')} onClick={() => handlecleantext()}>
                                <FaRegTimesCircle />
                            </button>
                        )
                    }
                </div>
            </div>
            <div className={cx('wrapper-main-content')}>
                <div className={cx('wrapper-header')}>
                    <Menu items={dataSort} onChange={handleMenuChange}>
                        <div className={cx('wrapper-button')}>
                            <Button 
                                basic 
                                className={cx('style-btn')} 
                                rightIcon={<MdKeyboardArrowDown className={cx('icon-down')}/>} 
                                >
                                    Sort By
                            </Button>
                        </div>
                    </Menu>
                </div>
                <div className={cx('wrapper-body')}>
                    <table>
                        <colgroup><col style={{ width: '60%' }} /><col style={{ width: '20%' }} /><col style={{ width: '20%' }} /></colgroup>
                        <thead>
                            <tr>
                                <th>Posts</th>
                                <th>Time Posted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datapoststable.length > 0 &&
                                datapoststable.map((item,index) => (
                                    <tr key={index}>
                                        <td className={cx('wrapper-infovideo')}>
                                            <span>
                                                <Video src={item.urlvideo} className={cx('style-video')}/>
                                            </span>
                                            <span style={{marginLeft:"5rem"}}>
                                                {`(${item.totallike}) likes`}
                                            </span>
                                            <span style={{marginLeft:"5rem"}}>
                                                {`(${item.totalcomment}) comments`}
                                            </span>
                                        </td>
                                        <td>{item.datecreated}</td>
                                        <td>
                                            <span className={cx('wrapper-action')}>
                                                <Link to={`/editpost?id=${item.id}&des=${item.description}&nameus=${item.namemusic}`}>
                                                    <span><MdEdit /></span>
                                                </Link>
                                                <Link to={`/Comment/${item.id}`}>
                                                    <span><BiDetail /></span>
                                                </Link>
                                                <span onClick={()=> handleDeletevideo(item.id)}><RiDeleteBin6Fill /></span>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Posts;