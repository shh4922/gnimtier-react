import {Group, useFetchGroupByParentId, useMutateJoinGroup} from "@/api/group/group";
import {useEffect, useState} from "react";
import {useFetchMyProfile} from "@/api/user/user";
import {useFetchRiotInfo} from "@/api/riot/riot";
import {Link, useNavigate} from "react-router-dom";
import useUserStore from "@/store/userStore";

/**
 * 로그인되지않은 사용자의 경우, 로그인페이지로 이동하도록 리디렉션
 * @constructor
 */
const DummyPage3 = () => {

    const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
    const {data:groupList} = useFetchGroupByParentId(selectedParentId)
    const {mutate} = useMutateJoinGroup()





    const selectParentGroup = async (group:Group) => {
        if(group.isJoinable){
            const isJoin = confirm("이거 가입할꺼임?")
            if(isJoin){
                mutate(group.id)
            }
        }

    }


    return (
        <div>
            <h1>그룹 선택하는 페이지임.</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/dummy">더미1</Link>
                <Link to="/dummy2">더미2</Link>
                <Link to="/dummy3">더미3</Link>
                <Link to="/dummy4">더미4</Link>
                <Link to="/dummy5">더미5</Link>
            </div>
            {
                groupList?.groups.map(group => (
                    <div key={group.id} style={{display: "flex", justifyContent: "space-between"}}>
                        <button onClick={() => selectParentGroup(group)}>{group.name}</button>
                        {
                            group.isJoinable && (
                                <p>{group.isJoinable} 얘는 선택 가능함 ㅋㅋ</p>)
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default DummyPage3;
