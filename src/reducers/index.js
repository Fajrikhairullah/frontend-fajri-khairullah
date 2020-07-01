import { combineReducers } from "redux";
import { saveContact, contactById, contacts, deleteContactById } from "./contacts";



export default combineReducers({
    saveContact, contactById, contacts, deleteContactById,
});

