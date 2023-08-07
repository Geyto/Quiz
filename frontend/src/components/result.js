import {UrlManager} from "../utils/url-menager.js";
import {CustomHttp} from "../sercices/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../sercices/auth.js";

export class Result {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.userInfo = Auth.getUserInfo();
        this.init();
        this.link = document.getElementById('link');
        this.findAnswer(this.routeParams);
    }
    async init(){
        if (!this.userInfo){
            location.href = "#/"
        }
        if (this.routeParams.id){
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + this.userInfo.userId);
                if (result){
                    if (result.error){
                        throw new Error(result.error);
                    }
                    document.getElementById('result__score').innerText = result.score + "/" + result.total;
                    return
                }
            }catch (error){
                console.log(error)
            }
        }
        location.href = '#/'
    }

    findAnswer(routeParams) {
        this.link.onclick = function (){
            console.log(routeParams)
            location.href = '#/list?id=' + routeParams.id;
        }
    }
}