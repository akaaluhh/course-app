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

//  Send RPCs via primary
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
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(request_body)
    });

    if (response)
    {
        console.log(response.json);
    }
}

//  Switch between SignIn/SignUp operation modes via secondary {  operation mode  }
async function secondary()
{
    clearInputFields();
    switch (op_mode)
    {
        case operation_modes.SIGNIN:
            AddSignUpElements();
            op_mode = operation_modes.SIGNUP;
            break;
        case operation_modes.SIGNUP:
            RemoveSignUpElements();
            op_mode = operation_modes.SIGNIN;
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

function AddSignUpElements()
{
    const inputdiv = document.getElementById("inputdiv");
    const firstNameInput = document.createElement("input");
    const lastNameInput = document.createElement("input");
    const emailInput = document.getElementById("user_email");

    firstNameInput.type = "text";
    firstNameInput.placeholder = "First Name";
    firstNameInput.id = "input_fname";

    lastNameInput.type = "text";
    lastNameInput.placeholder = "Last Name";
    lastNameInput.id = "input_lname";

    inputdiv.innerHTML += "<br>";
    inputdiv.appendChild(firstNameInput);
    inputdiv.innerHTML += "<br>";
    inputdiv.appendChild(lastNameInput);

    const primaryButton = document.getElementById("primary_button");
    primaryButton.innerText = "Sign Up";

    const secondaryButton = document.getElementById("secondary_button");
    secondaryButton.innerText = "Sign In";

    const operation_mode_text = document.getElementById("operation_mode");
    operation_mode_text.innerText = "Already have an account ?";

    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `${cons_mode === consumer_modes.ADMIN ? "Admin" : "User"} SignUp`;
}

function RemoveSignUpElements()
{
    const inputdiv = document.getElementById("inputdiv");
    const firstNameInput = document.getElementById("input_fname");
    const lastNameInput = document.getElementById("input_lname");

    let linebreak = firstNameInput.previousSibling;
    inputdiv.removeChild(linebreak);

    linebreak = lastNameInput.previousSibling;
    inputdiv.removeChild(linebreak);

    inputdiv.removeChild(firstNameInput);
    inputdiv.removeChild(lastNameInput);

    const primaryButton = document.getElementById("primary_button");
    primaryButton.innerText = "Sign In";

    const secondaryButton = document.getElementById("secondary_button");
    secondaryButton.innerText = "Sign Up";

    const operation_mode_text = document.getElementById("operation_mode");
    operation_mode_text.innerText = "Don't have an account ?"

    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `${cons_mode === consumer_modes.ADMIN ? "Admin" : "User"} SignIn`;
}

function AdminMode()
{
    cons_mode = consumer_modes.ADMIN;
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `Admin ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Browse courses !";

    const tertiary_button = document.getElementById("tertiary");
    tertiary_button.innerText = "Browse";
}

function UserMode()
{
    cons_mode = consumer_modes.USER;
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `User ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Are you a Creator ?";

    const tertiary_button = document.getElementById("tertiary");
    tertiary_button.innerText = "Creator";
}