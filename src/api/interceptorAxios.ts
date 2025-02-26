import axios from "axios";
import { get } from '@/api/http.ts'
import {authResponse} from "@/api/auth/auth";
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
        const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJzdWIiOiJlMjA4NzJlMy02NWU1LTQ5MjgtYjI0Ni05MjgxZmQwNWExNWQiLCJpYXQiOjE3NDA0MDc3OTQsImV4cCI6MTc0MDQwODY5NH0.xchnGps0lgrORFMO9ZCOBCmsS5JtpWF9seuVhMfppK8"
            // localStorage.getItem("a")
        console.log(accessToken)
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
            config.headers["Content-Type"] = "application/json"
        }
        console.log("header",config.headers)
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
                    // const refresh = "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwic3ViIjoiZTIwODcyZTMtNjVlNS00OTI4LWIyNDYtOTI4MWZkMDVhMTVkIiwiaWF0IjoxNzQwNDAzNTM1LCJleHAiOjE3NDEwMDgzMzV9.zkjlWJMQ0-_dYHrQWqcuiVgjIDSjCOBTc3IdvCriq74"
                    const headers = {
                        'Content-Type': 'application/json',
                        'refresh': `Bearer ${refresh}`,
                        'Access-Control-Allow-Origin': '*'
                    }

                    const result = await get<authResponse>("/auth/refresh", {
                        headers: headers,
                    })


                    if(result.access_token !== null) {

                        removeToken()
                        setTokenInLocal(result.access_token, result.refresh_token)
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
