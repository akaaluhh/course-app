const consumer_modes = Object.freeze({
    USER: 'user',
    ADMIN: 'admin'
});

const operation_modes = Object.freeze({
    SIGNIN: 'signin',
    SIGNUP: 'signup'
});

let op_mode = operation_modes.SIGNIN;
let cons_mode = consumer_modes.USER;

refreshCredentialLayout();

//  Send SignIn/SignOut RPCs via primary
async function primary()
{
    const input_email = document.getElementById("input_email").value;
    const input_pw = document.getElementById("input_pw").value;
    let input_fname = {};
    let input_lname = {};
    let request_body = {};

    if (op_mode === operation_modes.SIGNUP)
    {
        input_fname = document.getElementById("input_fname").value;
        input_lname = document.getElementById("input_lname").value;

        request_body = {
            email: input_email,
            password: input_pw,
            firstName: input_fname,
            lastName: input_lname
        }
    } else
    {
        request_body = {
            email: input_email,
            password: input_pw,
        }
    }

    const response = await fetch(`http://localhost:3000/${cons_mode === consumer_modes.USER ? "user" : "admin"}/${op_mode === operation_modes.SIGNIN ? "signin" : "signup"}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        credentials: "same-origin",
        body: JSON.stringify(request_body)
    });

    if (response)
    {
        const responseCookie = response.headers.getSetCookie();

        if (response.status >= 300 && response.status < 400)
        {
            document.cookie = response.headers.getSetCookie();
            ClearMainDivLayout();
            if (cons_mode === consumer_modes.USER)
            {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                /* const userDetails = fetch("http://localhost:3000/user/me", requestOptions)
                    .then((response) => { return response.text(); })
                    .then((result) =>
                    {
                        console.log(result);
                        const userDetails = JSON.parse(result);
                        RenderUserLayout(userDetails.firstName + " " + userDetails.lastName);
                    }
                    )
                    .catch((error) => console.error(error)); */

                const response = await fetch(`http://localhost:3000/user/me`, requestOptions);
                const userDetails = await response.json();

                console.log(userDetails);
                RenderUserLayout(userDetails.firstName + " " + userDetails.lastName);
            }
            else
            {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch(`http://localhost:3000/admin/me`, requestOptions);
                const adminDetails = await response.json();

                RenderAdminLayout(adminDetails.firstName + " " + adminDetails.lastName);
            }
        }
    }
}

//  Switch between SignIn/SignUp operation modes via secondary {  operation mode  }
async function secondary()
{
    console.log("SECONDARY PRINTED");
    clearInputFields();
    switch (op_mode)
    {
        case operation_modes.SIGNIN:
            op_mode = operation_modes.SIGNUP;
            refreshCredentialLayout();
            break;
        case operation_modes.SIGNUP:
            op_mode = operation_modes.SIGNIN;
            refreshCredentialLayout();
            break;
        default:
            break;
    }
    //Create the sign up widget layout
}

//  Switch between User/Admin consumer modes via tertiary   {  consumer mode  }
async function tertiary()
{
    clearInputFields();
    switch (cons_mode)
    {
        case consumer_modes.USER:
            AdminMode();
            break;
        case consumer_modes.ADMIN:
            UserMode();
            break;
        default:
            break;
    }
    //Create the creator sign in widget layout
}

function clearInputFields()
{
    const inputfields = document.getElementsByTagName("input");
    for (let i = 0; i < inputfields.length; i++)
    {
        inputfields[i].value = "";
    }
}

