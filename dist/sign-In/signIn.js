export function logInBtnClick() {
    const navbarToggleBtn = document.getElementById("navbarToggleBtn");
    navbarToggleBtn.addEventListener("click", function () {
        const navBarNav = document.getElementById("navBarNav");
        navBarNav.classList.toggle("show");
    });
    const signInOutLi = document.getElementById("signInOutLi");
    const signInButton = document.createElement("button");
    signInButton.id = "signInButtonNavBar";
    signInButton.innerText = "Sign In";
    signInButton.setAttribute("type", "button");
    signInButton.setAttribute("class", " nav-link btn btn-outline-primary btn-sm");
    signInButton.setAttribute("data-bs-toggle", "modal");
    signInButton.setAttribute("data-bs-target", "#modalSignIn");
    signInOutLi.appendChild(signInButton);
    const signOutButton = document.createElement("button");
    signOutButton.id = "signOutBtn";
    signOutButton.innerText = "Sign Out";
    signOutButton.setAttribute("type", "button");
    signOutButton.setAttribute("class", " nav-link btn btn-outline-primary btn-sm");
    signInOutLi.insertAdjacentElement("afterend", signOutButton);
    signInButton.addEventListener("click", logIn);
}
export function logIn() {
    console.log("sign-in process");
    const containerMain = document.getElementById("bodyContainer");
    const formDiv = document.createElement("div");
    const userInput = document.getElementById("userName");
    const emailInput = document.getElementById("floatingInput");
    const passwordInput1 = document.getElementById("floatingPassword1");
    const passwordInput2 = document.getElementById("floatingPassword2");
    const signInBtn = document.getElementById("signInButton");
    const signOutBtn = document.getElementById("signOutBtn");
    const showPassBtn = document.getElementById("eye1");
    const showPassBtn1 = document.getElementById("eye2");
    const errorUser = createErrorMessage("This field should be complete");
    const errorEmail = createErrorMessage("This field is not properly formatted");
    const errorPass = createErrorMessage("This field is not properly formatted");
    const errorPass1 = createErrorMessage("These fields don't match");
    const boxItem = document.getElementById("user");
    const boxItemEmail = document.getElementById("email");
    const boxItemPass = document.getElementById("password");
    const boxItemPass1 = document.getElementById("confirmPass");
    function createErrorMessage(message) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = message;
        errorDiv.className = "error-input";
        return errorDiv;
    }
    function isFieldValid(value, minLength, maxLength, regex) {
        return value.trim().length >= minLength && value.trim().length <= maxLength && regex.test(value);
    }
    function validateEmail(email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
    }
    function validatePassword(password) {
        const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        return passwordRegex.test(password);
    }
    function validateForm() {
        const userName = userInput.value;
        const email = emailInput.value;
        const password = passwordInput1.value;
        const passwordConfirm = passwordInput2.value;
        const isUserNameValid = isFieldValid(userName, 5, 20, /\s/);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = password === passwordConfirm;
        signInBtn.disabled = !(isUserNameValid && isEmailValid && isPasswordValid && doPasswordsMatch);
        updateErrorMessage(isUserNameValid, boxItem, errorUser);
        updateErrorMessage(isEmailValid, boxItemEmail, errorEmail);
        updateErrorMessage(isPasswordValid, boxItemPass, errorPass);
        updateErrorMessage(doPasswordsMatch, boxItemPass1, errorPass1);
    }
    function updateErrorMessage(isValid, container, errorMessage) {
        if (!isValid) {
            container.appendChild(errorMessage);
        }
        else if (errorMessage.parentNode === container) {
            container.removeChild(errorMessage);
        }
    }
    function handleLogin(event) {
        event.preventDefault();
        const userName = userInput.value;
        const email = emailInput.value;
        const password = passwordInput1.value;
        const passwordConfirm = passwordInput2.value;
        if (password !== passwordConfirm) {
            alert("Passwords do not match");
            return;
        }
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
    }
    function handleLogout() {
    }
    if (signInBtn && signOutBtn && showPassBtn && showPassBtn1 && userInput && emailInput && passwordInput1 && passwordInput2) {
        signInBtn.addEventListener("click", handleLogin);
        signOutBtn.addEventListener("click", handleLogout);
        showPassBtn.addEventListener("click", togglePasswordVisibility1);
        showPassBtn1.addEventListener("click", togglePasswordVisibility2);
        userInput.addEventListener("input", validateForm);
        emailInput.addEventListener("input", validateForm);
        passwordInput1.addEventListener("input", validateForm);
        passwordInput2.addEventListener("input", validateForm);
    }
    function togglePasswordVisibility1() {
        if (passwordInput1.type === "password") {
            showPassBtn.classList.remove("bi-eye-slash");
            showPassBtn.classList.add("bi-eye-fill");
            passwordInput1.type = "text";
        }
        else {
            showPassBtn.classList.remove("bi-eye-fill");
            showPassBtn.classList.add("bi-eye-slash");
            passwordInput1.type = "password";
        }
    }
    function togglePasswordVisibility2() {
        if (passwordInput2.type === "password") {
            showPassBtn1.classList.remove("bi-eye-slash");
            showPassBtn1.classList.add("bi-eye-fill");
            passwordInput2.type = "text";
        }
        else {
            showPassBtn1.classList.remove("bi-eye-fill");
            showPassBtn1.classList.add("bi-eye-slash");
            passwordInput2.type = "password";
        }
    }
    console.log(userInput.value, emailInput.value);
}
//# sourceMappingURL=signIn.js.map