import { operation_modes, consumer_modes } from "./data.js";

export function clearInputFields()
{
    const inputfields = document.getElementsByTagName("input");
    for (let i = 0; i < inputfields.length; i++)
    {
        inputfields[i].value = "";
    }
}

export function RenderCredentialsLayout(op_mode, cons_mode)
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
    primaryButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const secondaryButton = document.createElement("button");
    secondaryButton.id = "secondary_button";
    secondaryButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignUp" : "SignIn"}`;

    const tertiaryButton = document.createElement("button");
    tertiaryButton.id = "tertiary_button";
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

    return { primaryButton, secondaryButton, tertiaryButton };
}

export function RenderPreviewCourses(courses)
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

export function RenderPurchasedCourses(courses)
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

export function RenderUserLayout(username)
{
    const gap = "30px";

    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    accountTypeText.innerHTML = "User " + username;

    maindiv.appendChild(accountTypeText);
    maindiv.appendChild(document.createElement("br"));

    const previewButton = document.createElement("button");
    previewButton.id = "preview_button";
    previewButton.innerText = "Preview Courses";
    previewButton.style.marginRight = gap;

    maindiv.appendChild(previewButton);
    //maindiv.appendChild(document.createElement("hr"));

    const coursesButton = document.createElement("button");
    coursesButton.id = "courses_button";
    coursesButton.innerText = "View Courses";
    coursesButton.style.marginLeft = gap;

    maindiv.appendChild(coursesButton);
    maindiv.appendChild(document.createElement("br"));

    const signOutButton = document.createElement("button");
    signOutButton.id = "back_button";
    signOutButton.innerText = "SignOut";
    signOutButton.style.marginTop = "5px";

    maindiv.appendChild(signOutButton);

    return { previewButton, coursesButton, signOutButton };
}

export function RenderAdminLayout()
{
    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    accountTypeText.innerHTML = "Admin ";

    maindiv.appendChild(accountTypeText);
    maindiv.appendChild(document.createElement("br"));
}


export function ClearMainDivLayout()
{
    document.getElementById("maindiv").innerHTML = "";
}



export function AdminMode(op_mode)
{
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `Admin ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Browse courses !";

    const tertiary_button = document.getElementById("tertiary_button");
    tertiary_button.innerText = "Browse";
}

export function UserMode(op_mode)
{
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `User ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Are you a Creator ?";

    const tertiary_button = document.getElementById("tertiary_button");
    tertiary_button.innerText = "Creator";
}