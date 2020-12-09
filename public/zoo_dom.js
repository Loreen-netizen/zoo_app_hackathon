let nameElem = document.QuerySelector(".name");
let greetElem = document.QuerySelector(".greet");
let greetMe = document.QuerySelector(".greetMe");

let greetTemplateText = Handlebars.compile(greetElem.innerHTML);
let greetTemplate = compileTemplate(greetTemplateText);

axios
    .get('/api/user')
    .then(function(results) {
        let response = results.data;
        let data = response.data;
        greetMe.innerHTML = greetTemplate({
            greet: data
        });

    });