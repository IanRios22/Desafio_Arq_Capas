const form = document.getElementById('logForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            window.location.replace('/profile');
        } else {
            const errorMessage = await response.text();
            console.error('Error en el inicio de sesión:', errorMessage);
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
});
