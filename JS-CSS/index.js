/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global Swal */

//login function
function LogIn() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var valid = validation("user", "Username") && validation("pass", "Password");
    if (username === "Admin" && password === "Admin") {
        alert(username + " has been loggedin successfully");
        window.location.href = "AdminDashboard.jsp";
    } else if (valid) {

        if (passwordValidation("pass") && emailValidation("user")) {
            ajaxCall('POST', 'LogInServlet', 'username=' + username + '&password=' + password + '&process=login', 'ajax');
            var status = document.getElementById("ajax").value;

            if (status > 1) {
                alert(username.split('@')[0] + " has been loggedin successfully");
                window.location.href = "AdminDashboard.jsp";
            } else if (status > 0) {
                alert(username.split('@')[0] + " has been loggedin successfully");
                window.location.href = "Dashboard.jsp";
            } else {
                alert("username or password is invalid");
            }
        }
    }
    return false;

}

//need to Login function on visiting Dashboard
function needlogin() {
    Swal.fire({
        title: "Can't see the details?",
        text: "You need to login first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log-in"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "LoginRegister.jsp";
             }
        });
    return false;
}

//register function
function Register() {
    var username = document.getElementById("username").value;
    var emailid = document.getElementById("email").value;
    var pnumber = document.getElementById("pnumber").value;
    var password = document.getElementById("password").value;
    var valid = validation("username", "Username") && validation("email", "Email") && validation("pnumber", "Phone Number") && validation("password", "Password");
    if (valid) {

        if (emailValidation("email") && PhoneNumberValidation("pnumber") && passwordValidation("password")) {
            ajaxCall('POST', 'Registerservlet', 'username=' + username + '&email=' + emailid + '&pnumber=' + pnumber + '&password=' + password, 'ajax');
            var status = document.getElementById("ajax").value;
            if (status > 0) {
                alert(username.split('@')[0] + " has been registered successfully");

                window.location.href = "LoginRegister.jsp";
            } else {
                alert("username or password is invalid");
            }
        }
    }
    return false;
}


// get query from user
function GetQuery() {
    var username = document.getElementById("name").value;
    var emailid = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var valid = validation("name", "name") && validation("email", "Email") && validation("message", "message");
    if (valid) {
        var data = 'process=getquery' + '&email=' + emailid + '&message=' + message;
        if (emailValidation("email")) {
            ajaxCall('POST', 'AdminProcess', data, 'queri');
            var status = document.getElementById("queri").value;

            if (status > 0) {
                alert("Thank you " + username + " Your Message has been sended successfully");
                DashBoardLoad('Contact');
            } else {
                alert("Something is wrong Please try again...");
            }
        }
    }

    return false;
}

//Ajac Main Function Is Here......

function ajaxCall(method, url, data, destination, isHtml) {
    var xhttp = new XMLHttpRequest();
    // event
    xhttp.onload = function () {
        if (isHtml) {
            document.getElementById(destination).innerHTML = this.responseText;
        } else {
            document.getElementById(destination).value = this.responseText;
        }
    };
    xhttp.open(method, url, false);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}

//validation function

function validation(elementId, elementName) {
    var element = document.getElementById(elementId);
    if (element.value === "") {
        alert(elementName + " Can't Empty!Please fill the details..");
        element.focus();
        return false;
    }
    return true;
}

//email validation

function emailValidation(userEmail) {
    let Email = document.getElementById(userEmail);
    let regex = new RegExp(/\S+@\S+\.\S+/);
    let isValid = regex.test(Email.value);
    if (!isValid) {
        alert("Email is not valid");
        Email.focus();
        return false;
    }
    return true;
}

//phone number validation

function PhoneNumberValidation(phoneNumber) {
    var phoneN = document.getElementById(phoneNumber);
    if (phoneN.value.length > 10 || phoneN.value.length < 10) {
        alert("Phone Number is not Valid");
        phoneN.focus();
        return false;
    }
    return true;
}

//password validation 

function passwordValidation(pass) {
    var password = document.getElementById(pass);
    if (password.value.length > 8 || password.value.length < 8) {
        alert("Password is not Valid");
        password.focus();
        return false;
    }
    return true;
}

//log out user function
function logOut(parem) {
    var logout = confirm("are you sure you want to log out");
    if (logout) {
        ajaxCall('POST', 'LogInServlet', 'process=' + parem, 'ajx', true);
        window.location.href = "index.jsp";
    }
    return false;

}

