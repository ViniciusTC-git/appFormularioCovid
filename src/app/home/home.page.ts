import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Usuario, Setor } from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import { Formulario, Sintoma } from '../../models/Formulario';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../models/Validator';
import { FormularioService } from '../../services/formulario.service';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> fb6230853c07904e51e06a4c0a27b743af625cbc

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
  usuario: Usuario = new Usuario(null);
  formularioForm: FormGroup;
  validationMessage:Validator;
  sintomas:Array<Sintoma> = [];
  constructor(
    private usuarioService:UsuarioService,
    private formularioService:FormularioService,
    private auth:AuthService,
    private elRef: ElementRef,
    private form: FormBuilder
  ) {
    this.formularioForm = this.form.group({
      febre: false,
      tosse:false,
      cansaco:false,
      dores:false,
      dorDeGarganta:false,
      conjuntivite:false,
      dorDeCabeca:false,
      dificuldadeRespiratoria:false,
      outro:['', Validators.pattern(/^[a-zA-Z\s]*$/)],
      idUsuario:this.auth.getUserLogged
    })
    this.sintomas = Object.keys(this.formularioForm.value).map((key)=>{
      return new Sintoma(key);
    }).filter((sintoma)=>{
      return Object.keys(sintoma).length !== 0;
    })
    this.validationMessage = new Validator();
  }

  ngOnInit(){
    const usuarioRequest =  this.usuarioService.getUsuario(this.auth.getUserLogged);
    usuarioRequest.subscribe((dataUser)=>{
      Object.assign(this.usuario,dataUser.data());
      this.usuario.id = this.auth.getUserLogged;
      const formulariosRequest = this.formularioService.getFormsByUser(this.usuario.id);
      formulariosRequest.subscribe((dataForms)=>{
        this.usuario.formularios = dataForms.map((dataForm)=>{
<<<<<<< HEAD
            return Object.assign(new Formulario(null),dataForm.payload.doc.data());
          })
          if(this.usuario.formularios && this.usuario.formularios.length !== 0){
            let formulario = this.usuario.formularios[0];
            let lastData = new Date(formulario.data).toLocaleDateString();
            let todayDate = new Date().toLocaleDateString();
            this.isSubmitToday = (lastData === todayDate);
         }
=======
          return Object.assign(new Formulario(null),dataForm.payload.doc.data());
        })
        if(this.usuario.formularios && this.usuario.formularios.length !== 0){
          let lastFormulario = this.usuario.formularios.length;
          let formulario = this.usuario.formularios[lastFormulario - 1];
          let lastData = new Date(formulario.data).toLocaleDateString();
          let todayDate = new Date().toLocaleDateString();
          this.isSubmitToday = (lastData === todayDate);
        }
>>>>>>> fb6230853c07904e51e06a4c0a27b743af625cbc
        this.isLoad=false;
      });
    });
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
    if(this.formularioForm.invalid) return;

    const formulario = new Formulario(this.formularioForm.value);
    this.hideForm = true;
    this.isLoad = true;
    this.usuario.formularios.push(formulario);
    this.formularioService.postForm(formulario).then(()=>{
      setTimeout(()=>{
        this.ngOnInit();
        this.ngAfterViewInit();
      },3000)
    });
  }     

}
