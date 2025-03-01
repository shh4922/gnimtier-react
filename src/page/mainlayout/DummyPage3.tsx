import {useFetchGroupByParentId} from "@/api/group/group";
import {useState} from "react";

/**
 * 로그인되지않은 사용자의 경우, 로그인페이지로 이동하도록 리디렉션
 * @constructor
 */
const DummyPage3 = () => {
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
    const {data:groupList, isLoading, error} = useFetchGroupByParentId(selectedParentId)

    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error: {error.message}</div>
    }

    const selectParentGroup = (groupId:string) => {
        setSelectedParentId(groupId)
    }
    return (
        <div>
            <h1>그룹 선택하는 페이지임.</h1>
            {
                groupList?.groups.map(group => (
                    <div key={group.id}>
                        <button onClick={()=>selectParentGroup(group.id)}>{group.name}</button>
                        {
                            group.isRoot && (
                                <p>{group.isRoot} 얘는 선택 가능함 ㅋㅋ</p>)
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default DummyPage3;
