(function (){
   const List = {
       linkListElement: null,
       quizAnswer: null,
       quiz: null,
       optionsElement: null,
       currentQuestionIndex: 0,
       answerUser: null,
       init(){
           const url = new URL(location.href);
           const testId = url.searchParams.get('id');
           this.answerUser = url.searchParams.get('result');
           console.log(this.answerUser)
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
                   console.log(this.quizAnswer)
               } else {
                   location.href = 'index.html';
               }
               if (xhrQuestions.status === 200 && xhrQuestions.responseText) {
                   try {
                       this.quiz = JSON.parse(xhrQuestions.responseText);
                   } catch (e) {
                       location.href = 'index.html';
                   }
                   console.log(this.quiz);
                   this.showQuestion();
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
           for (let i = 0; i <= questions.length; i++){
               const q = questions[i].question;
               const optionElement = document.createElement('div');
               optionElement.className = 'list__question';
               const nameQuestionElement = document.createElement('div');
               nameQuestionElement.className = 'name__question'
               nameQuestionElement.innerHTML = '<span class="name__question-span">Вопрос ' + (+i+1) + ':</span> ' + q;
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
               if (this.quizAnswer[i] === this.answerUser[i]){
                   document.getElementById(this.answerUser[i]).classList.add('answer-right');
               }else {
                   document.getElementById(this.answerUser[i]).classList.add('answer-error');
               }
           }
       },
   }
   List.init();
})()