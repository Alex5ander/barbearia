import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';
  logado: boolean = true;
  form: FormGroup;

  constructor (public fb: FormBuilder) {
    this.form = this.fb.group({
      data: [''],
      cliente: [''],
      contato: [''],
      servico: ['']
    });
  }

  verificarSenha(event: KeyboardEvent) {
    console.log(event.target);
  }  
}
