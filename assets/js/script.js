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

        request.open("GET", `/delete?id=${id}`);
        request.send();
    }
});

document.addEventListener('click', (event) => {
    if(event.target.id == 'check' || event.target.id == 'uncheck'){

        var status = 0, sendstatus = 1;
        if(event.target.id == 'check'){
            status =  1;
            sendstatus = 0;
        }

        var liel = event.target;
        liel = liel.parentElement;
        liel = liel.parentElement;
        var id = liel.id;

        var request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200){
                var el = event.target;
                var newEl = document.createElement('img');
                if(status){
                    newEl.setAttribute('id', 'uncheck');
                    newEl.setAttribute('src', '/assets/img/uncheck.png');
                    liel.removeAttribute('class');
                    el.parentNode.replaceChild(newEl, el);
                }
                else{
                    newEl.setAttribute('id', 'check');
                    newEl.setAttribute('src', '/assets/img/check.png');
                    liel.setAttribute('class', 'doneli');
                    el.parentNode.replaceChild(newEl, el);
                }
            }
        };

        request.open('GET', `/isdone?id=${id}&status=${sendstatus}`);
        request.send();
    }
});

document.addEventListener('click', (event) => {
    if(event.target.id == 'clear'){
        /* var el = event.target; */
        if ($('ul').is(':empty')){
            return;
          }
        console.log("ok");
        $('ul').empty();
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
            }
        }

        request.open("GET", '/clear');
        request.send();
    }
});