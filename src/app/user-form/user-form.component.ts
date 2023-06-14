import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';

interface state {
  value: number;
  viewValue: string;
}

interface cereal {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
  ],
})

export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  state: state[] = [
    { value: 0, viewValue: 'Wyoming' },
    { value: 1, viewValue: 'California' },
    { value: 2, viewValue: 'Nevada' },
    { value: 4, viewValue: 'New York' },
    { value: 5, viewValue: 'Louisiana' },
  ];

  cereal: cereal[] = [
    { id: 0, name: 'Captain Crunch' },
    { id: 1, name: 'Fruit Loops' },
    { id: 2, name: 'Cinnamon Toast Crunch' },
  ];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(12)]],
      lName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: [null, Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5)]],
      phonenumber: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.minLength(12)]],
      cereal: this.formBuilder.array([]),
    });

  }

  toggleCerealSelection(cerealId: number) {
    const cerealFormArray = this.userForm.get('cereal') as FormArray;
    const index = cerealFormArray.value.indexOf(cerealId);
    if (index !== -1) {
      cerealFormArray.removeAt(index);
    } else {
      const isSelected = this.isCerealSelected(cerealId);
      if (!isSelected) {
        cerealFormArray.push(new FormControl(cerealId));
      }
    }
  }
  
  isCerealSelected(cerealId: number): boolean {
    const cerealFormArray = this.userForm.get('cereal') as FormArray;
    return cerealFormArray.value.includes(cerealId);
  }

  isCerealInvalid(): boolean {
    const cerealFormArray = this.userForm.get('cereal') as FormArray;
    return !this.userForm.valid || cerealFormArray.value === null;
  }

  submitForm() {
    this.userForm.value;
    this.dialog.open(ModalComponent, {
      data:
      {
        fName: this.userForm.get('fName')?.value,
        lName: this.userForm.get('lName')?.value,
        email: this.userForm.get('email')?.value,
        address: this.userForm.get('address')?.value,
        city: this.userForm.get('city')?.value,
        zipcode: this.userForm.get('zipcode')?.value,
        phoneNumber: this.userForm.get('phonenumber')?.value,
        state: this.userForm.get('state')?.value,
        cereal: this.userForm.get('cereal')?.value,
      },
    });
    this.userForm.reset();
  }
}




