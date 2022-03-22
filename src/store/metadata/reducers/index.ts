import { AnyAction } from '@reduxjs/toolkit';
import { Meta } from '../actions/type';
import _ from 'lodash';

type StateType = Record<string, Meta>;

const metadataReducer = (state: StateType, action: AnyAction): StateType => {
  let updated: Meta = {} as Meta;
  const actionType = action.type.split('/').slice(-1)[0];
  const actionName = action.type.replace(`/${actionType}`, '');

  switch (actionType) {
    case 'pending':
      updated = {
        error: false,
        loaded: false,
        pending: true,
      };
      break;
    case 'fulfilled':
      updated = {
        error: false,
        loaded: true,
        pending: false,
      };
      break;
    case 'rejected':
      updated = {
        error: true,
        loaded: false,
        pending: false,
      };
      break;
    case 'clear':
      if (action.payload) {
        return _.omit(state, action.payload);
      }

    default:
      return state;
  }

  return {
    ...state,
    [actionName]: updated,
  };
};

export default metadataReducer;
