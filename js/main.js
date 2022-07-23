const authBtn = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const authModal = document.querySelector('.modal-auth');
const authModalClose = authModal.querySelector('.close-auth');

const authForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');

const login = (user) => {
    authBtn.style.display = 'none';
    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    userName.textContent = user.login;
    authModal.style.display = 'none';
}

const logout = () => {
    authBtn.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    localStorage.removeItem('user');
}


authBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
});

authModalClose.addEventListener('click', () => {
    authModal.style.display = 'none';
});

authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
        login: inputLogin.value,
        password: inputPassword.value
    }

    localStorage.setItem('user', JSON.stringify(user));

    login(user);
});

buttonOut.addEventListener('click', () => {
    logout();
});

if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')));
}