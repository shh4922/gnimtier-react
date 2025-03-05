import {create} from "zustand/react";
import {User} from "@/api/user/model.tft";

interface userInfo {
    userId: string|null,
    username: string|null,
    profileImage: string|null,
    setUserInfo: (userInfo: User) => void,
}

const useUserStore = create<userInfo>((set)=> ({
    userId: null,
    username: null,
    profileImage: null,
    setUserInfo: (userInfo: User) =>
        set({
            userId: userInfo.id,
            username : userInfo.nickname,
            profileImage : userInfo.profileImageUrl
        }),
}))

export default useUserStore;
