

var current = null;

// Global OM2M data
cse_ip = "127.0.0.1"; // YOUR IP from ipconfig/ifconfig
cse_port = "8080";
server = "http://" + cse_ip + ":" + cse_port + "/~/in-cse/in-name/";
return_val = -1
users = []

delete_data = function(path){
    local_url = server + path

    fetch(local_url,{
        method : "DELETE",
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json;ty=3'
        },
    })
    .then(() => console.log("Removed or tried to remove something from database"))

}

make_cin = function(path, value) {

    local_url = server + path
    body = {
    "m2m:cin": {
        "con": value.toString(),
        "lbl": "",
        "cnf": "text"
    }
    }
    console.log(JSON.stringify(body))
    fetch(local_url,{
        method : "POST",
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json;ty=4'
        },
        body : JSON.stringify(body)
    })
    .then(response => response.json())
    .then(text => console.log(text + " hi"))

}

make_cnt = async function(path, cnt_name) {
    local_url = server + path
    console.log(local_url);
    body = {
    "m2m:cnt": {
        "rn": cnt_name,
        "mni": "120",
        "lbl": ""
    }
    }
    console.log(JSON.stringify(body))
    await fetch(local_url,{
        method : "POST",
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json;ty=3'
        },
        body : JSON.stringify(body)
    })
    .then(response => response.json())
    .then(text => console.log(text))
}

fetch_the_data = function(path) {
    local_url = server + path
    fetch(local_url,{
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json' 
        }
    })
    .then(response => response.json())
}

do_login = async function(path) {
    local_url = server + path
    console.log(local_url)
    await fetch(local_url,{
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json' 
        }
    })
    .then(response => {
        return_val = 0;
        var ret =  response.json();
        console.log(ret)
        return ret
    })
    .then(data => {    
        if ((data["m2m:cin"]["con"]) != password.value){
            console.log("Doctor's password is incorrect")
            $('#text2').removeClass('hidden1');
            return_val = -1;
        }
    })
    .catch(() => {
        console.log("Doctor doesn't exist")
        $('#text2').removeClass('hidden1');
        return_val = -1
    })
}

fill_the_users_list = async function(path) {
    local_url = server + path
    console.log(local_url)
    await fetch(local_url,{
        headers : {
            'X-M2M-Origin': 'admin:admin',
            'Content-type': 'application/json' 
        }
    })
    .then(response => {
        var ret =  response.json();
        return ret
    })
    .then(data => {
        for(i=0; i<data["m2m:cnt"]["m2m:cin"].length;i++){
            users.push(data["m2m:cnt"]["m2m:cin"][i]["con"])
        }
    })
    .catch(() => {
        console.log("Userlist error")
    })
}


const username = document.getElementById('username');
const password = document.getElementById('password');
const submitButton = document.querySelector('submit');

function addAnimeJSTransitions() {
    username.addEventListener('focus', function (e) {
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

submit.addEventListener('click', async function () {
    if (isLogin) {
        console.log("clicked login");
        dashboard();
    } else {
        console.log("clicked signup");
        await make_cnt("doc_login", username.value)
        await make_cin("doc_login/" + username.value, password.value)
    }
    
});

async function dashboard() {
    // get request from onem2m for username and password
    // if they match then do:

    await do_login("doc_login/" + username.value + "/la")

    if (return_val == -1) {
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

    await fill_the_users_list("Usernames/Names/?rcn=4")
    right_html = '<div class = "text" >\
        Choose an existing patient:\
        </div>\
        <span class = "custom-dropdown">\
        <select>'

    for(i=0;i<users.length;i++){
        right_html += '<option>' + users[i] + '</option>'
    }

    right_html += '</select>\
    </span>\
    <div class = "text" >\
    <div id = "collectData" class = "patientForm" >\
    <input class = "input2 input3 submitClass" type = "submit" id = "collectData" value = "Collect Data/ View Analytics" >\
    </div> \
    </div>'

    $('#right').html(right_html)

    // REPLACE SHERLOCK HOLMES WITH THE NAMES IN GET REQUEST




}