//dashboard content function
function DashBoardLoad(param) {
    ajaxCall('POST', 'ProcessServlet', 'process=' + param, 'ajx', true);
    if (param === "eventorg") {
        var t = new Date().toISOString().split('T')[0];
        document.getElementsByName("eventdatefrom")[0].setAttribute('min', t);
        document.getElementsByName("eventdateto")[0].setAttribute('min', t);
    }
    return false;
}


//Admin process

function AdminFunction(param) {

    ajaxCall('POST', 'AdminProcess', 'process=' + param, 'admin', true);
    if (param === "addEventForm") {
        var t = new Date().toISOString().split('T')[0];
        document.getElementsByName("eventdatefrom")[0].setAttribute('min', t);
        document.getElementsByName("eventdateto")[0].setAttribute('min', t);
    }
    let table = new DataTable('#myTable');
}

//add new user from UserDetails table function

function AddUser() {
    var username = document.getElementById("name").value;
    var emailid = document.getElementById("email").value;
    var pnumber = document.getElementById("phone").value;
    var password = document.getElementById("pass").value;
    var valid = validation("name", "Username") && validation("email", "Email") && validation("phone", "Phone Number") && validation("pass", "Password");
    if (valid) {
        if (emailValidation("email") && PhoneNumberValidation("phone") && passwordValidation("pass")) {
            var data = 'username=' + username + '&email=' + emailid + '&pnumber=' + pnumber + '&password=' + password + "&process=insertUser";
            ajaxCall('POST', 'AdminProcess', data, 'au', true);
            var status = document.getElementById("au").innerHTML;
            if (status > 0) {
                alert(username + " has been Added successfully");
                document.getElementById("addF").reset();
                AdminFunction('userDetails');
            } else {
                alert("User Can't be added Due to some Problem!!!");
            }

        }
    }
    return false;
}

//delete user from UserDetails table function

function deleteUser(button) {
    var msg = confirm("Are you sure!You want to delete this user..");
    var id = button.getAttribute("id");
    var data = "process=deleteUser" + "&id=" + id;
    if (msg) {
        ajaxCall('POST', 'AdminProcess', data, 'tableDiv', true);
        var status = document.getElementById("tableDiv").innerHTML;
        if (status > 0) {
            alert("User deleted successfully");
            AdminFunction('userDetails');
        } else {
            alert("User Can't be deleted Due to some Problem!!!");
        }
    }
}

//get the edit form for user

function getEdit(button) {
    var id = button.getAttribute("id");
    var data = "process=getEdit" + "&id=" + id;
    ajaxCall('POST', 'AdminProcess', data, 'admin', true);
}

//update user from UserDetails table function

function updateUser() {
    var id = document.getElementById("id").value;

    var username = document.getElementById("name").value;
    var emailid = document.getElementById("email").value;
    var pnumber = document.getElementById("phone").value;
    var password = document.getElementById("pass").value;
    var valid = validation("name", "Username") && validation("email", "Email") && validation("phone", "Phone Number") && validation("pass", "Password");
    if (valid) {
        if (emailValidation("email") && PhoneNumberValidation("phone") && passwordValidation("pass")) {
            var data = 'username=' + username + '&email=' + emailid + '&pnumber=' + pnumber + '&password=' + password + "&process=updateUser" + "&id=" + id;
            ajaxCall('POST', 'AdminProcess', data, 'uu', true);
            var status = document.getElementById("uu").innerHTML;
            if (status > 0) {
                alert("User update successfully");
                AdminFunction('userDetails');
            } else {
                alert("User Can't be updated Due to some Problem!!!");
            }

        }
    }

    return false;
}

//delete query from QueryDetails table fuction
function deleteQuery(button) {
    var msg = confirm("Are you sure!You want to delete it..");
    var id = button.getAttribute("id");
    var data = "process=deleteQuery" + "&id=" + id;
    if (msg) {
        ajaxCall('POST', 'AdminProcess', data, 'tableDiv', true);
        var status = document.getElementById("tableDiv").innerHTML;
        if (status > 0) {
            alert("Query deleted successfully");
            AdminFunction('queryDetails');
        } else {
            alert("Query Can't be deleted Due to some Problem!!!");
        }
    }
}
//Login/register page redirection
function LogReg() {
    window.location.href = "LoginRegister.jsp";
}

