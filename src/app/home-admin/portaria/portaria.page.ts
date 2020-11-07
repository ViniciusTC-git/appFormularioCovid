import { Component, OnInit } from '@angular/core';
import { PortariaService } from 'src/services/portaria.service';
import { Portaria } from 'src/models/Portaria';

@Component({
  selector: 'app-portaria',
  templateUrl: './portaria.page.html',
  styleUrls: ['./portaria.page.scss'],
})
export class PortariaPage implements OnInit {
  registrosEntrada:Array<Portaria> = new Array();
  constructor(private portariaSrv:PortariaService) { }

  ngOnInit() {
    this.portariaSrv.get().subscribe((dataPortaria)=>{
      this.registrosEntrada = dataPortaria.map((registro) =>{
        const registroEntrada = Object.assign(new Portaria(),registro.payload.doc.data());
        registroEntrada.data = new Date(registroEntrada.data).toLocaleString();
        return registroEntrada;
      }).sort((registroAtual,registroProximo)=>{
        const dataAtual = new Date(registroAtual.data).getTime();
        const dataProxima = new Date(registroProximo.data).getTime();
        return dataAtual > dataProxima ? -1 : dataProxima > dataAtual ? 1 : 0;
      });
    })
  }

}
