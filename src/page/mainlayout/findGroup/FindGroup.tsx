import styles from './findGroup.module.scss';
import {createSearchParams, Link, useLocation, useNavigate} from "react-router-dom";
import {Group, postJoinGroup, useFetchGroupByParentId} from "@/api/group/group";
import {useEffect} from "react";
import qs from 'qs'
import {useFetchRiotInfo} from "@/api/riot/riot.ts";
import useUserStore from "@/store/userStore.ts";

export default function FindGroup() {
    const userInfo = useUserStore()
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const {data:groupList} = useFetchGroupByParentId(query.groupId as string);
    const {data: riotInfo, isSuccess, error} = useFetchRiotInfo(userInfo.userId)

    function clickGroup(group:Group) {
        if(group.isJoinable) {
            const isJoin = confirm(`${group.name} 이거 진짜 가입할거임?`)
            if(!isJoin) { return}

            joinGroup(group.id)
        }else {
            navigate({
             pathname:'/findGroup',
             search: createSearchParams({
                 groupId: group.id
             }).toString()
            });
        }
    }

    useEffect(() => {
        console.log('riot',riotInfo)
    }, [isSuccess]);

    // useEffect(() => {
    //     console.log('riot error',error)
    // }, [error]);

    if(error) {
        alert("엥 님아 라이엇계정먼저 연결해줘야함")
        navigate('/mypage')
    }


    async function joinGroup(groupId:string) {
        try {
            const res = await postJoinGroup(groupId) as {status:string};
            if(res.status === "ACCEPTED" ) {
                alert("가입했음 추카야")
                navigate("/")
            }
        } catch (e) {
            alert("이미 가입했거나, 가입실패했음...;")
            console.error(e)
        }
    }

    useEffect(() => {
        console.log(query.groupId);
    }, []);

    if(groupList?.groups.length === 0){
        return <p className={styles.noGroup}>그룹이 아직 없음; 죄송..</p>
    }

    return (
        <div className={styles.findGroupContainer}>
            <Link className={styles.vote} to={"/voteGroup"}>눌러보셈</Link>
            {
                groupList?.groups.map(group => {
                    return (
                        <div className={styles.joinBox} key={group.id}>
                            <button onClick={()=>{clickGroup(group)}}>{group.name}</button>
                            {
                                group.isJoinable && (
                                    <span>얜 가입가능함</span>
                                )
                            }
                        </div>

                    )
                })
            }
        </div>
    );
};
