export interface Meta {
  pending: boolean;
  loaded: boolean;
  error: boolean;
  error_message?: string;
}

export enum METADATA_ACTION_TYPE {
  CLEAR_METADATA = 'meta/metadata/clear',
}
