import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';
  logado: boolean = false;
  form: FormGroup;
  url: string = "http://www.lucasreno.kinghost.net/barbearia";

  constructor (public fb: FormBuilder, public http: HttpClient) {
    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: [''],
      contato: [''],
      servico: ['']
    });
  }

  verificarSenha(event: KeyboardEvent) {
    console.log(event.target);
  }
  
  enviarDados() {

    this.http.post(this.url, this.form.value).subscribe({
      next: data => console.log(data),
      error: error => console.error(error.error)
    });
  }
}
