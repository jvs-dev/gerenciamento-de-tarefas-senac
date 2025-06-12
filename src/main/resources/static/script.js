// =================== LOGIN ===================
function validarLogin() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, senha})
    })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(texto => {
                        throw new Error(texto);
                    });
                }
                return response.text();
            })
            .then(() => {
                alert('Login bem-sucedido!');
                window.location.href = 'visualizar-tarefas.html';
            })
            .catch(error => {
                alert('Erro: ' + error.message);
            });
}

// =================== CADASTRO ===================
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
        fetch('http://localhost:8080/api/usuarios/cadastrar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha})
        })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(texto => {
                            throw new Error(texto);
                        });
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'login.html';
                })
                .catch(error => {
                    alert('Erro: ' + error.message);
                });
    }
}

// =================== CADASTRAR TAREFA ===================
function validarTarefa() {
    const titulo = document.getElementById("tituloTarefa").value;
    const descricao = document.getElementById("descricaoTarefa").value;

    if (!titulo || !descricao) {
        alert("Preencha todos os campos!");
        return false;
    }

    fetch("/api/tarefas", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({titulo, descricao})
    })
            .then(() => {
                alert("Tarefa cadastrada com sucesso!");
                window.location.href = "visualizar-tarefas.html";
            })
            .catch(error => {
                alert("Erro ao cadastrar: " + error.message);
            });

    return false;
}

// =================== CARREGAR TAREFAS ===================
function carregarTarefas() {
    fetch("/api/tarefas")
            .then(res => res.json())
            .then(tarefas => {
                const tabela = document.getElementById("tabelaTarefas");
                tabela.innerHTML = "";

                tarefas.forEach(tarefa => {
                    const linha = document.createElement("tr");
                    if (tarefa.status === "Concluída") {
                        linha.classList.add("concluida");
                    }
                    linha.innerHTML = `
                <td><strong>${tarefa.titulo}</strong></td>
                <td>${tarefa.descricao}</td>
                <td>${tarefa.status}</td>
                <td class="tdBtns">
                    <button class="statusBtn" onclick="alternarStatus(${tarefa.id}, '${tarefa.status}')">
                        ${tarefa.status.toLowerCase() === "pendente" ? "Concluir" : "Pendente"}
                    </button>
                    <button class="deleteBtn" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                </td>
            `;

                    tabela.appendChild(linha);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar tarefas:", error);
            });
}

// =================== ALTERNAR STATUS ===================
function alternarStatus(id, statusAtual) {
    const novoStatus = statusAtual === "Pendente" ? "Concluída" : "Pendente";

    fetch("/api/tarefas/atualizar-status", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id, status: novoStatus})
    })
            .then(() => carregarTarefas())
            .catch(error => {
                alert("Erro ao atualizar status: " + error.message);
            });
}

// =================== EXCLUIR TAREFA ===================
function excluirTarefa(id) {
    fetch("/api/tarefas/excluir", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id})
    })
            .then(() => carregarTarefas())
            .catch(error => {
                alert("Erro ao excluir tarefa: " + error.message);
            });
}

// =================== INICIAR AUTOMATICAMENTE ===================
if (window.location.pathname.includes("visualizar-tarefas.html")) {
    window.onload = carregarTarefas;
}
