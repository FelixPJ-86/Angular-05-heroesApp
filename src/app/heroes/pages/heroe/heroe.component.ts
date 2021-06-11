import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import {switchMap} from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
 
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(private activatedRoute:ActivatedRoute,
              private heroesServices:HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesServices.getHeroePorId(id))
    )
    .subscribe(heroe => this.heroe=heroe);
  }

}
