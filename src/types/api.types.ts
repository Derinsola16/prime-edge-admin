export interface ApiSuccessResponse<T> {
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  metadata?: Record<string, string>;
}

export interface ICursorPagination {
  per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  prev_page_cursor: string;
  next_page_cursor: string;
}

export interface IPageInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: IPageInfo;
}
