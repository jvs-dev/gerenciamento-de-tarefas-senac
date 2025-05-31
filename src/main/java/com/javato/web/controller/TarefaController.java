package com.javato.web.controller;

import com.javato.web.model.Tarefa;
import com.javato.web.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    // Já deve existir esse para cadastro:
    @PostMapping
    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    // ESTE AQUI É O QUE VOCÊ PRECISA AGORA:
    @GetMapping
    public List<Tarefa> listar() {
        return tarefaRepository.findAll();
    }
}
