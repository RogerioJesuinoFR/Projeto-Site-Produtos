document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var senha = document.getElementById("password").value;

        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        var usuario = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuario) {
            // Redirecionar para outra página após o login bem-sucedido
            window.location.href = "pagina_de_listas.html";
        } else {
            alert("Email ou senha incorretos. Tente novamente.");
        }

    });

    document.getElementById("register").onclick = function () {
        window.location.href = "cadastro.html";
    };
});
