import { INIT_STATE } from "constant";
import { Forgotpass} from "redux/actions";

export default function ForgotpassReducer (state = INIT_STATE.ForgotPass,action){
    switch(action.type){
        case Forgotpass.ForgotpassRequest.toString():
            return {
                ...state,
            }
        case Forgotpass.ForgotpassSuccess.toString():
            return {
                ...state,
                data: action.payload
            }
        case Forgotpass.ForgotpassFailure.toString():
            return {
                ...state,
            }
        case Forgotpass.ForgotpassReset.toString():
            return {
                data: null
            }
        default:
            return state;
    }
}