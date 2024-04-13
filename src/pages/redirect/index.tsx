import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postLogin } from "../../api/postLogin";
import { postRefreshToken } from "../../api/postRefreshToken";

const Redirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { query } = router;
    const code = query.code as string;

    const handleLogin = async (code: string) => {
      try {
        const data = await postLogin(code);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const initProfile = data.initProfile;

        if (data) {
          setCookie("accessToken", accessToken, {
            maxAge: 60 * 3000,
          });
          setCookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 30,
          });
        }

        if (!initProfile) {
          router.push("/nickname");
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error while logging in:", error);
      }
    };

    const handleRefreshToken = async () => {
      try {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (!accessToken || !refreshToken) {
          router.push("/onboarding");
          return;
        }

        const response = await postRefreshToken();

        if (response && response.accessToken) {
          setCookie("accessToken", response.accessToken, {
            maxAge: 60 * 3000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("리프레시 토큰 발급 에러 발생! :", error);
        router.push("/onboarding");
      }
    };

    if (!code) {
      return;
    }

    handleLogin(code);
    handleRefreshToken();
  }, [router]);

  if (loading) {
    return null;
  }

  return null;
};

export default Redirect;
