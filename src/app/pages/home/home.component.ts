import { NonNullAssert } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeLast } from 'rxjs';
import { Task } from 'src/app/models/task,models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tasks:Task[]=[];

  newTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators: [
      Validators.required,
    ]
  });


  filter = "all";
  get taskByFilter() {
    const filter = this.filter;
    const tasks = this.tasks;

    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }

    return tasks;
  }

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks =JSON.parse(storage);
      this.tasks = tasks;
    }
    this.saveTasksToLocalStorage() // Guardar las tareas al inicializar el componente
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Método para actualizar las tareas y guardarlas en LocalStorage si es necesario
  updateTasks(newTasks: any[]): void {
    this.tasks = newTasks;
    console.log(this.tasks);
    this.saveTasksToLocalStorage();
  }

  changeHandler(){

    if(this.newTaskCtrl.valid){
      const value= this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }



  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter = filter;
  }

  updateTaskEditingMode(index: number) {
   // Crear una copia del array original tasks
   const updatedTasks = [...this.tasks];
  for(let i=0; i<updatedTasks.length; i++){
   if (i==index) {
   // Actualizar el estado de la tarea correspondiente
     updatedTasks[index].editing = true;
   }else{
     updatedTasks[i].editing = false;
   }
  }
   // Asignar el nuevo array actualizado a la variable tasks
   this.tasks = updatedTasks;
   this.updateTasks(this.tasks);
  }


  updateTaskText(index: number, event:Event) {

    const input= event.target as HTMLInputElement;
    // Crear una copia del array original tasks
    const updatedTasks = [...this.tasks];
    // Actualizar el estado de la tarea correspondiente
      updatedTasks[index].title = input.value;
      updatedTasks[index].editing = false;
    // Asignar el nuevo array actualizado a la variable tasks
    this.tasks = updatedTasks;
    this.updateTasks(this.tasks);
   }

  addTask(title: string){
    const newTask =this.tasks;
    newTask.push({
      id: Date.now(),
      title,
      completed: false,
    });
    this.tasks = newTask;
    this.updateTasks(this.tasks);
  }

  updateTask(event: any, index: number) {
    // Crear una copia del array original tasks
    const updatedTasks = [...this.tasks];

    if(event.target.checked){
    // Actualizar el estado de la tarea correspondiente
      updatedTasks[index].completed = true;
    }else{
      updatedTasks[index].completed = false;
    }

    // Asignar el nuevo array actualizado a la variable tasks
    this.tasks = updatedTasks;
    this.updateTasks(this.tasks);
}

  deleteTask(index: number){
    this.tasks.splice(index, 1);
    this.updateTasks(this.tasks);
  }
}
