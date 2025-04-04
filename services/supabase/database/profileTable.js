  import { supabase } from "../init";
export  async function insertIntoProfileTable(uid,credentials){
    const {username,email} = credentials;
    const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: uid,
      created_at : new Date().toISOString(),
      username,
      email,
      updated_at: new Date().toISOString(),
    });

  if (profileError) throw profileError;
  }
  