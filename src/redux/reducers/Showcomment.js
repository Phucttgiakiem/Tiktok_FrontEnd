import { INIT_STATE } from "constant";
import { showcomment,hidecomment } from "redux/actions";

export default function Showcommentdialog ( state = INIT_STATE.ShowListComment,action){
    switch(action.type){
        case showcomment.toString():
            return {
                isshowlc: true
            }
        case hidecomment.toString():
            return {
                isshowlc: false
            }
        default:
            return state;
    }
}