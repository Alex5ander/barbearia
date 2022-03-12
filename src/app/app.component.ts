import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface Cliente {
  id: number,
  servico: number,
  cliente: string,
  contato: string
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

  constructor (public fb: FormBuilder, public http: HttpClient) {
    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: [''],
      contato: [''],
      servico: ['']
    });
    this.pegarDados();
  }

  verificarSenha(event: any) {
    if(event.target.value === "123") {
      this.logado = true;
    }
  }

  enviarDados() {
    this.http.post(this.url, this.form.value).subscribe({
      next: data => console.log(data),
      error: error => console.error(error.error)
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
