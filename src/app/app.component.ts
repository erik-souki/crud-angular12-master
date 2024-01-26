import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-angular12';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onHome(){
    this.router.navigate([''], {relativeTo: this.route })}
}
