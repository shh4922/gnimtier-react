/**
 * 네트워크 요청시 token 만료에 대한 처리를 한번에 하기 위해 사용됩니다.
 * 브라우저 상태코드로 401이 나온다면, 서버로 refreshToken 재발급을 요청합니다.
 * 차후에 서버에서 데이터를 받는법을 익히면 다시 설명드리겠습니다.
 */
declare const interceptorAxios: import("axios").AxiosInstance;
export { interceptorAxios };
