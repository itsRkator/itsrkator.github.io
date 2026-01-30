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

  var errorEl = document.getElementById('error-msg');
  if (!errorEl) return false;
  errorEl.style.opacity = 0;
  errorEl.innerHTML = '';
  if (userName == '' || userName == null) {
    errorEl.innerHTML = "<div class='alert alert-danger error_message'>Please enter a name.</div>";
    fadeIn();
    setTimeout(function () { errorEl.innerHTML = ''; }, 5000);
    return false;
  }
  if (userEmail == '' || userEmail == null) {
    errorEl.innerHTML = "<div class='alert alert-danger error_message'>Please enter an email.</div>";
    fadeIn();
    setTimeout(function () { errorEl.innerHTML = ''; }, 5000);
    return false;
  }
  if (userSubject == '' || userSubject == null) {
    errorEl.innerHTML = "<div class='alert alert-danger error_message'>Please enter a subject.</div>";
    fadeIn();
    setTimeout(function () { errorEl.innerHTML = ''; }, 5000);
    return false;
  }
  if (userMessage == '' || userMessage == null) {
    errorEl.innerHTML = "<div class='alert alert-danger error_message'>Please enter a message.</div>";
    fadeIn();
    setTimeout(function () { errorEl.innerHTML = ''; }, 5000);
    return false;
  }

  let xhttpReq = new XMLHttpRequest();
  xhttpReq.open('POST', 'https://itsrkator-fa8t.onrender.com/');
  xhttpReq.setRequestHeader('content-type', 'application/json');
  xhttpReq.onload = function () {
    var errEl = document.getElementById('error-msg');
    if (!errEl) return;
    if (xhttpReq.responseText == 'Success') {
      errEl.innerHTML = "<div class='alert alert-success'>Email sent successfully.</div>";
      fadeIn();
      setTimeout(function () { errEl.innerHTML = ''; }, 10000);
      if (document.forms['contact-form']) {
        document.forms['contact-form']['name'].value = '';
        document.forms['contact-form']['email'].value = '';
        document.forms['contact-form']['subject'].value = '';
        document.forms['contact-form']['message'].value = '';
      }
    } else {
      errEl.innerHTML = "<div class='alert alert-danger error_message'>Something went wrong with the server. Please try again later.</div>";
      fadeIn();
      setTimeout(function () { errEl.innerHTML = ''; }, 10000);
    }
  };
  xhttpReq.send(JSON.stringify(formData));
  return false;
}


function fadeIn() {
  var fade = document.getElementById('error-msg');
  if (!fade) return;
  var opacity = 0;
  var intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.5;
      fade.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
}
