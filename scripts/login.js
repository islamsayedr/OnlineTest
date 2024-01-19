const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const user = JSON.parse(localStorage.getItem("user"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
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
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const userEmail = user.email;
  const userPass = user.password;
  //   if (userString) {
  //     const user = JSON.parse(userString);
  //     const userEmail = user.email;
  //     const userPass = user.password;
  //     const userName = user.username;

  //     console.log(userEmail + userPass + userName);
  //   } else {
  //     console.log("User data not found in localStorage");
  //   }

  if (emailValue === "") {
    setError(email, "⚠️البريد الإلكتروني مطلوب");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "⚠️يرجى إدخال بريد إلكتروني صحيح");
  } else if (emailValue !== userEmail) {
    setError(email, "⚠️لا يوجد حساب مرتبط بهذا البريد, يمكنك انشاء حساب");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "⚠️كلمة المرور مطلوبة");
  } else if (passwordValue.length < 8) {
    setError(password, "⚠️يجب أن تكون كلمة المرور على الأقل 8 أحرف.");
  } else if (passwordValue !== userPass) {
    setError(password, "⚠️كلمة المرور غير صحيحة");
  } else {
    setSuccess(password);
  }

  if (emailValue === userEmail && passwordValue === userPass) {
    window.location.pathname = "../pages/test.html";
  }
};

// direct
const signup = document.getElementById("signup");
const home = document.getElementById("home");

signup.addEventListener("click", () => {
  window.location.pathname = "./pages/signup.html";
});
home.addEventListener("click", () => {
  window.location.pathname = "./index.html";
});
