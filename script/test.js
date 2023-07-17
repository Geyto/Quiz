(function () {
    const Test = {
        questionTitleElement: null,
        progressBarElement: null,
        optionsElement: null,
        quiz: null,
        nextBtnElement: null,
        passBtnElement: null,
        prevBtnElement: null,
        currentQuestionIndex: 1,
        userResult: [],
        init() {
            checkUserData();
            const testId = localStorage.getItem('id')
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.startQuiz();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        startQuiz() {

            this.progressBarElement = document.getElementById('progress-bar');
            this.questionTitleElement = document.getElementById('title');
            this.optionsElement = document.getElementById('options');
            this.nextBtnElement = document.getElementById('next');
            this.nextBtnElement.onclick = this.move.bind(this, 'next');
            this.passBtnElement = document.getElementById('pass');
            this.passBtnElement.onclick = this.move.bind(this, 'pass');
            document.getElementById('pre-title').innerText = this.quiz.name;


            this.prevBtnElement = document.getElementById('prev');
            this.prevBtnElement.onclick = this.move.bind(this, 'prev');
            this.prepareProgressBar();
            this.showQuestion();

            const timerElement = document.getElementById('timer');
            let seconds = 59;
            const interval = setInterval(function () {
                seconds--;
                timerElement.innerText = seconds;
                if (seconds === 0) {
                    clearInterval(interval);
                    this.complete();
                }
            }.bind(this), 1000)
        },
        showQuestion() {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + activeQuestion.question;
            this.optionsElement.innerHTML = '';
            const that = this;
            const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
            activeQuestion.answers.forEach(answer => {
                const optionElement = document.createElement('div');
                optionElement.className = 'test__question-option';

                const inputId = 'answer-' +
                    answer.id;

                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);
                if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                    inputElement.setAttribute('checked', 'checked');
                }

                inputElement.onchange = function () {
                    that.chooseAnswer();
                }

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);

                this.optionsElement.appendChild(optionElement);
            })
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextBtnElement.removeAttribute('disabled');
                this.passBtnElement.lastChild.removeAttribute('src');
                this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPassGrey.png');
                this.passBtnElement.classList.add('disabled')

            } else {
                this.nextBtnElement.setAttribute('disabled', 'disabled');
                this.passBtnElement.lastChild.removeAttribute('src');
                this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPass.png');
                this.passBtnElement.classList.remove('disabled')
            }
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextBtnElement.innerText = 'Завершить';
            } else {
                this.nextBtnElement.innerText = 'Дальше';
            }
            if (this.currentQuestionIndex > 1) {
                this.prevBtnElement.removeAttribute('disabled');
            } else {
                this.prevBtnElement.setAttribute('disabled', 'disabled');
            }
        },
        chooseAnswer() {
            this.nextBtnElement.removeAttribute('disabled');
            this.passBtnElement.lastChild.removeAttribute('src');
            this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPassGrey.png');
            this.passBtnElement.classList.add('disabled')
        },
        move(action) {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
                return element.checked;
            });
            let chosenAnswerId = null;
            if (chosenAnswer && chosenAnswer.value) {
                chosenAnswerId = Number(chosenAnswer.value);
            }
            const existingResult = this.userResult.find(item => {
                return item.questionId === activeQuestion.id
            })
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            } else {
                this.userResult.push({
                    questionId: activeQuestion.id, chosenAnswerId: chosenAnswerId,
                })
            }

            console.log(this.userResult)

            if (action === 'next' || action === 'pass') {
                this.currentQuestionIndex++;
            } else {
                this.currentQuestionIndex--;
            }
            if (this.currentQuestionIndex > this.quiz.questions.length) {
                this.complete();
                return;
            }

            Array.from(this.progressBarElement.children).forEach((item, index) => {
                const currentItemIndex = index + 1;
                item.classList.remove('complete');
                item.classList.remove('active');
                if (currentItemIndex === this.currentQuestionIndex) {
                    item.classList.add('active');
                } else if (currentItemIndex < this.currentQuestionIndex) {
                    item.classList.add('complete');
                }
            })
            this.showQuestion();
        },
        prepareProgressBar() {
            for (let i = 0; i < this.quiz.questions.length; i++) {
                const itemElement = document.createElement('div');
                itemElement.className = 'test__progress-bar__item ' + (i === 0 ? 'active' : '');
                const itemCircleElement = document.createElement('div');
                itemCircleElement.className = 'test__progress-bar__item-circle';
                const itemTextElement = document.createElement('div');
                itemTextElement.className = 'test__progress-bar__item-text';
                itemTextElement.innerText = 'Вопрос ' + (i + 1);
                itemElement.appendChild(itemCircleElement);
                itemElement.appendChild(itemTextElement);
                this.progressBarElement.appendChild(itemElement);

            }
        },
        complete() {
            const id = localStorage.getItem('id');
            const name = localStorage.getItem('nameUser');
            const lastName = localStorage.getItem('lastNameUser');
            const email = localStorage.getItem('mail');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://testologia.site/pass-quiz?id=' + id, false);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                results: this.userResult,
            }));
            if (xhr.status === 200 && xhr.responseText) {
                let result = null;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                if (result) {
                    let answerNumber = this.userResult.map(item =>{
                        return item.chosenAnswerId
                    })
                    localStorage.setItem('score', result.score)
                    localStorage.setItem('total', result.total)
                    localStorage.setItem('answer', answerNumber)
                    location.href = 'result.html'
                }
            } else {
                location.href = 'index.html';
            }
        },
    }
    Test.init()
})();