import { INIT_STATE } from "constant";
import { getType,showAuthendialog,hideAuthendialog } from "redux/actions";

export default function ShowAuthenReducer (state = INIT_STATE.ShowAuthenDialog,action){
    
    switch(action.type){
        case showAuthendialog.toString():
            return {
                isshow: true
            };
        case hideAuthendialog.toString():
            return {
                isshow: false
            };
        default:
            return state;
    }
}