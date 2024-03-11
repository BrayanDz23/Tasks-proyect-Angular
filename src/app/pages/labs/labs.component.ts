import { Component} from '@angular/core';
import {CommonModule} from '@angular/common'

import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],

})
export class LabsComponent {
  welcome ='Hola!';
  tasks=[
    'Instalar el Angular CLI',
    'Crar el proyecto',
    'Crear componentes',
  ];
  name = 'Brayan';
  age='26 años';
  disabled=true;
  img = 'https://w3schools.com/howto/img_avatar.png'

  person={
    name:'Brayan',
    age: 26,
    avatar:'https://w3schools.com/howto/img_avatar.png'
  }

  colorCtrl = new FormControl('');
  widthCtrl = new FormControl(50,{
    nonNullable: true,
    validators:[
      Validators.required,
    ]
  });

  nameCtrl = new FormControl(50,{
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.minLength(3),
    ]
  });

  clickHandler(){
    alert('Hola');
  }

  changeHandler(event:Event){
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeName(event:Event){
  const input = event.target as HTMLInputElement;
  const newValor = input.value;
  this.person.name = newValor;
  }

}
