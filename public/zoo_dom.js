let nameElem = document.querySelector(".name");
let greetElem = document.querySelector(".greet");
let greetMe = document.querySelector(".greetMe");

let greetTemplateText = document.querySelector('.greetTemplateText').innerHTML;
let greetTemplate = Handlebars.compile(greetTemplateText);

axios
    .get('/api/user')
    .then(function(results) {
        let response = results.data;
        let data = response.data;
        greetMe.innerHTML = greetTemplate({
            greet: data
        });

    });