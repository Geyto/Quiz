import {Form} from "./components/form.js";
import {Choice} from "./components/choice.js";
import {Test} from "./components/test.js";
import {Result} from "./components/result.js";
import {List} from "./components/list.js";
import {Auth} from "./sercices/auth.js";

export class Router{
    constructor() {
        this.contentElemet = document.getElementById('content');
        this.stylesElemet = document.getElementById('styles');
        this.titleElement =  document.getElementById('title');
        this.profileElemet = document.getElementById('profile');
        this.profileFullNameElment = document.getElementById('profile-full-name');
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () => {

                },
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('signup');
                },
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                },
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: 'styles/choice.css',
                load: () => {
                    new Choice();
                },
            },
            {
                route: '#/test',
                title: 'Прохождение теста',
                template: 'templates/test.html',
                styles: 'styles/test.css',
                load: () => {
                    new Test();
                },
            },
            {
                route: '#/result',
                title: 'Результаты',
                template: 'templates/result.html',
                styles: 'styles/result.css',
                load: () => {
                    new Result();
                },
            },
            {
                route: '#/list',
                title: 'Лист ответов',
                template: 'templates/list.html',
                styles: 'styles/list.css',
                load: () => {
                    new List();
                },
            },
        ]
    }
    async openRoute(){
        const urlRoute = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout'){
            await Auth.logout();
            window.location.href = '#/';
            return;
        }
        const newRoute = this.routes.find(item => {
            return item.route === urlRoute
        });
        if (!newRoute){
            window.location.href = '#/';
            return
        }
        this.contentElemet.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        this.stylesElemet.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken){
            this.profileElemet.style.display = 'flex';
            this.profileFullNameElment.innerText = userInfo.fullName;
        } else {
          this.profileElemet.style.display = 'none'
        }

        newRoute.load();
    }
}