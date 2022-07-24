export const auth = () => {

    const buttonAuth = document.querySelector('.button-auth');
    const modalAuth = document.querySelector('.modal-auth');
    const buttonOut = document.querySelector('.button-out');
    const userName = document.querySelector('.user-name');
    const closeAuth = document.querySelector('.close-auth');

    const logInForm = document.getElementById('logInForm');
    const inputLogin = document.getElementById('login');
    const inputPassword = document.getElementById('password');

    const login = (user) => {
        buttonAuth.style.display = 'none';

        buttonOut.style.display = 'flex';
        userName.style.display = 'flex';

        userName.textContent = user.login;
        modalAuth.style.display = 'none';
    }

    const logout = (user) => {
        buttonAuth.style.display = 'flex';

        buttonOut.style.display = 'none';
        userName.style.display = 'none';
        userName.textContent = '';

        localStorage.removeItem('user')
    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex';
    });

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none';
    });

    buttonOut.addEventListener('click', () => {
        logout()
    });

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const user = {
            login: inputLogin.value,
            password: inputPassword.value,
        }

        if (user.login.trim() === '') {
            alert('Логин не введен')
        } else if (user.password.trim() === '') {
            alert('Пароль не введен')
        } else {
            localStorage.setItem('user', JSON.stringify(user));

            login(user);
        }
    });

    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')));
    }
}