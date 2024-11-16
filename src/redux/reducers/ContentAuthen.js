import { INIT_STATE } from "constant";
import  {
    edithtmlcode,
    getType,
    showcontrollogin,
    showcontrolregister,
    showDetailloginwithemail,
    showDetailregisterwithemail,
    showtakepassacount} 
from "redux/actions"

export default function changecontentAuthen(state = INIT_STATE.pageLogin, action){
    switch (action.type) {
        case getType(showcontrollogin):
            return {
                htmlcode: action.payload // Chỉ lưu tên component
            };
        case getType(showcontrolregister):
            return {
                htmlcode: action.payload
            };
        case getType(showDetailloginwithemail):
            return {
                htmlcode: action.payload
            };
        case getType(showDetailregisterwithemail):
            return {
                htmlcode: action.payload
            };
        case getType(showtakepassacount):
            return {
                htmlcode: action.payload
            };
        case getType(edithtmlcode):
            return {
                htmlcode: action.payload
            }
        default:
            return state;
    }
}