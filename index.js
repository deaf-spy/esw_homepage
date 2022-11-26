

var current = null;

const email = document.getElementById('email');
const password = document.getElementById('password');
const submitButton = document.querySelector('submit');

function addAnimeJSTransitions() {
    email.addEventListener('focus', function (e) {
        if (current) current.pause();
        current = anime({
            targets: 'path',
            strokeDashoffset: {
                value: 0,
                duration: 700,
                easing: 'easeOutQuart'
            },
            strokeDasharray: {
                value: '240 1386',
                duration: 700,
                easing: 'easeOutQuart'
            }
        });
    });

    password.addEventListener('focus', function (e) {
        if (current) current.pause();
        current = anime({
            targets: 'path',
            strokeDashoffset: {
                value: -336,
                duration: 700,
                easing: 'easeOutQuart'
            },
            strokeDasharray: {
                value: '240 1386',
                duration: 700,
                easing: 'easeOutQuart'
            }
        });
    });

    submit.addEventListener('focus', function (e) {
        if (current) current.pause();
        current = anime({
            targets: 'path',
            strokeDashoffset: {
                value: -730,
                duration: 700,
                easing: 'easeOutQuart'
            },
            strokeDasharray: {
                value: '530 1386',
                duration: 700,
                easing: 'easeOutQuart'
            }
        });
    });

}
// addAnimeJSTransitions();

const form = document.getElementById('theForm');
const blogin = document.getElementById('Login');
const bsignup = document.getElementById('SignUp');

var isLogin = 0;// 0 for signup. 1 for login

blogin.addEventListener('click', function () {
    bsignup.classList.toggle('optionSelected');
    blogin.classList.toggle('optionSelected');
    isLogin = !isLogin;
});

bsignup.addEventListener('click', function() {
    bsignup.classList.toggle('optionSelected');
    blogin.classList.toggle('optionSelected');
    isLogin = !isLogin;
});

submit.addEventListener('click', function () {
    console.log("clicked");
    if (isLogin) {
        dashboard();
    } else {
       // just add new username and password to the OM2M database
    }
    
});

function dashboard() {
    // get request from onem2m for email and password
    // if they match then do:

    if (email.value != "admin" || password.value != "admin") {
        console.log("not admin")
        $('#text2').removeClass('hidden1');
        return;
    }

    // to do 

    console.log("dashboard")


    $('#right').insertBefore($('#right').prev('#left').hide().show('slow')).hide().show('slow');

    $('#left').html(`

    <div class="text">
    or add a new patient:
    </div>

    <div id="addPatient" class="patientForm">
        <input class = "input2" type="name" id="patientName" placeholder="name">
        <input class = "input2" type="age" id="patientAge" placeholder="age">
        <input class = "input2" type="gender" id="patientGender" placeholder="gender">
        <input class = "input2 submitClass" type="submit" id="patientSubmit" value="Submit">
    </div>


    `)

    $('#right').html(`
        <div class = "text" >
            Choose an existing patient:
        </div>

        <span class = "custom-dropdown">
        <select>
        <option> Shreyu </option> 
        <option> Sreenivas </option> 
        <option> Vrinda </option> 
        <option> Keshav </option> 
        </select> 
        </span>

        <div class = "text" >
        <div id = "collectData" class = "patientForm" >
        <input class = "input2 input3 submitClass" type = "submit" id = "collectData" value = "Collect Data/ View Analytics" >

        </div> 
        </div>
        

    `)

    // REPLACE SHERLOCK HOLMES WITH THE NAMES IN GET REQUEST




}