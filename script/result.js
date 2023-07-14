(function (){
    const Result = {
        linkResult: null,
        init(){
            const url = new URL(location.href);
            document.getElementById('result__score').innerText = url.searchParams.get('score') +'/' + url.searchParams.get('total');
        },
    }
    Result.init();
})();