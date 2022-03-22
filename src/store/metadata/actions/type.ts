export interface Meta {
  pending: boolean;
  loaded: boolean;
  error: boolean | Record<string, any>;
}

export enum METADATA_ACTION_TYPE {
  CLEAR_METADATA = 'meta/metadata/clear',
}
