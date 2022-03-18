import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Cliente {
  id: number,
  servico: number,
  cliente: string,
  contato: string
}

enum Servico {
  'Cabelo',
  'Barba',
  'Combo'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';
  logado: boolean = false;
  form: FormGroup;
  url: string = 'http://www.lucasreno.kinghost.net/barbearia';
  fila: Cliente[] = [];
  servicos: typeof Servico = Servico;

  constructor (public fb: FormBuilder, public http: HttpClient, public snackbar: MatSnackBar) {
    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: [''],
      contato: [''],
      servico: ['']
    });
    this.pegarDados();
  }

  ngOnInit() {
    setInterval(() => this.pegarDados(), 1000);
  }

  verificarSenha(event: any) {
    if(event.target.value === "123") {
      this.logado = true;
    }
  }

  enviarDados() {
    this.http.post(this.url, this.form.value).subscribe({
      next: data => {
        this.snackbar.open(data.toString(),'', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.pegarDados();
        this.form.reset();
      },
      error: error => {
        this.snackbar.open(error.error,'', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }

  pegarDados() {
    this.http.get<Cliente[]>(this.url).subscribe({
      next: (resposta: Cliente[]) => {
        this.fila = resposta;
      },
      error: erro => console.error(erro)
    });
  }

  removerDaFila(id: number) {
    this.http.patch(this.url, {id}).subscribe({
      next: resposta => {
        this.pegarDados()
      },
      error: erro => {},
    })
  }
}
