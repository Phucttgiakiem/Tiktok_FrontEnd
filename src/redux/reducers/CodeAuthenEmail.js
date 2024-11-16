import { INIT_STATE } from "constant";
import { CreateAuthencode } from "redux/actions";

export default function CreateCodeEmailReducer (state = INIT_STATE.codegetpass,action){
    switch(action.type){
        case CreateAuthencode.createcodeRequest.toString():
            return {
                ...state,
            }
        case CreateAuthencode.createcodeSuccess.toString():
            return {
                ...state,
                data: action.payload
            }
        case CreateAuthencode.createcodeFailure.toString():
            return {
                ...state
            }
        default:
            return state;
    }
}