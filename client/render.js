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

    const RegisterButton = document.createElement("button");
    RegisterButton.id = "Register_button";
    RegisterButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const switchOperationButton = document.createElement("button");
    switchOperationButton.id = "switchOperation_button";
    switchOperationButton.innerText = `${op_mode === operation_modes.SIGNIN ? "SignUp" : "SignIn"}`;

    const switchUserButton = document.createElement("button");
    switchUserButton.id = "switchUser_button";
    switchUserButton.innerText = `${cons_mode === consumer_modes.ADMIN ? "Browse" : "Creator"}`;

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
    maindiv.appendChild(RegisterButton);
    maindiv.appendChild(document.createElement("br"));  // NOTE:- maindiv.innerHTML += "<br>" messes up the function binding for the above button
    maindiv.appendChild(operationModeText);
    maindiv.appendChild(switchOperationButton);
    maindiv.appendChild(document.createElement("br"));
    maindiv.appendChild(consumerModeText);
    maindiv.appendChild(switchUserButton);

    return { RegisterButton, switchOperationButton, switchUserButton };
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

export function RenderAdminLayout(username)
{
    const gap = "30px";

    const maindiv = document.getElementById("maindiv");
    const accountTypeText = document.createElement("span");
    accountTypeText.innerHTML = "Admin " + username;

    maindiv.appendChild(accountTypeText);
    maindiv.appendChild(document.createElement("br"));

    const myCoursesButton = document.createElement("button");
    myCoursesButton.id = "my_courses";
    myCoursesButton.innerText = "My Courses";
    myCoursesButton.style.marginRight = gap;

    maindiv.appendChild(myCoursesButton);

    const addCourseButton = document.createElement("button");
    addCourseButton.id = "add_course";
    addCourseButton.innerText = "Add Course";
    addCourseButton.style.marginLeft = gap;

    maindiv.appendChild(addCourseButton);
    maindiv.appendChild(document.createElement("br"));

    const signOutButton = document.createElement("button");
    signOutButton.id = "back_button";
    signOutButton.innerText = "SignOut";
    signOutButton.style.marginTop = "5px";

    maindiv.appendChild(signOutButton);

    return { myCoursesButton, addCourseButton, signOutButton };
}

export function PostCourseLayout()
{
    const maindiv = document.getElementById("maindiv");
    maindiv.appendChild(document.createElement("br"));

    const subdiv = document.createElement("div");
    maindiv.appendChild(subdiv);

    const LayoutHeading = document.createElement("span");
    LayoutHeading.innerHTML = "Create a New Course !";
    LayoutHeading.className = "main";

    const Input_Title = document.createElement("input");
    Input_Title.type = "text";
    Input_Title.placeholder = "Title";
    Input_Title.id = "input_CourseTitle";

    const Input_Desc = document.createElement("input");
    Input_Desc.type = "text";
    Input_Desc.placeholder = "Description";
    Input_Desc.id = "input_CourseDesc";

    const Input_Price = document.createElement("input");
    Input_Price.type = "text";
    Input_Price.placeholder = "Price";
    Input_Price.id = "input_CoursePrice";

    const ConfirmButton = document.createElement("button");
    ConfirmButton.innerText = "Publish";

    subdiv.appendChild(LayoutHeading);
    subdiv.appendChild(document.createElement("br"));
    subdiv.appendChild(Input_Title);
    subdiv.appendChild(document.createElement("br"));
    subdiv.appendChild(Input_Desc);
    subdiv.appendChild(document.createElement("br"));
    subdiv.appendChild(Input_Price);
    subdiv.appendChild(document.createElement("br"));
    subdiv.appendChild(ConfirmButton);
    subdiv.appendChild(document.createElement("br"));

    return { ConfirmButton };
}

export function RenderAdminCoursePanel(courses)
{
    const maindiv = document.getElementById("maindiv");
    maindiv.appendChild(document.createElement("hr"));
    for (let i = 0; i < courses.length; i++)
    {
        const courseTitle = document.createElement("span");
        courseTitle.innerText = courses[i].title;
        courseTitle.className = "main";

        const courseDesc = document.createElement("span");
        courseDesc.innerText = courses[i].description;
        courseDesc.className = "main";

        const coursePrice = document.createElement("span");
        coursePrice.innerText = courses[i].price;
        coursePrice.className = "main";

        const courseImage = document.createElement("span");
        courseImage.innerText = courses[i].imageUrl;
        courseImage.className = "main";

        const editButton = document.createElement("button");
        editButton.id = "edit_course";
        editButton.innerText = "Edit";

        maindiv.appendChild(courseTitle);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(courseDesc);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(coursePrice);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(courseImage);
        maindiv.appendChild(document.createElement("br"));
        maindiv.appendChild(editButton);
        maindiv.appendChild(document.createElement("hr"));
    }

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

    const switchUser_button = document.getElementById("switchUser_button");
    switchUser_button.innerText = "Browse";
}

export function UserMode(op_mode)
{
    const account_type_text = document.getElementById("account_type");
    account_type_text.innerText = `User ${op_mode === operation_modes.SIGNIN ? "SignIn" : "SignUp"}`;

    const consumer_mode_text = document.getElementById("consumer_mode");
    consumer_mode_text.innerText = "Are you a Creator ?";

    const switchUser_button = document.getElementById("switchUser_button");
    switchUser_button.innerText = "Creator";
}