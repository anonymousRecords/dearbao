import { APIResponse, RefreshToken } from "@/data/type";
import { baseAxios } from "./baseAxios";
import { getCookie, setCookie } from "cookies-next";

export const postRefreshToken = async () => {
  try {
    const response = await baseAxios.post<APIResponse<RefreshToken>>(
      "/api/v1/auth/refresh",
      {
        accessToken: getCookie("accessToken"),
        refreshToken: getCookie("refreshToken"),
      }
    );

    if (response.data.data.accessToken) {
      setCookie("accessToken", response.data.data.accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return response.data.data;
  } catch (error) {
    throw new Error("리프레시 토큰 에러 발생!");
  }
};
