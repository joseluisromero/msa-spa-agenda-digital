import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
/*Es el componente raíz (AppComponent)
Usa RouterOutlet para mostrar las diferentes páginas según la ruta
Contiene un signal con el título de la app
*/
export class App {
  protected readonly title = signal('msa-spa-agenda-digital');
}
