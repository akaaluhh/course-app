import { operation_modes, consumer_modes } from './data.js';
import
{
    clearInputFields, RenderAdminLayout, RenderUserLayout, RenderCredentialsLayout,
    RenderPreviewCourses, RenderPurchasedCourses, ClearMainDivLayout, AdminMode, UserMode
} from './render.js';

let op_mode = operation_modes.SIGNIN;
let cons_mode = consumer_modes.USER;

refreshCredentialLayout();

function refreshCredentialLayout()
{
    ClearMainDivLayout();

    const { primaryButton, secondaryButton, tertiaryButton } = RenderCredentialsLayout(op_mode, cons_mode);

    primaryButton.onclick = primary;
    secondaryButton.onclick = secondary;
    tertiaryButton.onclick = tertiary;
}

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
                const { previewButton, coursesButton, signOutButton } = RenderUserLayout(userDetails.firstName + " " + userDetails.lastName);

                previewButton.onclick = PreviewCourses;
                coursesButton.onclick = ViewOwnedCourses;
                signOutButton.onclick = signout;
            }
            else // ADMIN
            {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch(`http://localhost:3000/admin/me`, requestOptions);
                const adminDetails = await response.json();

                const { myCoursesButton, addCourseButton } = RenderAdminLayout(adminDetails.firstName + " " + adminDetails.lastName);

                // myCoursesButton.onclick = 
                // addCourseButton.onclick = 
            }
        }
    }
}

// sign out 
async function signout()
{
    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    const response = await fetch("http://localhost:3000/" + `${cons_mode === consumer_modes.ADMIN ? "admin" : "user"}` + "/" + "signout", requestOptions);
    document.cookie = response.headers.getSetCookie();
    console.log(document.cookie);

    window.location.assign("/");
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
            cons_mode = consumer_modes.ADMIN;
            AdminMode(op_mode);
            break;
        case consumer_modes.ADMIN:
            cons_mode = consumer_modes.USER;
            UserMode(op_mode);
            break;
        default:
            break;
    }
    //Create the creator sign in widget layout
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

    RenderPurchasedCourses(ownedCoursesData.purchasedCourses);
}

async function viewCreatorCourses()
{

}

async function addCourse()
{

}