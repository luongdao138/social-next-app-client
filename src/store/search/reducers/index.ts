import { unfollowUser } from './../../profile/actions/index';
import { createReducer } from '@reduxjs/toolkit';
import { PageMeta, UserResponse } from 'services/search.service';
import * as actions from '../actions';
import _ from 'lodash';

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
  builder
    .addCase(actions.setSearchKeyword, (state, action) => {
      state.keyword = action.payload;
    })
    .addCase(actions.searchUsers.fulfilled, (state, action) => {
      if (action.payload.meta.current_page > 1) {
        state.searchData = _.concat(state.searchData, action.payload.data);
      } else {
        state.searchData = action.payload.data;
      }

      state.searchMeta = action.payload.meta;
    })
    .addCase(actions.clearSearchUsers, (state) => {
      state.searchData = [];
      state.searchMeta = undefined;
    })
    .addCase(actions.followUsers.fulfilled, (state, action) => {
      state.searchData = state.searchData.map((user) => {
        if (user._id === action.payload.user._id) {
          return { ...user, is_followed: true };
        } else {
          return user;
        }
      });
    })
    .addCase(actions.unfollowUsers.fulfilled, (state, action) => {
      state.searchData = state.searchData.map((user) => {
        if (user._id === action.payload.user_id) {
          return { ...user, is_followed: false };
        } else {
          return user;
        }
      });
    });
});

export default searchReducer;
