export interface VenusBaseResponse {
  code?: number;
  subcode?: number;
  message?: string;
};

export interface VenusSuccessResponse<T> extends VenusBaseResponse {
  data: T;
};

export interface VenusFailResponse extends VenusBaseResponse {
  errors: any;
};

export type VenusResponse<T> = VenusSuccessResponse<T> | VenusFailResponse;
