import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  email!: string;
  nomeDaEmpresa!: string;
  setorDaEmpresa!: string;
  cadastrando!: boolean;
  mensagemSucesso!: string;
  errors!: String[];
  usuario: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // ...

onSubmit() {
  this.authService.tentarLogar(this.username, this.password).subscribe(
    (response: any) => {

      
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token);

      // Obtenha o ID do usuário e armazene localmente
      const userId = this.authService.getUserIdFromToken();

      localStorage.setItem('user_id', userId || '');
      this.salvaUserLocal();

     // this.router.navigate(['/gerente/dashboard']);
    },
    errorResponse => {
      this.errors = ['Usuário e/ou senha incorreto(s).'];
    }
  );
}


  preparaCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    usuario.email = this.email;
    usuario.nomeDaEmpresa = this.nomeDaEmpresa;
    usuario.setorDaEmpresa = this.setorDaEmpresa;
    this.authService
        .salvar(usuario)
        .subscribe( response => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;
            this.username = '';
            this.password = '';
            this.email = '';
            this.nomeDaEmpresa = '';
            this.setorDaEmpresa = '';
            this.errors = []
        }, errorResponse => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.errors = errorResponse.error.errors;
        })
  }


  salvaUserLocal(){
    this.authService.obterUsuarioAutenticadoDoBackend().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        localStorage.setItem("idUser",usuario.id);
        this.router.navigate(['/usuario/dashboard']);
        //localStorage.setItem("usuario",usuario.username);
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );

  }

}
