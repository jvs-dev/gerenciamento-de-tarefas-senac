package com.javato.web.repository;

import java.util.Optional;
import com.javato.web.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmailAndSenha(String email, String senha);

    boolean existsByEmail(String email);
}
