import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    url: new FormControl('', [Validators.required]),
    path: new FormControl('', []),
  });
  shortUrl = '';

  constructor(private http: HttpClient) {}

  onSubmit = () => {
    this.http.post(`${environment.backendUrl}/generate`, this.form.value).subscribe(
      (response: any) => {
        this.shortUrl = response.url;
      },
      (error: any) => {
        if (error.status === 409) {
          this.form.get('path')?.setErrors({ notUnique: true });
        }
      }
    );
  };
}