function RenderCredentialsLayout()
{
    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    const inputdiv = document.createElement("div");
    const emailInput = document.createElement("input");
    const pwInput = document.createElement("input");
    const fnameInput = document.createElement("input");
    const lnameInput = document.createElement("input");

    inputdiv.id = "inputdiv";

    accountTypeText.className = "account_type";
    accountTypeText.id = "account_type";
    accountTypeText.innerHTML = `${cons_mode === consumer_modes.ADMIN ? "Admin" : "User"}` + ` ` + `${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    maindiv.appendChild(accountTypeText);
    maindiv.innerHTML += "<br>";
    maindiv.appendChild(inputdiv);

    emailInput.type = "text";
    emailInput.placeholder = "Email";
    emailInput.id = "input_email";

    pwInput.type = "text";
    pwInput.placeholder = "Password";
    pwInput.id = "input_pw";

    fnameInput.type = "text";
    fnameInput.placeholder = "First Name";
    fnameInput.id = "input_fname";

    lnameInput.type = "text";
    lnameInput.placeholder = "Last Name";
    lnameInput.id = "input_lname";

    const primaryButton = document.createElement("button");
    primaryButton.id = "primary_button";
    primaryButton.onclick = primary;
    primaryButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const secondaryButton = document.createElement("button");
    secondaryButton.id = "secondary_button";
    secondaryButton.onclick = secondary;
    secondaryButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignUp" : "SignIn"}`;

    const tertiaryButton = document.createElement("button");
    tertiaryButton.id = "tertiary_button";
    tertiaryButton.onclick = tertiary;
    tertiaryButton.innerText = `${cons_mode === consumer_modes.ADMIN ? "Browse" : "Creator"}`;

    const operationModeText = document.createElement("span");
    operationModeText.className = "operation_mode";
    operationModeText.id = "operation_mode";
    operationModeText.innerText = `${op_mode === operation_modes.SIGNIN ? "Don't have an account ?" : "Already have an account ?"}`;

    const consumerModeText = document.createElement("span");
    consumerModeText.className = "consumer_mode";
    consumerModeText.id = "consumer_mode";
    consumerModeText.innerText = `${cons_mode === consumer_modes.ADMIN ? "Browse courses !" : "Are you a Creator ?"}`;

    inputdiv.appendChild(emailInput);
    inputdiv.innerHTML += "<br>";
    inputdiv.appendChild(pwInput);
    if (op_mode === operation_modes.SIGNUP)
    {
        inputdiv.innerHTML += "<br>";
        inputdiv.appendChild(fnameInput);
        inputdiv.innerHTML += "<br>";
        inputdiv.appendChild(lnameInput);
    }
    maindiv.appendChild(primaryButton);
    maindiv.appendChild(document.createElement("br"));  // NOTE:- maindiv.innerHTML += "<br>" messes up the function binding for the above button
    maindiv.appendChild(operationModeText);
    maindiv.appendChild(secondaryButton);
    maindiv.appendChild(document.createElement("br"));
    maindiv.appendChild(consumerModeText);
    maindiv.appendChild(tertiaryButton);
}

function RenderPreviewCourses(courses)
{
    for (let i = 0; i < courses.length; i++)
    {
        const courseTitle = document.createElement("span");
        courseTitle.innerHTML = courses[i].title;
        courseTitle.className = "style_course";

        const courseDesc = document.createElement("span");
        courseDesc.innerHTML = courses[i].description;
        courseDesc.className = "style_course";

        maindiv.appendChild(document.createElement("hr"));
        maindiv.appendChild(courseTitle);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(courseDesc);
        maindiv.appendChild(document.createElement("hr"));
    }
}

function RenderPurchasedCourses(courses)
{
    for (let i = 0; i < courses.length; i++)
    {
        const courseTitle = document.createElement("span");
        courseTitle.innerHTML = courses[i].title;
        courseTitle.className = "style_course";

        const courseDesc = document.createElement("span");
        courseDesc.innerHTML = courses[i].description;
        courseDesc.className = "style_course";

        maindiv.appendChild(document.createElement("hr"));
        maindiv.appendChild(courseTitle);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(courseDesc);
        maindiv.appendChild(document.createElement("hr"));
    }
}

function RenderUserLayout(username)
{
    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    accountTypeText.innerHTML = "User " + username;

    maindiv.appendChild(accountTypeText);
    maindiv.appendChild(document.createElement("br"));

    const previewButton = document.createElement("button");
    previewButton.id = "preview_button";
    previewButton.onclick = PreviewCourses;
    previewButton.innerText = "Preview Courses";
    maindiv.appendChild(previewButton);

    maindiv.appendChild(document.createElement("hr"));

    const coursesButton = document.createElement("button");
    coursesButton.id = "courses_button";
    coursesButton.onclick = ViewOwnedCourses;
    coursesButton.innerText = "View Courses";
    maindiv.appendChild(coursesButton);
}

function RenderAdminLayout()
{
    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    accountTypeText.innerHTML = "Admin ";

    maindiv.appendChild(accountTypeText);
    maindiv.appendChild(document.createElement("br"));
}

async function PreviewCourses()
{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const response = await fetch("http://localhost:3000/course/preview", requestOptions);
    const courseData = await response.json();

    RenderPreviewCourses(courseData.courses);
}

async function ViewOwnedCourses()
{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const response = await fetch("http://localhost:3000/user/courses", requestOptions);
    const ownedCoursesData = await response.json();

    RenderPurchasedCourses(ownedCoursesData.courses);
}

function ClearMainDivLayout()
{
    document.getElementById("maindiv").innerHTML = "";
}

function refreshCredentialLayout()
{
    ClearMainDivLayout();
    RenderCredentialsLayout();
}

function AdminMode()
{
    cons_mode = consumer_modes.ADMIN;
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `Admin ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Browse courses !";

    const tertiary_button = document.getElementById("tertiary_button");
    tertiary_button.innerText = "Browse";
}

function UserMode()
{
    cons_mode = consumer_modes.USER;
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `User ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Are you a Creator ?";

    const tertiary_button = document.getElementById("tertiary_button");
    tertiary_button.innerText = "Creator";
}