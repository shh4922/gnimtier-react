import axios, {AxiosHeaders} from "axios";
import {authResponse, fetchRefreshToken} from "@/api/auth/auth";
import {removeToken, setTokenInLocal} from "@/utils/token";

/**
 * 네트워크 요청시 token 만료에 대한 처리를 한번에 하기 위해 사용됩니다.
 * 브라우저 상태코드로 401이 나온다면, 서버로 refreshToken 재발급을 요청합니다.
 * 차후에 서버에서 데이터를 받는법을 익히면 다시 설명드리겠습니다.
 */
const interceptorAxios = axios.create({
    baseURL: import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
    timeout: 5000,
})

interceptorAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("a")

        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
            config.headers["Content-Type"] = "application/json"
        }

        return config
    }
)

// 401일때 token refresh 하기위해 사용
interceptorAxios.interceptors.response.use(
    (res) => { return res },
    async (error) => {
        switch (error?.response?.status) {
            case 401:
                try {
                    const refresh = localStorage.getItem('r')

                    const headers :{ "Content-Type": string; refresh: string; "Access-Control-Allow-Origin": string } = {
                        'Content-Type': 'application/json',
                        'refresh': `Bearer ${refresh}`,
                        'Access-Control-Allow-Origin': '*'
                    }

                    const res =  await fetchRefreshToken(headers)

                    if(res.tokens.access_token !== null) {
                        removeToken()
                        setTokenInLocal(res.tokens.access_token, res.tokens.refresh_token)
                    } else {
                        alert("세션이 만료되었습니다.")
                        return Promise.reject(error)
                    }

                    error.config.headers.Authorization = `Bearer ${localStorage.getItem("a")}`
                    return axios.request(error.config);

                } catch (error) {
                    console.error(`token expire!! \n ${error}` )
                    throw error
                }

            case 500:
                console.error(error)
                throw 500
            default:
                // alert("default에러남.")
                console.error(`default Error!! \n ${error}` )
                throw error
        }
    }
);

export { interceptorAxios }
