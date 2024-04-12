export interface APIResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

export type InquireType = {
  inquireEmail: string;
  inquireTitle: string;
  inquireContent: string;
};

// 로그아웃
export type Logout = {
  data: string;
};

// 탈퇴
export type Deactivation = {
  data: string;
};

export type Nickname = {
  nickname: string;
};