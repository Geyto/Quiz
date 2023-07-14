(function (){
   const List = {
       linkListElement: null,
       init(){
           const url = new URL(location.href);
           const testId = url.searchParams.get('id');
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
                   this.showQuestion();
               } else {
                   location.href = 'index.html';
               }
           } else {
               location.href = 'index.html';
           }
       },
       showQuestion(){

       },
   }
   List.init();
})()