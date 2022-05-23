import { Component, VERSION } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Days = ['mon', 'tue', 'wed'];
  data = {
    companies: [
      {
        company: 'example comany',
        projects: [
          {
            projectName: ' ',
          },
          {
            projectName: ' ',
          },
        ],
      },
    ],
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      companies: this.fb.array([]),
    });

    this.setCompanies();
    this.setDays();
  }

  get companiesFormArr(): FormArray {
    return this.myForm.get('companies') as FormArray;
  }

  addNewCompany() {
    this.companiesFormArr.push(
      this.fb.group({
        company: [''],
        projects: this.fb.array([]),
        day: this.fb.array([]),
      })
    );
  }

  deleteCompany(index) {
    this.companiesFormArr.removeAt(index);
  }

  addNewProject(control) {
    control.push(
      this.fb.group({
        projectName: [''],
      })
    );
  }

  addNewDay(control) {
    control.push({
      day: this.fb.control()
    });
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  setCompanies() {
    this.data.companies.forEach((x) => {
      this.companiesFormArr.push(
        this.fb.group({
          company: x.company,
          projects: this.setProjects(x),
        })
      );
    });
  }

  setProjects(x) {
    let arr = new FormArray([]);
    x.projects.forEach((y) => {
      arr.push(
        this.fb.control({
          projectName: y.projectName,
        })
      );
    });
    return arr;
  }

  setDays() {
    let arr = new FormArray([]);
    this.Days.forEach((y) => {
      this.companiesFormArr.push(
        this.fb.group({
          day: y,
        })
      );
    });
    return arr;
  }
}
