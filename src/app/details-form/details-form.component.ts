import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, FormArray} from "@angular/forms";
import * as $ from 'jquery';
 
@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {
  signupForm: FormGroup;
  listData: any;
  searchValue: string = "";
  female: string;
  editingIndex: number = null;
  ageList = [];
  ageCheck: number = 0;
  inputFields = [];


  // ageGroup: {};


// Called once the component is initialized
  constructor(private fb: FormBuilder) {
    this.listData = [];

    this.signupForm = this.fb.group({
      name: ['a', Validators.required],
      gender: ['male', Validators.required],
      age: ['1', Validators.required],
      email: ['a', [Validators.required]],
      mobile: ['321', [Validators.required]],
      hobbies: this.fb.array([]),
      task: ['21'],
      // hobbies: ['', Validators.required],
      information: ['ab', Validators.required],
    });

  }

  get hobbies() {
    return this.signupForm.get('hobbies') as FormArray
  }
  inputFieldsButton() {
    this.hobbies.push(this.fb.control(''));
  }

  // public get ghobbies() {
  //   return this.signupForm.controls['ghobbies'] as FormArray;
  // }


  ngOnInit(){

  }

  //addItem = addItem method used to add members to the table.
  addItem():void {
    if (document.getElementById('submit').textContent == "Update") {

      let data = [...this.listData];

      data[this.editingIndex] = {
        ...this.signupForm.value,
        index: this.editingIndex
      }
      this.listData = [...data];
      this.editingIndex = null;
      this.signupForm.reset();
      document.getElementById('submit').textContent = "Submit";
    }else if(document.getElementById('submit').textContent == "Submit"){

      this.listData.push({...this.signupForm.value, index: this.listData.length});
      // $(".group-gap").remove();
      this.signupForm.reset();
      document.getElementById('submit').textContent = "Submit";
    }
    console.log(this.listData);
  }

  //reset the form value
  resetForm(){
    this.signupForm.reset();
    $(".group-gap").remove()
  }

  // button = edit method help to edit method in the table data
  edit(index, i){
    this.editingIndex = index.index;
    this.signupForm.setValue({
      name: index.name,
      gender: index.gender,
      age: index.age,
      email: index.email,
      mobile: index.mobile,
      task: index.task,
      hobbies: index.hobbies,
      information: index.information,
    });
    document.getElementById('submit').textContent = "Update";
    // let values = this.signupForm.value;
  }

  // button = delete method help to delete the row from the table
    delete(element){
    this.listData.forEach((value, index)=>{
      if (value == element) {
        this.listData.splice(index, 1);
      }
    });
  }

  // dropdown with age

  selectAge(){
    if (this.ageCheck == 0) {
      for (let i = 18; i <= 99 ; i++) {
        console.log(i);
        this.ageList.push(i);
        this.ageCheck = 1;
        }
    }
  }



  // add multiple input
  addInput(){
    console.log("asasas");
    let div  = document.createElement('input');
    div.className = 'inputWrap';
    let inputWrapper = document.getElementById('input-wrap');
    inputWrapper.appendChild(div);
  }

  //apporach for input fields
  // addInputField(){
  //   let row = document.createElement('div');
  //     row.className = 'row';
  //     row.innerHTML = `
  //     <br>
  //     <div class="d-flex flex-row align-items-start position-relative mt-4">
  //       <div class="form-group">
  //             <input type="text" class="form-control">
  //       </div>
  //       <i class="fa fa-minus-circle position-absolute end-0" aria-hidden="true" style="font-size: 22px; cursor: pointer; top: -10px"></i>
  //     </div>`;
  //     document.querySelector('.showInputField').appendChild(row);
  // }

  removeInputField(event: any, y){
    let field = y.toString();
    let fieldLength = this.hobbies.length;
    let a = this.hobbies.value;



    // console.log(y);
    if (field == field) {
      let b = a.splice(y, 1)

      $("#field_" + y).remove();
      $("#fields_" + y).remove();

      // let a = this.hobbies.value;
      // console.log(a.length);
      // let b = a.splice($("#fields_" + y), 1)
      // let b = a.slice(field)
      console.log(b);

      // this.hobbies.clear();
      // $("#fields_" + y).find('input:text').val('');



    }

  }

}
