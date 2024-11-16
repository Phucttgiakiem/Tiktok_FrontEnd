import { INIT_STATE } from "constant";
import { AuthenLogin} from "redux/actions";

export default function LoginReducer (state = INIT_STATE.Login,action){
    switch(action.type){
        case AuthenLogin.AuthenLoginRequest.toString():
            return {
                ...state,
            }
        case AuthenLogin.AuthenLoginSuccess.toString():
            return {
                ...state,
                data: action.payload
            }
        case AuthenLogin.AuthenLoginFailure.toString():
            return {
                ...state,
            }
        case AuthenLogin.AuthenLoginReset.toString():
            return {
                data: null
            }
        default:
            return state;
    }
}