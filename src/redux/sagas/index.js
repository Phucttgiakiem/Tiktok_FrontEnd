import { takeLatest, call,put } from "redux-saga/effects"
import * as actions from '../actions';
import * as api from '../../api';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';
function* fetchLoginSaga (action){
    try {
        const lg = yield call (api.logintk,action.payload);
        console.log('login',lg.data);
        yield put(actions.AuthenLogin.AuthenLoginSuccess(lg.data));
        yield put(actions.hideloadingdata());
        if(lg.data.errCode === 0){
            Cookies.set('useremail', lg.data.user.email, { expires: 1 });
            Cookies.set('avatar', lg.data.user.avatar, { expires: 1 });
            Cookies.set('username', lg.data.user.fullName, { expires: 1 });
            Cookies.set('iduser', lg.data.user.id, { expires: 1 });
            window.location.reload();
        }else{
            toast.error(`${lg.data.message}`);
        }
    } catch(err){
        console.error(err);
        yield put(actions.AuthenLogin.AuthenLoginFailure(err));
        yield put(actions.hideloadingdata());
    }
}

function* fetchForgotPassSaga (action){
    try {
        const fp = yield call (api.forgotpasstk,action.payload);
        console.log('forgotpass',fp);
        yield put(actions.Forgotpass.ForgotpassSuccess(fp.data));
        yield put(actions.hideloadingdata());
        if(fp.data.errCode === 0){
            toast.success('password was changed success, please login again !!!');
        }else {
            toast.error(`${fp.data.message}`);
        }
    } catch(err){
        console.error(err);
        yield put(actions.Forgotpass.ForgotpassFailure(err));
        yield put(actions.hideloadingdata());
    }
}

function* fetchGetAllpost (){
    try{
        const postresult = yield call (api.getAllpost);
        console.log('resultgetpost',postresult.data.post);
        yield put(actions.GetAllpost.GetpostSuccess(postresult.data.post));
    }catch(err){
        console.error(err);
        yield put(actions.GetAllpost.GetpostFailure(err));
    }
}

function* fetchCreatecodeAuthen (action){
    try{
        const coderesult = yield call (api.authenemailgetpass,action.payload);
        console.log('resultcallapicode',coderesult);
        yield put(actions.CreateAuthencode.createcodeSuccess(coderesult));
        yield put(actions.hideloadingdata());
        if(coderesult.data.errCode === 0){
            toast.success("the code was send to email success, please checking the email !!!");
        }else {
            toast.error(coderesult.data.message);
        }
    }catch(err){
        console.log(err);
        yield put(actions.CreateAuthencode.createcodeFailure(err));
        yield put(actions.hideloadingdata());
    }
}

function* fetchRegistermember (action){
    try{
        const fr = yield call (api.createaccount,action.payload);
        console.log('resultofregister',fr.data);
        yield put(actions.CreateAccount.createaccountSuccess(fr.data));
        yield put(actions.hideloadingdata());
        if(fr.data.errCode !== 0){
            toast.error(`${fr.data.message}`);
        }
        else {
            toast.success('your account created success, please login with new your account !!!');
        }
    }catch(err){
        console.log(err);
        yield put(actions.CreateAccount.createaccountFailure(err));
        yield put(actions.hideloadingdata());
    }
}

function* mySaga(){
    yield takeLatest(actions.AuthenLogin.AuthenLoginRequest,fetchLoginSaga);
    yield takeLatest(actions.Forgotpass.ForgotpassRequest,fetchForgotPassSaga);
    yield takeLatest(actions.CreateAuthencode.createcodeRequest,fetchCreatecodeAuthen);
    yield takeLatest(actions.CreateAccount.createaccountRequest,fetchRegistermember);
    yield takeLatest(actions.GetAllpost.GetpostRequest,fetchGetAllpost);
}

export default mySaga;