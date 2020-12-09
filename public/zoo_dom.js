let nameElem = document.querySelector(".name");
let buttonElem = document.getElementById(".button");
let greetElem = document.querySelector(".greet");
let greetMe = document.querySelector(".greetMe");

let greetTemplateText = document.querySelector('.greetTemplateText').innerHTML;
let greetTemplate = Handlebars.compile(greetTemplateText);

function action() {
    axios
        .get('/api/user')
        .then(function(results) {
            let response = results.data;
            let data = response.data;
            greetMe.innerHTML = greetTemplateText({
                greet: data
            });

        });
}







buttonElem.addEventListener("click", action);
// buttonElem.addEventListener("click", action);