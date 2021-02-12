export default function reducer (tokenName = '', action) {
    if(action.type == 'addtoken') {
        console.log(action.token)
        return action.token
    } else {
        return tokenName
    }
}
