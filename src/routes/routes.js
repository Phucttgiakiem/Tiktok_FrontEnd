import config from '~/config';
//layouts
import { HeaderOnly } from '~/layouts';
import { CommentLayout} from '~/layouts';
import MyLayout from '~/layouts/MyLayout/MyLayout'
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from 'pages/Profile';
import Upload from 'pages/Upload';
import Posts from 'pages/Posts';
import Search from '~/pages/Search';
import Live from 'pages/Live';
import Editpost from 'pages/Posts/Editpost';
//import Login from 'pages/login';
import Comment from 'pages/Comment'; 
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.search, component: Search, layout: null },
    { path: `${config.routes.Comment}/:id`, component: Comment, layout: CommentLayout},
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [
    { path: config.routes.upload, component: Upload, layout: MyLayout },
    { path: config.routes.post, component: Posts, layout: MyLayout},
    { path: config.routes.editpost,component:Editpost, layout:MyLayout},
];

export { publicRoutes, privateRoutes };
