import {create} from "zustand/react";
import {User} from "@/api/user/model.tft";
interface userInfo {
    username: string|null,
    profileImage: string|null,
    setUserInfo: (userInfo: User) => void,
}

const useUserStore = create<userInfo>((set)=> ({
    username: null,
    profileImage: null,
    setUserInfo: (userInfo: User) =>
        set(()=> ({
            username : userInfo.nickname,
            profileImage : userInfo.profileImageUrl
        })),
}))

export default useUserStore;
