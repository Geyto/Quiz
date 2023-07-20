/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));\n    window.addEventListener('popstate', this.handleRouteChanging.bind(this));\n  }\n  handleRouteChanging() {\n    this.router.openRoute();\n  }\n}\nnew App();\n\n//# sourceURL=webpack://praktica-quiz/./src/app.js?");

/***/ }),

/***/ "./src/components/choice.js":
/*!**********************************!*\
  !*** ./src/components/choice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Choice: () => (/* binding */ Choice)\n/* harmony export */ });\n/* harmony import */ var _utils_url_menager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-menager.js */ \"./src/utils/url-menager.js\");\n\nclass Choice {\n  constructor() {\n    this.quizzes = [];\n    _utils_url_menager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData();\n    const xhr = new XMLHttpRequest();\n    xhr.open('GET', 'https://testologia.site/get-quizzes', false);\n    xhr.send();\n    if (xhr.status === 200 && xhr.responseText) {\n      try {\n        this.quizzes = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      this.processQuizzes();\n    } else {\n      location.href = '#/';\n    }\n  }\n  processQuizzes() {\n    const choiceOptionsElement = document.getElementById('choice__options');\n    if (this.quizzes && this.quizzes.length > 0) {\n      this.quizzes.forEach(quiz => {\n        const that = this;\n        const choiceOptionElement = document.createElement('div');\n        choiceOptionElement.className = 'choice__option';\n        choiceOptionElement.setAttribute('data-id', quiz.id);\n        choiceOptionElement.onclick = function () {\n          that.chooseQuiz(this);\n        };\n        const choiceOptionTextElement = document.createElement('div');\n        choiceOptionTextElement.className = 'choice__option-text';\n        choiceOptionTextElement.innerText = quiz.name;\n        const choiceOptionArrowElement = document.createElement('div');\n        choiceOptionArrowElement.className = 'choice__option-arrow';\n        const choiceOptionImgElement = document.createElement('img');\n        choiceOptionImgElement.setAttribute('src', \"img/Arrow.png\");\n        choiceOptionImgElement.setAttribute('alt', \"Стрелка\");\n        choiceOptionArrowElement.appendChild(choiceOptionImgElement);\n        choiceOptionElement.appendChild(choiceOptionTextElement);\n        choiceOptionElement.appendChild(choiceOptionArrowElement);\n        choiceOptionsElement.appendChild(choiceOptionElement);\n      });\n    }\n  }\n  chooseQuiz(element) {\n    const dataId = element.getAttribute('data-id');\n    localStorage.setItem('id', dataId);\n    if (dataId) {\n      location.href = \"#/test\";\n    }\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/components/choice.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\n  constructor() {\n    this.agreeElement = null;\n    this.processElement = null;\n    this.fields = [{\n      name: 'name',\n      id: 'name',\n      element: null,\n      regex: /^[А-Я][а-я]+\\s*$/,\n      valid: false\n    }, {\n      name: 'lastName',\n      id: 'last-name',\n      element: null,\n      regex: /^[А-Я][а-я]+\\s*$/,\n      valid: false\n    }, {\n      name: 'email',\n      id: 'email',\n      element: null,\n      regex: /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\n      valid: false\n    }];\n    const that = this;\n    this.fields.forEach(item => {\n      item.element = document.getElementById(item.id);\n      item.element.onchange = function () {\n        that.validateField.call(that, item, this);\n      };\n    });\n    this.processElement = document.getElementById('process');\n    this.processElement.onclick = function () {\n      that.processForm();\n    };\n    this.agreeElement = document.getElementById('agree');\n    this.agreeElement.onchange = function () {\n      that.validateForm();\n    };\n  }\n  validateField(field, element) {\n    if (!element.value || !element.value.match(field.regex)) {\n      element.parentNode.style.borderColor = 'red';\n      field.valid = false;\n    } else {\n      element.parentNode.removeAttribute('style');\n      field.valid = true;\n    }\n    this.validateForm();\n  }\n  validateForm() {\n    const validForm = this.fields.every(item => item.valid);\n    const isvalid = this.agreeElement.checked && validForm;\n    if (isvalid) {\n      this.processElement.removeAttribute('disabled');\n    } else {\n      this.processElement.setAttribute('disabled', 'disabled');\n    }\n    return isvalid;\n  }\n  processForm() {\n    if (this.validateForm()) {\n      localStorage.setItem('nameUser', this.fields[0].element.value);\n      localStorage.setItem('lastNameUser', this.fields[1].element.value);\n      localStorage.setItem('mail', this.fields[2].element.value);\n      location.href = '#/choice';\n    }\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/components/form.js?");

/***/ }),

