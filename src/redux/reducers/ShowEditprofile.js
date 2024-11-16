import { INIT_STATE } from "constant";
import { showEditprofile,hideEditprofile } from "redux/actions";

export default function Showcommentdialog ( state = INIT_STATE.ShowEditprofile,action){
    switch(action.type){
        case showEditprofile.toString():
            return {
                showEdit: true
            }
        case hideEditprofile.toString():
            return {
                showEdit: false
            }
        default:
            return state;
    }
}