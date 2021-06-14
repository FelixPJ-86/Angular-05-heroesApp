import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img {
      width:100%;
      border-radius:5px
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers =[{
    id:'DC Comics',
    desc: 'DC_Comics'
  },
  {
    id:'Marvel Comics',
    desc: 'Marvel Comics'
  }] ;

  heroe:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  };

  constructor(private heroeService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {


    if(!this.router.url.includes('editar')){
return

    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroeService.getHeroePorId(id))
    )
    .subscribe(heroe=>this.heroe=heroe);

  }

  guardar(){
  if(this.heroe.superhero.trim().length===0){
    console.log('vacio'+ this.heroe.superhero);
    return
  }

  if(this.heroe.id){
    //actualizar
    this.heroeService.actualizarHeroe(this.heroe)
    .subscribe(resp=>{
      console.log('Respuesta',resp);
    })
  }else{
    //agregar
    this.heroeService.agregarHeroe(this.heroe)
    .subscribe(heroe => {
      this.router.navigate(['/heroes/editar', heroe.id])
    })
    }
  }

  borrarHeroe(){
    this.heroeService.borrarrHeroe(this.heroe.id!).subscribe(resp=>{
      this.router.navigate(['/heroes'])
    })
  }
}
