import {createClient} from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store';
import Constant from 'expo-constants'
const {dev,projectUrl,projectApiKey} = Constant.expoConfig.extra
const ExpoSecureStoreAdapter = {
    getItem : (key)=> SecureStore.getItemAsync(key),
    setItem : (key,value) => SecureStore.setItemAsync(key,value),
    removeItem : (key)=> SecureStore.deleteItemAsync(key)
}
export const supabase = createClient(projectUrl,projectApiKey,{
    auth:{
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})
// jlhugkwhewhbldqskups
