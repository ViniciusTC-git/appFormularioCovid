import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {  ActivatedRoute } from '@angular/router';
import { Formulario } from '../../models/Formulario';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(MatAccordion) accordion: MatAccordion;

  isSubmitToday:boolean = false;
  isLoad:boolean = true;
  hideForm:boolean = false;
  dateToday:string = new Date().toLocaleDateString();
  usuario: Usuario = new Usuario();
  formulario: Formulario = new Formulario();
  sintomas = [
    {tipo:"febre",descricao:"Febre"},
    {tipo:"tosse",descricao:"Tosse"},
    {tipo:"cansaco",descricao:"Cansaço"},
    {tipo:"dores",descricao:"Dores"},
    {tipo:"dorDeGarganta",descricao:"Dor de Garganta"},
    {tipo:"conjuntivite",descricao:"Conjuntivite"},
    {tipo:"dorDeCabeca",descricao:"Dor de Cabeça"},
    {tipo:"dificuldadeRespiratoria",descricao:"Dificuldade Respiratoria"}
  ]
  constructor(
    private usuarioService:UsuarioService,
    private auth:AuthService,
    private elRef: ElementRef
  ) { }
  ngOnInit(){
    let usuarioRequest =  this.usuarioService.getUsuario(this.auth.getUserLogged);
    usuarioRequest.subscribe((data)=>{
       this.usuario.id = this.auth.getUserLogged;
       this.usuario.nome = data.data()['nome']
       this.usuario.setor = data.data()['setor']
       this.usuario.email = data.data()['email']
       this.usuario.formularios = (data.data()['formularios'] ? data.data()['formularios'] : []);
       if(this.usuario.formularios && this.usuario.formularios.length !== 0){
          let lengthForms = this.usuario.formularios.length;
          let formulario = <Formulario>this.usuario.formularios[lengthForms - 1];
          let lastData = new Date(formulario.data).toLocaleDateString();
          let todayDate = new Date().toLocaleDateString();
          this.isSubmitToday = (lastData === todayDate);
       }
       this.isLoad=false;
    });
   
    /*this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data.map(e => {
          let usuario = new Usuario();
          usuario.uuid = e.payload.doc.id;
          usuario.nome = e.payload.doc.data()['nome'];
          usuario.setor = e.payload.doc.data()['setor'];
          usuario.email = e.payload.doc.data()['email'];
          return usuario;
        })
     });*/
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.checkItems();
    }, 1000);
  }
  checkItems(){
    const panels = this.elRef.nativeElement.querySelectorAll('.panel');
    panels.forEach((panel)=>{
        const lists = panel.querySelectorAll('mat-list');
        lists.forEach((list) =>{
          const itemLength = list.querySelectorAll('mat-list-item').length;
          if(itemLength){
            panel.classList.add("danger")
          }
        });
    });
  }
  onSubmit(){
    this.hideForm = true;
    this.isLoad = true;
    this.formulario.data = new Date();
    this.formulario.idUsuario = this.usuario.id;
    this.usuario.formularios.push(this.formulario);
    this.usuarioService.putUsuario(this.usuario).then(()=>{
      this.ngOnInit();
      this.ngAfterViewInit();
    });
  }
  checkInput(event:any){
    this.formulario[event.target.name] = event.target.value;
  }
  checkSelect(event:any){
    this.formulario[event.source.name] = event.checked;
  }
      

}
