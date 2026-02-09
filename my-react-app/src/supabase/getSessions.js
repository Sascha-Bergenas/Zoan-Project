import supabase from './supabase'

export default async function getSessions() {
    let { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')

    console.log(sessions, error)
    return(sessions)
}