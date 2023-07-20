export class Result {
    constructor() {
        this.linkResult = null;
        document.getElementById('result__score').innerText = localStorage.getItem('score') + '/' + localStorage.getItem('total');
        this.linkResult = document.getElementById('link');
        console.log(this.linkResult)
        this.linkResult.addEventListener('click', this.findAnswer)
    }

    findAnswer() {
        location.href = '#/list';
    }
}