class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // Recuperar os usuários armazenados no localStorage ou inicializar um array vazio
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    function verificaCadastros(email) {
        return usuarios.some(user => user.email === email);
    }

    function armazenaCadastros(novoUsuario) {
        if (verificaCadastros(novoUsuario.email)) {
            alert("Os dados informados correspondem a um usuário já cadastrado.");
        } else {
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        }
    }

    function limparCampos() {
        document.getElementById("nomeInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("senhaInput").value = "";
        document.getElementById("confSenhaInput").value = "";
    }

    function validaFormulario(nome, email, senha, confirmaSenha) {

        // Verifica se algum campo está em branco
        var camposVazios = [nome, email, senha, confirmaSenha].some(campo => campo.trim() === "");

        if (camposVazios) {
            return false; // Campos em branco
        }

        if (nome.trim().split(' ').length < 2) {
            return 3; // Não inseriu o sobrenome
        }

        if (senha.length < 6) {
            return 1; // Senha muito curta
        } else if (confirmaSenha !== senha) {
            return 0; // Senhas não coincidem
        } else {
            return true; // Formulário válido
        }
    }

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        var nome = document.getElementById("nomeInput").value;
        var email = document.getElementById("emailInput").value;
        var senha = document.getElementById("senhaInput").value;
        var confSenha = document.getElementById("confSenhaInput").value;

        var validacao = validaFormulario(nome, email, senha, confSenha);
        if (validacao === true) {
            var novoUsuario = new Usuario(nome, email, senha);
            armazenaCadastros(novoUsuario);
        } else if (validacao === false) {
            alert("Por favor, preencha todos os campos do formulário corretamente!");
        } else if (validacao === 0) {
            alert("As senhas não combinam, favor insira a senha utilizada para confirmação");
        } else if (validacao === 1) {
            alert("A senha deve conter pelo menos 6 caracteres.");
        } else if (validacao === 3) {
            alert("É necessário inserir sobrenome.")
        }
    });

    document.getElementById("voltar").onclick = function () {
        window.location.href = "login.html";
    };

});

