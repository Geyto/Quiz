export class UrlManager{
    static getQueryParams(){
        const qs = document.location.hash.split('+').join('');
        let params = {},
            tokens,
            re = /[?&]([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)){
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
     static checkUserData(){
        const name = localStorage.getItem('nameUser')
        const lastName = localStorage.getItem('lastNameUser')
        const email = localStorage.getItem('mail')

        if (!name || !lastName || !email){
            location.href = '#/';
        }
    }
}