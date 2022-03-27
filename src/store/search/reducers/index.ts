import { createReducer } from '@reduxjs/toolkit';
import { PageMeta, UserResponse } from 'services/search.service';
import * as actions from '../actions';

interface StateType {
  searchData: UserResponse[];
  searchMeta?: PageMeta;
  keyword: string;
}

const initialState: StateType = {
  searchData: [],
  keyword: '',
};

const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setSearchKeyword, (state, action) => {
    state.keyword = action.payload;
  });
});

export default searchReducer;
