import { User } from "@/api/user/model.tft";
interface userInfo {
    userId: string | null;
    username: string | null;
    profileImage: string | null;
    setUserInfo: (userInfo: User) => void;
}
declare const useUserStore: import("zustand/react").UseBoundStore<import("zustand/vanilla").StoreApi<userInfo>>;
export default useUserStore;
