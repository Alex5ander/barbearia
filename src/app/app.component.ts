import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';

  logado: boolean = true;

  verificarSenha(event: KeyboardEvent) {
    console.log(event.target);
  }  
}