//user event management function
function eventManage() {

    var fromdate = document.getElementById("eventdatefrom").value;
    var todate = document.getElementById("eventdateto").value;
    var date1 = new Date(fromdate);
    var date2 = new Date(todate);
    var today = new Date();
    var day = date2.getTime() - date1.getTime();
    var finalday = Math.round(day / (1000 * 3600 * 24));
    var result = validation("email", "Email") && validation("eventname", "Event Name") && validation("poster", "Poster url") && validation("eventdatefrom", "Event Date") && validation("eventdateto", "Event Date") && validation("price", "Price") && validation("cardnumber", "Card Number") && validation("holdername", "Holder Name") && validation("month", "Expiration Date") && validation("cvv", "CVV");
    if (result) {
//        if (date1.getTime() <= date2.getTime() && finalday >= 7 && today.getDate() <= date1.getDate()) {
        var email = document.getElementById("email").value;
        var eventname = document.getElementById("eventname").value;
        var startdate = document.getElementById("eventdatefrom").value;
        var enddate = document.getElementById("eventdateto").value;
        var posterurl = document.getElementById("poster").value;
        var price = document.getElementById("price").value;
        var amount = document.getElementById("amount").value;
        var data = "process=addEvent" + "&email=" + email + "&eventname=" + eventname + "&startdate=" + startdate + "&enddate=" + enddate + "&posterurl=" + posterurl + "&price=" + price + "&amount=" + amount;
        ajaxCall('POST', 'AdminProcess', data, 'status', true);
        var status = document.getElementById("status").innerHTML;
        if (status > 0) {
            alert("Event Added successfully");
            document.getElementById("addF").reset();
            DashBoardLoad('Services');
        } else {
            alert("Event Can't be added Due to some Problem!!!");
        }

    }
    return false;
}

//total amount in booking staduim onchange
function totalAmount() {
    var fromdate = document.getElementById("eventdatefrom").value;
    var todate = document.getElementById("eventdateto").value;
    var date1 = new Date(fromdate);
    var date2 = new Date(todate);
    var today = new Date();

    var day = date2.getTime() - date1.getTime();
    var finalday = Math.round(day / (1000 * 3600 * 24));

    var amount = document.getElementById("amount");
    if (date1.getTime() === date2.getTime()) {
        amount.value = "500";
    } else if (today.getDate() <= date1.getDate() && date1.getTime() <= date2.getTime()) {
        amount.value = finalday + "000";
    } else {
        alert("date is not proper");
        amount.value = "";
    }

}


//add the new event

function newEventAdd() {
    var fromdate = document.getElementById("eventdatefrom").value;
    var todate = document.getElementById("eventdateto").value;
    var date1 = new Date(fromdate);
    var date2 = new Date(todate);
    var today = new Date();
    var day = date2.getTime() - date1.getTime();
    var finalday = Math.round(day / (1000 * 3600 * 24));
    var result = validation("email", "Email") && validation("eventname", "Event Name") && validation("poster", "Poster url") && validation("eventdatefrom", "Event Date") && validation("eventdateto", "Event Date") && validation("price", "Price");

    if (result) {
//        if (date1.getTime() <= date2.getTime() && today.getDate() <= date1.getDate()) {
        var email = document.getElementById("email").value;
        var eventname = document.getElementById("eventname").value;
        var startdate = document.getElementById("eventdatefrom").value;
        var enddate = document.getElementById("eventdateto").value;
        var posterurl = document.getElementById("poster").value;
        var price = document.getElementById("price").value;
        var amount = document.getElementById("amount").value;
        var data = "process=addEvent" + "&email=" + email + "&eventname=" + eventname + "&startdate=" + startdate + "&enddate=" + enddate + "&posterurl=" + posterurl + "&price=" + price + "&amount=" + amount;
        ajaxCall('POST', 'AdminProcess', data, 'status', true);
        var status = document.getElementById("status").innerHTML;
        if (status > 0) {
            alert("Event Added successfully");
            document.getElementById("addF").reset();

        } else {
            alert("Event Can't be added Due to some Problem!!!");
        }

    }
    return false;
}

//delete event


function deleteEvent(button) {
    var msg = confirm("Are you sure!You want to delete it...");
    var id = button.getAttribute("id");
    var data = "process=deleteEvent" + "&id=" + id;
    if (msg) {
        ajaxCall('POST', 'AdminProcess', data, 'EventDiv', true);
        var status = document.getElementById("EventDiv").innerHTML;
        if (status > 0) {
            alert("Event deleted successfully");
            AdminFunction('eventDetails');
        } else {
            alert("Event Can't be deleted Due to some Problem!!!");
        }
    }
}

//get the edit form for event

function getEventEdit(button) {
    var id = button.getAttribute("id");
    var data = "process=getEventEdit" + "&id=" + id;
    ajaxCall('POST', 'AdminProcess', data, 'admin', true);
}

