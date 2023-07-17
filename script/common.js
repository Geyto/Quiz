function checkUserData(){
    const name = localStorage.getItem('nameUser')
    const lastName = localStorage.getItem('lastNameUser')
    const email = localStorage.getItem('mail')

    if (!name || !lastName || !email){
        location.href = 'index.html';
    }
}