/***/ "./src/components/list.js":
/*!********************************!*\
  !*** ./src/components/list.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   List: () => (/* binding */ List)\n/* harmony export */ });\nclass List {\n  constructor() {\n    this.linkListElement = null;\n    this.quizAnswer = null;\n    this.quiz = null;\n    this.optionsElement = null;\n    this.currentQuestionIndex = 0;\n    this.answerUser = null;\n    this.backLinkElement = null;\n    const testId = localStorage.getItem('id');\n    this.answerUser = localStorage.getItem('answer').split(',');\n    this.backLinkElement = document.getElementById('backLink');\n    this.backLinkElement.addEventListener('click', this.backLink);\n    if (testId) {\n      const xhrQuestions = new XMLHttpRequest();\n      const xhrAnswer = new XMLHttpRequest();\n      xhrQuestions.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);\n      xhrAnswer.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);\n      xhrQuestions.send();\n      xhrAnswer.send();\n      if (xhrAnswer.status === 200 && xhrAnswer.responseText) {\n        try {\n          this.quizAnswer = JSON.parse(xhrAnswer.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n      } else {\n        location.href = '#/';\n      }\n      if (xhrQuestions.status === 200 && xhrQuestions.responseText) {\n        try {\n          this.quiz = JSON.parse(xhrQuestions.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n        this.showQuestion();\n        this.showAnswer();\n      } else {\n        location.href = '#/';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n  showQuestion() {\n    document.getElementById('data').innerText = ' ' + localStorage.getItem('nameUser') + ' ' + localStorage.getItem('lastNameUser') + ',' + localStorage.getItem('mail');\n    document.getElementById('nameTest').innerText = this.quiz.name;\n    this.optionsElement = document.getElementById('listQuestions');\n    const questions = this.quiz.questions;\n    this.optionsElement.innerHTML = '';\n    for (let i = 0; i < questions.length; i++) {\n      const optionElement = document.createElement('div');\n      optionElement.className = 'list__question';\n      const nameQuestionElement = document.createElement('div');\n      nameQuestionElement.className = 'name__question';\n      nameQuestionElement.innerHTML = '<span class=\"name__question-span\">Вопрос ' + (+i + 1) + ':</span> ' + questions[i].question;\n      const answerQuestionElements = document.createElement('div');\n      answerQuestionElements.className = 'answer__questions';\n      for (let x = 0; x < questions[i].answers.length; x++) {\n        const answerOptionElement = document.createElement('div');\n        answerOptionElement.className = 'answer__option';\n        answerOptionElement.id = questions[i].answers[x].id;\n        const circleElement = document.createElement('div');\n        circleElement.className = 'circle';\n        const answerElement = document.createElement('div');\n        answerElement.className = 'answer__question';\n        answerElement.innerText = questions[i].answers[x].answer;\n        answerOptionElement.appendChild(circleElement);\n        answerOptionElement.appendChild(answerElement);\n        answerQuestionElements.appendChild(answerOptionElement);\n      }\n      optionElement.appendChild(nameQuestionElement);\n      optionElement.appendChild(answerQuestionElements);\n      this.optionsElement.appendChild(optionElement);\n    }\n  }\n  showAnswer() {\n    for (let i = 0; i <= this.quizAnswer.length; i++) {\n      if (this.quizAnswer[i] === +this.answerUser[i]) {\n        const activeElement = document.getElementById(this.answerUser[i]);\n        activeElement.firstChild.classList.add('circle-right');\n        activeElement.lastChild.classList.add('answer-right');\n      } else {\n        const activeElement = document.getElementById(this.answerUser[i]);\n        activeElement.lastChild.classList.add('answer-error');\n        console.log(activeElement);\n        activeElement.firstChild.classList.add('circle-error');\n      }\n    }\n  }\n  backLink() {\n    location.href = '#/result';\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/components/list.js?");

/***/ }),

/***/ "./src/components/result.js":
/*!**********************************!*\
  !*** ./src/components/result.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Result: () => (/* binding */ Result)\n/* harmony export */ });\nclass Result {\n  constructor() {\n    this.linkResult = null;\n    document.getElementById('result__score').innerText = localStorage.getItem('score') + '/' + localStorage.getItem('total');\n    this.linkResult = document.getElementById('link');\n    console.log(this.linkResult);\n    this.linkResult.addEventListener('click', this.findAnswer);\n  }\n  findAnswer() {\n    location.href = '#/list';\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/components/result.js?");

/***/ }),

/***/ "./src/components/test.js":
/*!********************************!*\
  !*** ./src/components/test.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Test: () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _utils_url_menager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-menager.js */ \"./src/utils/url-menager.js\");\n\nclass Test {\n  constructor() {\n    this.questionTitleElement = null;\n    this.progressBarElement = null;\n    this.optionsElement = null;\n    this.quiz = null;\n    this.nextBtnElement = null;\n    this.passBtnElement = null;\n    this.prevBtnElement = null;\n    this.currentQuestionIndex = 1;\n    this.userResult = [];\n    _utils_url_menager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData();\n    const testId = localStorage.getItem('id');\n    if (testId) {\n      const xhr = new XMLHttpRequest();\n      xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n        this.startQuiz();\n      } else {\n        location.href = '#/';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n  startQuiz() {\n    this.progressBarElement = document.getElementById('progress-bar');\n    this.questionTitleElement = document.getElementById('question-title');\n    this.optionsElement = document.getElementById('options');\n    this.nextBtnElement = document.getElementById('next');\n    this.nextBtnElement.onclick = this.move.bind(this, 'next');\n    this.passBtnElement = document.getElementById('pass');\n    this.passBtnElement.onclick = this.move.bind(this, 'pass');\n    document.getElementById('pre-title').innerText = this.quiz.name;\n    this.prevBtnElement = document.getElementById('prev');\n    this.prevBtnElement.onclick = this.move.bind(this, 'prev');\n    this.prepareProgressBar();\n    this.showQuestion();\n    const timerElement = document.getElementById('timer');\n    let seconds = 59;\n    const interval = setInterval(function () {\n      seconds--;\n      timerElement.innerText = seconds;\n      if (seconds === 0) {\n        clearInterval(interval);\n        this.complete();\n      }\n    }.bind(this), 1000);\n  }\n  showQuestion() {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    console.log(activeQuestion);\n    this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + activeQuestion.question;\n    this.optionsElement.innerHTML = '';\n    const that = this;\n    const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);\n    activeQuestion.answers.forEach(answer => {\n      const optionElement = document.createElement('div');\n      optionElement.className = 'test__question-option';\n      const inputId = 'answer-' + answer.id;\n      const inputElement = document.createElement('input');\n      inputElement.className = 'option-answer';\n      inputElement.setAttribute('id', inputId);\n      inputElement.setAttribute('type', 'radio');\n      inputElement.setAttribute('name', 'answer');\n      inputElement.setAttribute('value', answer.id);\n      if (chosenOption && chosenOption.chosenAnswerId === answer.id) {\n        inputElement.setAttribute('checked', 'checked');\n      }\n      inputElement.onchange = function () {\n        that.chooseAnswer();\n      };\n      const labelElement = document.createElement('label');\n      labelElement.setAttribute('for', inputId);\n      labelElement.innerText = answer.answer;\n      optionElement.appendChild(inputElement);\n      optionElement.appendChild(labelElement);\n      this.optionsElement.appendChild(optionElement);\n    });\n    if (chosenOption && chosenOption.chosenAnswerId) {\n      this.nextBtnElement.removeAttribute('disabled');\n      this.passBtnElement.lastChild.removeAttribute('src');\n      this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPassGrey.png');\n      this.passBtnElement.classList.add('disabled');\n    } else {\n      this.nextBtnElement.setAttribute('disabled', 'disabled');\n      this.passBtnElement.lastChild.removeAttribute('src');\n      this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPass.png');\n      this.passBtnElement.classList.remove('disabled');\n    }\n    if (this.currentQuestionIndex === this.quiz.questions.length) {\n      this.nextBtnElement.innerText = 'Завершить';\n    } else {\n      this.nextBtnElement.innerText = 'Дальше';\n    }\n    if (this.currentQuestionIndex > 1) {\n      this.prevBtnElement.removeAttribute('disabled');\n    } else {\n      this.prevBtnElement.setAttribute('disabled', 'disabled');\n    }\n  }\n  chooseAnswer() {\n    this.nextBtnElement.removeAttribute('disabled');\n    this.passBtnElement.lastChild.removeAttribute('src');\n    this.passBtnElement.lastChild.setAttribute('src', 'img/ArrowPassGrey.png');\n    this.passBtnElement.classList.add('disabled');\n  }\n  move(action) {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {\n      return element.checked;\n    });\n    let chosenAnswerId = null;\n    if (chosenAnswer && chosenAnswer.value) {\n      chosenAnswerId = Number(chosenAnswer.value);\n    }\n    const existingResult = this.userResult.find(item => {\n      return item.questionId === activeQuestion.id;\n    });\n    if (existingResult) {\n      existingResult.chosenAnswerId = chosenAnswerId;\n    } else {\n      this.userResult.push({\n        questionId: activeQuestion.id,\n        chosenAnswerId: chosenAnswerId\n      });\n    }\n    console.log(this.userResult);\n    if (action === 'next' || action === 'pass') {\n      this.currentQuestionIndex++;\n    } else {\n      this.currentQuestionIndex--;\n    }\n    if (this.currentQuestionIndex > this.quiz.questions.length) {\n      this.complete();\n      return;\n    }\n    Array.from(this.progressBarElement.children).forEach((item, index) => {\n      const currentItemIndex = index + 1;\n      item.classList.remove('complete');\n      item.classList.remove('active');\n      if (currentItemIndex === this.currentQuestionIndex) {\n        item.classList.add('active');\n      } else if (currentItemIndex < this.currentQuestionIndex) {\n        item.classList.add('complete');\n      }\n    });\n    this.showQuestion();\n  }\n  prepareProgressBar() {\n    for (let i = 0; i < this.quiz.questions.length; i++) {\n      const itemElement = document.createElement('div');\n      itemElement.className = 'test__progress-bar__item ' + (i === 0 ? 'active' : '');\n      const itemCircleElement = document.createElement('div');\n      itemCircleElement.className = 'test__progress-bar__item-circle';\n      const itemTextElement = document.createElement('div');\n      itemTextElement.className = 'test__progress-bar__item-text';\n      itemTextElement.innerText = 'Вопрос ' + (i + 1);\n      itemElement.appendChild(itemCircleElement);\n      itemElement.appendChild(itemTextElement);\n      this.progressBarElement.appendChild(itemElement);\n    }\n  }\n  complete() {\n    const id = localStorage.getItem('id');\n    const name = localStorage.getItem('nameUser');\n    const lastName = localStorage.getItem('lastNameUser');\n    const email = localStorage.getItem('mail');\n    const xhr = new XMLHttpRequest();\n    xhr.open('POST', 'https://testologia.site/pass-quiz?id=' + id, false);\n    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');\n    xhr.send(JSON.stringify({\n      name: name,\n      lastName: lastName,\n      email: email,\n      results: this.userResult\n    }));\n    if (xhr.status === 200 && xhr.responseText) {\n      let result = null;\n      try {\n        result = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      if (result) {\n        let answerNumber = this.userResult.map(item => {\n          return item.chosenAnswerId;\n        });\n        localStorage.setItem('score', result.score);\n        localStorage.setItem('total', result.total);\n        localStorage.setItem('answer', answerNumber);\n        location.href = '#/result';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/components/test.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form.js */ \"./src/components/form.js\");\n/* harmony import */ var _components_choice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/choice.js */ \"./src/components/choice.js\");\n/* harmony import */ var _components_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/test.js */ \"./src/components/test.js\");\n/* harmony import */ var _components_result_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/result.js */ \"./src/components/result.js\");\n/* harmony import */ var _components_list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/list.js */ \"./src/components/list.js\");\n\n\n\n\n\nclass Router {\n  constructor() {\n    this.routes = [{\n      route: '#/',\n      title: 'Главная',\n      template: 'templates/index.html',\n      styles: 'styles/index.css',\n      load: () => {}\n    }, {\n      route: '#/form',\n      title: 'Регистрация',\n      template: 'templates/form.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form();\n      }\n    }, {\n      route: '#/choice',\n      title: 'Выбор теста',\n      template: 'templates/choice.html',\n      styles: 'styles/choice.css',\n      load: () => {\n        new _components_choice_js__WEBPACK_IMPORTED_MODULE_1__.Choice();\n      }\n    }, {\n      route: '#/test',\n      title: 'Прохождение теста',\n      template: 'templates/test.html',\n      styles: 'styles/test.css',\n      load: () => {\n        new _components_test_js__WEBPACK_IMPORTED_MODULE_2__.Test();\n      }\n    }, {\n      route: '#/result',\n      title: 'Результаты',\n      template: 'templates/result.html',\n      styles: 'styles/result.css',\n      load: () => {\n        new _components_result_js__WEBPACK_IMPORTED_MODULE_3__.Result();\n      }\n    }, {\n      route: '#/list',\n      title: 'Лист ответов',\n      template: 'templates/list.html',\n      styles: 'styles/list.css',\n      load: () => {\n        new _components_list_js__WEBPACK_IMPORTED_MODULE_4__.List();\n      }\n    }];\n  }\n  async openRoute() {\n    const newRoute = this.routes.find(item => {\n      return item.route === window.location.hash;\n    });\n    if (!newRoute) {\n      window.location.href = '#/';\n      return;\n    }\n    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());\n    document.getElementById('styles').setAttribute('href', newRoute.styles);\n    document.getElementById('title').innerText = newRoute.title;\n    newRoute.load();\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/router.js?");

/***/ }),

/***/ "./src/utils/url-menager.js":
/*!**********************************!*\
  !*** ./src/utils/url-menager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UrlManager: () => (/* binding */ UrlManager)\n/* harmony export */ });\nclass UrlManager {\n  static checkUserData() {\n    const name = localStorage.getItem('nameUser');\n    const lastName = localStorage.getItem('lastNameUser');\n    const email = localStorage.getItem('mail');\n    if (!name || !lastName || !email) {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://praktica-quiz/./src/utils/url-menager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;