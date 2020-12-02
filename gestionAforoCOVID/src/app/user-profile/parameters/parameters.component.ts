import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  constructor(private parameterService : ParametersService) { }

  quarantine_time = new FormGroup({
    quarantineDays : new FormControl( 0 , Validators.required)
  })

  new_document = new FormGroup({
    new_doc : new FormControl('', Validators.required)
  })

  new_category= new FormGroup({
    new_cat : new FormControl('', Validators.required),
  })

  municipality_info = new FormGroup({
    municipality  : new FormControl('', Validators.required),
    code : new FormControl('', Validators.required),
    department : new FormControl('', Validators.required)
  })

  ngh_info = new FormGroup({
    neighborhood : new FormControl('', Validators.required)
  })

  dep_info = new FormGroup({
    department : new FormControl('', Validators.required),
    code : new FormControl('', Validators.required)
  })
  
  private categories: any;
  private departments: any;
  private documents: any;
  private neighborhoods : any;
  private municipalities : any;
  private quarantine_days  : any;
  

  ngOnInit(): void {
    this.parameterService.getCategories().then(result => {
      this.categories = result
    })

    this.parameterService.getDepartments().then(result => {
      this.departments = result
    })

    this.parameterService.getDocuments().then(result => {
      this.documents = result
    })

    this.parameterService.getNeighborhoods().then(result => {
      this.neighborhoods = result
    })

    this.parameterService.getmunicipalities().then(result => {
      this.municipalities = result
      
    })
    this.parameterService.getQuarantine().then(result => {
      
      this.quarantine_days = result;
    })
  }


  getDocuments(){
    return this.documents;
  }

  getDepartments(){
    return this.departments;
  }

  getMunicipalities(){
    return this.municipalities;
  }

  getNeighborhoods(){
    return this.neighborhoods;
  }

  getCategories(){
    return this.categories;
  }

  getQuarantine(){
    return this.quarantine_days;
  }

  modify_quarantine(){
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){
      
      this.parameterService.setQuarantine(this.quarantine_time.value['quarantineDays']).then(result => {
        alert("El periodo de cuarentena se ha modificado");
        location.reload();
      })
    }
  }

  send_doc(){
    this.parameterService.new_document(this.new_document.value['new_doc']).then(result => {
      if(result == "success"){
        alert("El documento ha sido agregado");
        location.reload();
      }
      else{
        alert("El documento no se pudo agregar");
      }
    })
  }

  delete_doc(doc :string){
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){
      this.parameterService.delete_document(doc).then(result => {
        alert("El documento ha sido eliminado");
        location.reload();
      })
    }
  }

  send_category(){
    this.parameterService.new_category(this.new_category.value['new_cat']).then(result => {
      if(result == "success"){
        alert("La categoría ha sido agregada");
        location.reload();
      }
      else{
        alert("La categoría no se pudo agregar");
      }
    })
  }

  delete_cat(id : string){
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){ 
      this.parameterService.delete_category(id).then(result => {
        alert("La categoría ha sido eliminada");
        location.reload();
      })
    }
  }

  send_municipality(){
    this.parameterService.new_municipality(this.municipality_info).then(result => {
      if(result == "success"){
        alert("El municipio ha sido agregado");
        location.reload();
      }
      else{
        alert("El municipio no se pudo agregar");
      }
    })
  }

  delete_municipality(code : string, department : string){
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){
      this.parameterService.delete_municipality(code, department).then(result => {
        alert("El municipio ha sido eliminado");
        location.reload();
      })
    }
  }

  send_neighborhood(){
    this.parameterService.new_neighborhood(this.ngh_info).then(result => {
      if(result == "success"){
        alert("El barrio ha sido agregado");
        location.reload();
      }
      else{
        alert("El barrio no se pudo agregar");
      }
    })
  }

  delete_neighborhood(name : string){
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){
      this.parameterService.delete_neighborhood(name).then(result => {
        console.log(result);
        alert("El barrio ha sido eliminado");
        
        location.reload();
      })
    }
  }

  send_department(){
    this.parameterService.new_department(this.dep_info).then(result => {
      if(result == "success"){
        alert("El departamento ha sido agregado");
        location.reload();
      }
      else{
        alert("El departamento no se pudo agregar");
      }
    })
  }

  delete_department(code : number){
    
    let flag = confirm("¿Esta seguro que desea realizar la acción?")
    if(flag){
      this.parameterService.delete_department(code).then(result => {
        console.log(result);
        alert("El department ha sido eliminado");
        location.reload();
      })
    }
  }

}

