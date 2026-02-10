import supabase from './supabase'

export default async function getSessions() {
    let { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')

    if (error) console.log(error)
    return(sessions)
}