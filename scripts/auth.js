document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sign");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  var nameOn = false;
  var emailOn = false;
  var passwordOn = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
    if (nameOn && emailOn && passwordOn) {
      const userObject = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      const userJSON = JSON.stringify(userObject);

      // Store the JSON string in local storage
      localStorage.setItem("user", userJSON);
      window.location.pathname = "/pages/test.html";
    }
  });

  const setError = (element, message) => {
    const errorDisplay = element.nextElementSibling;
    errorDisplay.innerText = message;
    element.parentElement.classList.add("error");
    element.parentElement.classList.remove("success");
  };

  const setSuccess = (element) => {
    const errorDisplay = element.nextElementSibling;
    errorDisplay.innerText = "";
    element.parentElement.classList.add("success");
    element.parentElement.classList.remove("error");
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "") {
      setError(username, "⚠️اسم المستخدم مطلوب");
    } else {
      setSuccess(username);
      nameOn = true;
    }

    if (emailValue === "") {
      setError(email, "⚠️البريد الإلكتروني مطلوب");
    } else if (!isValidEmail(emailValue)) {
      setError(email, "⚠️يرجى إدخال بريد إلكتروني صحيح");
    } else {
      setSuccess(email);
      emailOn = true;
    }

    if (passwordValue === "") {
      setError(password, "⚠️كلمة المرور مطلوبة");
    } else if (passwordValue.length < 8) {
      setError(password, "⚠️يجب أن تكون كلمة المرور على الأقل 8 أحرف.");
    } else {
      setSuccess(password);
      passwordOn = true;
    }
  };
});
