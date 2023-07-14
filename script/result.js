(function (){
    const Result = {
        linkResult: null,
        init(){
            const url = new URL(location.href);
            document.getElementById('result__score').innerText = url.searchParams.get('score') +'/' + url.searchParams.get('total');
            this.linkResult = document.getElementById('link');
            console.log(this.linkResult)
            this.linkResult.addEventListener('click', this.findAnswer)
        },
        findAnswer(){
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const score = url.searchParams.get('score');
            const total = url.searchParams.get('total');
            location.href = 'list.html?score=' + score + '&total=' + total + '&id=' +id;
        }
    }
    Result.init();
})();