import {useEffect} from 'react'
import { supabase } from '../../init'
function handleAuthListener (){
    useEffect(()=>{
        const {data:{subscription}} = supabase.auth.onAuthStateChange((event,session)=>{
            console.log("Auth event :",event)
            console.log('session :',session)
        })
    return ()=> subscription.unsubscribe
    },[]
)
}
export default handleAuthListener