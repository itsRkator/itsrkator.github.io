// Contact Form
function validateForm() {
  let userName = document.forms['contact-form']['name'].value;
  let userEmail = document.forms["contact-form"]["email"].value;
  let userSubject = document.forms["contact-form"]["subject"].value;
  let userMessage = document.forms["contact-form"]["message"].value;

  let formData = {
    name: userName,
    email: userEmail,
    subject: userSubject,
    message: userMessage
  };

  document.getElementById("error-msg").style.opacity = 0;
  document.getElementById('error-msg').innerHTML = "";
  if (userName == "" || userName == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'>Please enter a Name</div>";
    fadeIn();
    setTimeout(() => {
      document.getElementById('error-msg').innerHTML = "";
    }, 5000)
    return false;
  }
  if (userEmail == "" || userEmail == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'>Please enter a Email</div>";
    fadeIn();
    setTimeout(() => {
      document.getElementById('error-msg').innerHTML = "";
    }, 5000)
    return false;
  }
  if (userSubject == "" || userSubject == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'>Please enter a Subject</div>";
    fadeIn();
    setTimeout(() => {
      document.getElementById('error-msg').innerHTML = "";
    }, 5000)
    return false;
  }
  if (userMessage == "" || userMessage == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'>Please enter a Comments</div>";
    fadeIn();
    setTimeout(() => {
      document.getElementById('error-msg').innerHTML = "";
    }, 5000)
    return false;
  }

  let xhttpReq = new XMLHttpRequest();
  xhttpReq.open('POST', 'https://itsrkator-962v.onrender.com/');
  xhttpReq.setRequestHeader('content-type', 'application/json');
  xhttpReq.onload = function () {
    console.log("Form Data: ", formData, "\nResponse Text: ", xhttpReq.responseText);
    if (xhttpReq.responseText == 'Success') {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-success'>Email sent successfully.</div>";
      fadeIn();
      setTimeout(() => {
        document.getElementById('error-msg').innerHTML = "";
      }, 10000);
      document.forms['contact-form']['name'].value = '';
      document.forms["contact-form"]["email"].value = '';
      document.forms["contact-form"]["subject"].value = '';
      document.forms["contact-form"]["message"].value = '';
    } else {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'>Something went wrong with the server. Please try after some time.</div>";
      fadeIn();
      setTimeout(() => {
        document.getElementById('error-msg').innerHTML = "";
      }, 10000);
    }
  }
  xhttpReq.send(JSON.stringify(formData));
  return false;
}


function fadeIn() {
  let fade = document.getElementById("error-msg");
  let opacity = 0;
  let intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.5
      fade.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
}
