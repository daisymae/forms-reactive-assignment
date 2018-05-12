import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'projectName': new FormControl('', [Validators.required, this.invalidProjectName]),
      'projectName': new FormControl('', Validators.required, this.invalidProjectAsync),
      'email': new FormControl('', [Validators.required, Validators.email]),
      // if default value is not set for select,
      // nothing is returned if default remains selection
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  invalidProjectName(control: FormControl): { [s: string]: boolean} {
    if (control.value === 'Test') {
      return { 'invalidProjectName': true};
    }
  }

  invalidProjectAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      // set a timer to mock asynchronous call
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'invalidProjectAsync': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
