const formRegister = document.getElementById('registerForm');

formRegister.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(formRegister);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            window.location.replace('/login');
        } else {
            const errorMessage = await response.text();
            console.error('Error en el registro:', errorMessage);
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
});
