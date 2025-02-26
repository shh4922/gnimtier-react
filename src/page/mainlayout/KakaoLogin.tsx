import {useEffect} from 'react';
import {useParams} from "react-router-dom";


const KakaoLogin = () => {
    const params = useParams()

    useEffect(()=> {
        console.log(params);
    },[])

    return (
        <div>

        </div>
    );
};

export default KakaoLogin;
