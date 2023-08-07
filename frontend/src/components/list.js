import {CustomHttp} from "../sercices/custom-http.js";
import config from "../../config/config.js";
import {UrlManager} from "../utils/url-menager.js";
import {Auth} from "../sercices/auth.js";

export class List {
    constructor() {
        this.optionsElement = null;
        this.backLinkElement = null;
        this.backLinkElement = document.getElementById('backLink');
        this.backLinkElement.addEventListener('click', this.backLink);
        this.routeParams = UrlManager.getQueryParams();
        this.userInfo = Auth.getUserInfo();
        this.init();
    }
    async init(){
        if (!this.userInfo){
            location.href = "#/"
        }
        if (this.routeParams.id){
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + this.userInfo.userId);
                if (result){
                    if (result.error){
                        throw new Error(result.error);
                    }
                    this.showQuestion(result)
                    return
                }
            }catch (error){
                console.log(error)
            }
        }
        location.href = '#/'
    }
    showQuestion(testWithAnswer) {
        document.getElementById('data').innerText = ' ' + this.userInfo.fullName + ' ' + localStorage.getItem('emailUser');
        document.getElementById('nameTest').innerText = testWithAnswer.test.name;
        this.optionsElement = document.getElementById('listQuestions');
        const questions = testWithAnswer.test.questions;
        this.optionsElement.innerHTML = '';
        for (let i = 0; i < questions.length; i++) {
            const optionElement = document.createElement('div');
            optionElement.className = 'list__question';
            const nameQuestionElement = document.createElement('div');
            nameQuestionElement.className = 'name__question'
            nameQuestionElement.innerHTML = '<span class="name__question-span">Вопрос ' + (+i + 1) + ':</span> ' + questions[i].question;
            const answerQuestionElements = document.createElement('div');
            answerQuestionElements.className = 'answer__questions';
            for (let x = 0; x < questions[i].answers.length; x++) {
                let activeQuestion = questions[i].answers[x];
                const answerOptionElement = document.createElement('div');
                answerOptionElement.className = 'answer__option';
                answerOptionElement.id = activeQuestion.id
                const circleElement = document.createElement('div');
                circleElement.className = 'circle';
                const answerElement = document.createElement('div');
                answerElement.className = 'answer__question';
                answerElement.innerText = activeQuestion.answer
                if (activeQuestion.correct === true){
                    circleElement.classList.add('circle-right');
                    answerElement.classList.add('answer-right');
                } else if (activeQuestion.correct === false){
                    circleElement.classList.add('circle-error');
                    answerElement.classList.add('answer-error');
                }
                answerOptionElement.appendChild(circleElement);
                answerOptionElement.appendChild(answerElement);
                answerQuestionElements.appendChild(answerOptionElement);
            }
            optionElement.appendChild(nameQuestionElement);
            optionElement.appendChild(answerQuestionElements);
            this.optionsElement.appendChild(optionElement);
        }
    }
    backLink() {
        location.href = '#/result?id=' + this.routeParams.id;
    }
}
