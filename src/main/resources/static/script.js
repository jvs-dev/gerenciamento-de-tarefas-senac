function validarLogin() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;
    if (!email || !senha) {
        alert('Preencha todos os campos!');
    } else if (!email.includes('@')) {
        alert('Insira um e-mail válido!');
    } else {
        window.location.href = '/visualizar-tarefas.html';
    }
}

function validarCadastro() {
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confsenha = document.getElementById('confSenhaCadastro').value;
    if (!email.includes('@')) {
        alert('Insira um e-mail válido!');
    } else if (!senha || !confsenha) {
        alert('Preencha todos os campos!');
    } else if (senha !== confsenha) {
        alert('As senhas não conferem!');
    } else {
        window.location.href = '/visualizar-tarefas.html';
    }
}

function validarTarefa() {
    const titulo = document.getElementById('tituloTarefa').value;
    const descricao = document.getElementById('descricaoTarefa').value;
    if (!titulo || !descricao) {
        alert('Preencha todos os campos da tarefa!');
        return false;
    }
    alert('Tarefa salva com sucesso (mock)!');
    return true;
}
