import {
  FIND_CONTACTS_REQUEST, FIND_CONTACTS_SUCCESS, FIND_CONTACTS_FAILURE,
  FIND_CONTACT_FAILURE, FIND_CONTACT_REQUEST, FIND_CONTACT_SUCCESS,
  DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE,
  SAVE_CONTACT_REQUEST, SAVE_CONTACT_SUCCESS, SAVE_CONTACT_FAILURE
} from "../actions/constants";

const defaultState = { data: null, loading: false, error: null };

export function saveContact(state = defaultState, action) {
  switch (action.type) {
    case SAVE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_CONTACT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function deleteContactById(state = defaultState, action) {
  switch (action.type) {
    case DELETE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case DELETE_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function contactById(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTACT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function contacts(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTACTS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
