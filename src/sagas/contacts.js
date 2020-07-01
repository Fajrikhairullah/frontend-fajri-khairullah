import {
    FIND_CONTACTS_REQUEST,
    FIND_CONTACTS_SUCCESS,
    FIND_CONTACT_FAILURE,
    FIND_CONTACT_REQUEST,
    FIND_CONTACT_SUCCESS,
    FIND_CONTACTS_FAILURE,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,
    SAVE_CONTACT_REQUEST,
    SAVE_CONTACT_SUCCESS,
    SAVE_CONTACT_FAILURE
} from "../actions/constants";
import { put, takeLatest } from 'redux-saga/effects';
import { commonAxios } from "../utils/apiUtils";


function* save(action) {
    const { id, firstName, lastName, age, photo } = action.data;
    try {
        const data = yield id ?
            commonAxios.put(`contact/${id}`, { id, firstName, lastName, age, photo }) :
            commonAxios.post('contact', { firstName, lastName, age, photo });
        yield put({
            type: SAVE_CONTACT_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: SAVE_CONTACT_FAILURE,
            error: error,
        });
    };
}


function* deleteById(action) {

    try {
        const data = yield commonAxios.delete(`contact/${action.id}`);

        yield put({
            type: DELETE_CONTACT_SUCCESS,
            data: data,
        });

    } catch (error) {
        yield put({
            type: DELETE_CONTACT_FAILURE,
            error: error,
        });
    }
}

function* findById(action) {

    try {
        const data = yield commonAxios.get(`contact/${action.id}`);
        yield put({
            type: FIND_CONTACT_SUCCESS,
            data: data,
        });

    } catch (error) {
        yield put({
            type: FIND_CONTACT_FAILURE,
            error: error,
        });
    }
}

function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('contact', {

            params: { ...search, sort, page, size }
        });
        yield put({
            type: FIND_CONTACTS_SUCCESS,
            data: data,
        });

    } catch (error) {
        yield put({
            type: FIND_CONTACTS_FAILURE,
            error: error,
        });
    };
}

export function* watchSaveContact() {
    yield takeLatest(SAVE_CONTACT_REQUEST, save);
}

export function* watchDeleteContactById() {
    yield takeLatest(DELETE_CONTACT_REQUEST, deleteById);
}

export function* watchFindContactById() {
    yield takeLatest(FIND_CONTACT_REQUEST, findById);
}

export function* watchFindContacts() {
    yield takeLatest(FIND_CONTACTS_REQUEST, findAll);
}