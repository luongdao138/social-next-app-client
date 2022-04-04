import { createReducer } from '@reduxjs/toolkit';
import { TimelinePost, PageMeta } from 'services/timeline.service';
import * as actions from '../actions';
import _ from 'lodash';
interface StateType {
  posts: TimelinePost[];
  postsMeta?: PageMeta;
}

const initialState: StateType = {
  posts: [],
};

const timelineReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.createPost.fulfilled, (state, action) => {
    state.posts = _.concat(state.posts, action.payload.post);

    if (state.postsMeta && state.postsMeta.total_count) {
      state.postsMeta.total_count = state.postsMeta.total_count + 1;
    } else {
      state.postsMeta = {
        total_count: 1,
      };
    }
  });
});

export default timelineReducer;
