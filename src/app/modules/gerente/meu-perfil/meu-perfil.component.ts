import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obterUsuarioAutenticadoDoBackend().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );
  }
}