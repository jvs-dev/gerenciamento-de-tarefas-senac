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
        alert('Preencha todos os campos!');
        return false;
    }

    fetch('http://localhost:8080/api/tarefas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titulo, descricao})
    })
            .then(response => response.json())
            .then(() => {
                alert('Tarefa cadastrada!');
                window.location.href = 'visualizar-tarefas.html';
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao cadastrar.');
            });

    return false;
}

function carregarTarefas() {
    fetch('http://localhost:8080/api/tarefas')
            .then(response => response.json())
            .then(tarefas => {
                const tabela = document.getElementById('tabelaTarefas');
                tabela.innerHTML = ''; // limpa antes

                tarefas.forEach(tarefa => {
                    const tr = document.createElement('tr');

                    const tdTitulo = document.createElement('td');
                    tdTitulo.textContent = tarefa.titulo;

                    const tdDescricao = document.createElement('td');
                    tdDescricao.textContent = tarefa.descricao;

                    const tdStatus = document.createElement('td');
                    tdStatus.textContent = tarefa.concluida ? 'Concluída' : 'Pendente';

                    tr.appendChild(tdTitulo);
                    tr.appendChild(tdDescricao);
                    tr.appendChild(tdStatus);

                    tabela.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
            });
}

// Chama a função automaticamente ao abrir a página
window.onload = carregarTarefas;
