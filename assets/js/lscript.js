document.addEventListener('click', (event) => {
    if(event.target.id == 'del'){
        var liel = event.target;
        liel = liel.parentElement;
        liel = liel.parentElement;

        var id = liel.id;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                liel.parentNode.removeChild(liel);
            }
        }

        request.open("GET", `/deletelist?id=${id}`);
        request.send();
    }
});