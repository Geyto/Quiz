import {UrlManager} from "../utils/url-menager.js";

export class Choice {

    constructor() {
        this.quizzes = [];
        UrlManager.checkUserData();

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://testologia.site/get-quizzes', false);
        xhr.send();

        if (xhr.status === 200 && xhr.responseText) {
            try {
                this.quizzes = JSON.parse(xhr.responseText);
            } catch (e) {
                location.href = '#/';
            }
            this.processQuizzes();
        } else {
            location.href = '#/';
        }

    }

    processQuizzes() {
        const choiceOptionsElement = document.getElementById('choice__options')
        if (this.quizzes && this.quizzes.length > 0) {
            this.quizzes.forEach(quiz => {
                const that = this;
                const choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice__option';
                choiceOptionElement.setAttribute('data-id', quiz.id);
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this)
                }

                const choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice__option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice__option-arrow';

                const choiceOptionImgElement = document.createElement('img');
                choiceOptionImgElement.setAttribute('src', "img/Arrow.png");
                choiceOptionImgElement.setAttribute('alt', "Стрелка");

                choiceOptionArrowElement.appendChild(choiceOptionImgElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    }

    chooseQuiz(element) {
        const dataId = element.getAttribute('data-id');
        localStorage.setItem('id', dataId)
        if (dataId) {
            location.href = "#/test"
        }
    }
}