//update the event

function EventUpdate() {
    var fromdate = document.getElementById("eventdatefrom").value;
    var todate = document.getElementById("eventdateto").value;
    var date1 = new Date(fromdate);
    var date2 = new Date(todate);
    var day = date2.getTime() - date1.getTime();
    var finalday = Math.round(day / (1000 * 3600 * 24));
    var result = validation("email", "Email") && validation("eventname", "Event Name") && validation("poster", "Poster url") && validation("eventdatefrom", "Event Date") && validation("eventdateto", "Event Date") && validation("price", "Price");

    if (result) {
        if (date1.getTime() <= date2.getTime() && finalday >= 7) {
            var email = document.getElementById("email").value;
            var eventname = document.getElementById("eventname").value;
            var startdate = document.getElementById("eventdatefrom").value;
            var enddate = document.getElementById("eventdateto").value;
            var posterurl = document.getElementById("poster").value;
            var price = document.getElementById("price").value;
            var amount = document.getElementById("amount").value;
            var eventid = document.getElementById("eventid").value;
            var data = "process=updateEvent" + "&email=" + email + "&eventname=" + eventname + "&startdate=" + startdate + "&enddate=" + enddate + "&posterurl=" + posterurl + "&price=" + price + "&amount=" + amount + "&id=" + eventid;
            ajaxCall('POST', 'AdminProcess', data, 'status', true);
            var status = document.getElementById("status").innerHTML;
            if (status > 0) {
                alert("Event Updated successfully");
                AdminFunction('eventDetails');

            } else {
                alert("Event Can't be updated Due to some Problem!!!");
            }

        } else {
            alert("Event Date is not Proper!");
        }
    }
    return false;
}

//load the services on user dashboard
function ServicesLoad(param, eventid) {
    if (param === "parkingService" || param === "instantFood" || param === "vipSeat" || param === "soundAndLight") {
        ajaxCall('POST', 'ProcessServlet', "process=" + param, 'ajx', true);
        return false;
    }
    var id = eventid.getAttribute("eid");
    ajaxCall('POST', 'ProcessServlet', "id=" + id + "&process=" + param, 'ajx', true);
    return false;
}

//total price for the user ticket book
function totalPrice() {
    var price = document.getElementById("price").value;
    var amount = document.getElementById("amount");
    var increment = document.getElementById("ticket").value;
    amount.value = price * increment;
}

//book ticket
function ticketBook(param) {
    var result = validation("eventname", "Event Name") && validation("email", "Email") && validation("eventdatefrom", " Start Date") && validation("eventdateto", " End Date") && validation("price", "Price") && validation("ticket", " Number Ticket") && validation("amount", "Amount");
    if (result) {
        var eventname = document.getElementById("eventname").value;
        var email = document.getElementById("email").value;
        var price = document.getElementById("price").value;
        var amount = document.getElementById("amount").value;

        var data = "process=" + param + "&eventname=" + eventname + "&email=" + email + "&price=" + price + "&amount=" + amount;
        ajaxCall('POST', 'ProcessServlet', data, 'ajx', true);

    }
    return false;
}

//delete seat
function deleteSeat(button) {
    var msg = confirm("Are you sure!You want to delete it...");
    var id = button.getAttribute("id");
    var data = "process=deleteSeat" + "&id=" + id;
    if (msg) {
        ajaxCall('POST', 'AdminProcess', data, 'StadiumDiv', true);
        var status = document.getElementById("StadiumDiv").innerHTML;
        
        if (status > 0) {
            alert("Seat Detail deleted successfully");
            AdminFunction('stadiumDetails');
        } else {
            alert("Event Can't be deleted Due to some Problem!!!");
        }
    
    }
}



//payment gateway function
function paynow() {

    var result = validation("email", "Email") && validation("carddetails", "Card Details") && validation("mmyy", "Card Details") && validation("cvv", "Card Details") && validation("cardholder", "Card Holder");
    if (result) {
        var holder = document.getElementById("cardholder").value;
        var email = document.getElementById("email").value;
        var data = "process=updatepayment" + "&email=" + email;
        ajaxCall('POST', 'ProcessServlet', data, 'pay', true);
        var status = document.getElementById("pay").innerHTML;
        if (status) {
            alert("Thank You " + holder + " Your payment done successfully");
//            Swal.fire({
//                position: "center",
//                icon: "success",
//                title: "Payment Done"
//            });
            DashBoardLoad('homeload');
        } else {
            alert("Payment failed");
        }


    }
    return false;
}


