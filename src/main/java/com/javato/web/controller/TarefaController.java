package com.javato.web.controller;

import com.javato.web.model.Tarefa;
import com.javato.web.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @PostMapping
    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> listar() {
        return tarefaRepository.findAll();
    }

    @PostMapping("/atualizar-status")
    public Tarefa atualizarStatus(@RequestBody Tarefa tarefaAtualizada) {
        Tarefa tarefa = tarefaRepository.findById(tarefaAtualizada.getId()).orElse(null);
        if (tarefa != null) {
            tarefa.setStatus(tarefaAtualizada.getStatus()); // ← aqui só vai funcionar se getStatus() existir
            return tarefaRepository.save(tarefa);
        }
        return null;
    }

    @PostMapping("/excluir")
    public void excluir(@RequestBody Tarefa tarefa) {
        tarefaRepository.deleteById(tarefa.getId());
    }
}
