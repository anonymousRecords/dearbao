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

// 리프레시 토큰
export type RefreshToken = {
  accessToken: string;
  refreshToken: string;
};

// 로그아웃
export type Logout = {
  data: string;
};

// 탈퇴
export type Deactivation = {
  data: string;
};

// 닉네임
export type Nickname = {
  nickname: string;
  alias: string;
};

// 미션 (홈 페이지)
export type Mission = {
  // 공통
  nickname: string;
  messageOpenTime: boolean;
  missionSuccess: boolean;
  // 미오픈
  remainingTime?: string;
  // 오픈
  message?: string;
};

// 데일리 미션 조회
export type DailyMission = {
  content: string;
  id: number;
};

export type MyMission = {
  date: string;
  missionContent: string; // 데일리 미션 내용
  missionAnswer: string; // 유저 미션 답변
  message: string; // 푸바오 답장
};
