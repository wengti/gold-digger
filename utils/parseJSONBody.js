
export const parseJSONBody = async function(req){
    let body = ''
    for await (const chunk of req){
        body += chunk
    }
    return JSON.parse(body)
}