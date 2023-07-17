(function (){
   const List = {
       linkListElement: null,
       quizAnswer: null,
       quiz: null,
       optionsElement: null,
       currentQuestionIndex: 0,
       answerUser: null,
       backLinkElement: null,
       init(){
           const testId = localStorage.getItem('id')
           this.answerUser = localStorage.getItem('answer').split(',');
           this.backLinkElement = document.getElementById('backLink');
           this.backLinkElement.addEventListener('click', this.backLink);
           if (testId) {
               const xhrQuestions = new XMLHttpRequest();
               const xhrAnswer = new XMLHttpRequest();
               xhrQuestions.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
               xhrAnswer.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
               xhrQuestions.send();
               xhrAnswer.send();
               if (xhrAnswer.status === 200 && xhrAnswer.responseText) {
                   try {
                       this.quizAnswer = JSON.parse(xhrAnswer.responseText);
                   } catch (e) {
                       location.href = 'index.html';
                   }
               } else {
                   location.href = 'index.html';
               }
               if (xhrQuestions.status === 200 && xhrQuestions.responseText) {
                   try {
                       this.quiz = JSON.parse(xhrQuestions.responseText);
                   } catch (e) {
                       location.href = 'index.html';
                   }
                   this.showQuestion();
                   this.showAnswer();
               } else {
                   location.href = 'index.html';
               }
           } else {
               location.href = 'index.html';
           }
       },

       showQuestion(){
           document.getElementById('nameTest').innerText = this.quiz.name;
           this.optionsElement = document.getElementById('listQuestions');
           const questions = this.quiz.questions;
           this.optionsElement.innerHTML = '';
           for (let i = 0; i < questions.length; i++){
               const optionElement = document.createElement('div');
               optionElement.className = 'list__question';
               const nameQuestionElement = document.createElement('div');
               nameQuestionElement.className = 'name__question'
               nameQuestionElement.innerHTML = '<span class="name__question-span">Вопрос ' + (+i+1) + ':</span> ' + questions[i].question;
               const answerQuestionElements = document.createElement('div');
               answerQuestionElements.className = 'answer__questions';
               for(let x = 0; x < questions[i].answers.length; x++){
                   const answerOptionElement = document.createElement('div');
                   answerOptionElement.className = 'answer__option';
                   answerOptionElement.id = questions[i].answers[x].id
                   const circleElement = document.createElement('div');
                   circleElement.className = 'circle';
                   const answerElement = document.createElement('div');
                   answerElement.className = 'answer__question';
                   answerElement.innerText = questions[i].answers[x].answer
                   answerOptionElement.appendChild(circleElement);
                   answerOptionElement.appendChild(answerElement);
                   answerQuestionElements.appendChild(answerOptionElement);
               }

               optionElement.appendChild(nameQuestionElement);
               optionElement.appendChild(answerQuestionElements);
               this.optionsElement.appendChild(optionElement);
           }
       },
       showAnswer(){
           for(let i = 0; i <= this.quizAnswer.length; i++){
               if (this.quizAnswer[i] === +this.answerUser[i]){
                   const activeElement = document.getElementById(this.answerUser[i]);
                   activeElement.firstChild.classList.add('circle-right');
                   activeElement.lastChild.classList.add('answer-right');
               }else {
                   const activeElement = document.getElementById(this.answerUser[i]);
                   activeElement.lastChild.classList.add('answer-error');
                   console.log(activeElement);
                   activeElement.firstChild.classList.add('circle-error');
               }
           }
       },
       backLink(){

           location.href = 'result.html';
       }
   }
   List.init();
})()