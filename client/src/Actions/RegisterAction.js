import * as types from './actionTypes';

export function userRegistration (userRegObject) {
  return {
    type: types.ADD_USER,
    userRegObject
  }
}

