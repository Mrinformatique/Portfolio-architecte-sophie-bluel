window.onload = function() {
    if(isConnected()) {
        document.getElementById('loginlink').innerText = 'logout';
    }
}


 // Fonction pour voir si l'utilisateur est connecté
function isConnected() {
    const userId = localStorage.getItem('userId');

    return null !== userId;
}
