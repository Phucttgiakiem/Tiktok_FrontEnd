import { INIT_STATE } from "constant";
import { showloadingdata,hideloadingdata } from "redux/actions";

export default function ShowLoadingReducer (state = INIT_STATE.Showloading,action){
    switch(action.type){
        case showloadingdata.toString():
            return {
                isshowloading: true
            };
        case hideloadingdata.toString():
            return {
                isshowloading: false
            };
        default:
            return state;
    }
}