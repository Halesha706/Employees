import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommanServices } from '../../provider/comman-service/comman.service'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeGroup: FormGroup;
  employee: any = null;
  chooseFile: any;
  base64textString: string;
  imageSource: any;
  isLoading: boolean;
  paramId: any;
  isUpdateLoader: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: CommanServices,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public activateRouter: ActivatedRoute
  ) { }
  /**
   * ngOnInit create the form and when get the paramId called the patchValue function
   * @param()
   */
  ngOnInit(): void {
    this.createForm();
    this.activateRouter.params.subscribe((param) => {
      if (param && param.id) {
        this.paramId = param.id;
        this.isUpdateLoader = true
        this.patchValues()
      } else {
        this.employee = {};
      }
    })
  }

  /**
   * Create the Form
   */

  createForm() {
    this.employeeGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      address: [{}],
      profile: ['']
    });
  }

  /**
   * Validate the Form Values
   * @param controlName 
   * @param validationType 
   */

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.employeeGroup.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    if (result) {
    }
    return result;
  }

  /**
   * Submit function create the employe in the mockApi.io 
   */

  async submit() {
    let controls = this.employeeGroup.controls;
    console.log('controls', controls)
    if (this.employeeGroup.invalid) {
      Object.keys(controls).forEach(key => {
        controls[key].markAllAsTouched();
      });
      this.toastr.error("Enter the Required fields")
      return
    }
    this.isLoading = true;
    let obt = {}
    try {
      obt[this.employeeGroup.controls.email.value] = this.imageSource ? this.base64textString : null
      console.log(obt);
      if (this.imageSource) {
        localStorage.setItem(this.employeeGroup.controls.email.value, this.base64textString)
      }

      this.imageSource ? this.employeeGroup.controls.profile.setValue(this.employeeGroup.controls.email.value) : this.employeeGroup.controls.profile.setValue('')
      console.log(this.employeeGroup.value);
      let res: any = await this.service.addDetails('employee', this.employeeGroup.value);
      console.log(res);
      if (res.id) {
        this.isLoading = false;
        this.toastr.success("Successfully added");
        this.employeeGroup.reset();
        this.imageSource = "";
        this.router.navigateByUrl('/dashboard/employee-list');
      }

    }
    catch (err) {
      this.isLoading = false;
      this.toastr.error("Failed to Add information");
    }

  }

  /**
   * Handle the images
   * @param evt 
   */
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      console.log(file.name);
      this.chooseFile = file.name;
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  /**
   * Convert the base64 the image file
   * @param readerEvt 
   */
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    this.imageSource = this.getImage(this.base64textString)
  }

  getImage(type) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${type}`);
  }

  deleteImage() {
    this.imageSource = ""
  }

  /**
   * Patch the Value
   */

  async patchValues() {
    try {
      let employee: any = await this.service.getDetailsById('employee', this.paramId);
      this.employee = employee;
      if (employee && employee.id) {
        let img = this.service.getLocalStorage(employee.email);
        if (img) {
          this.base64textString = img;
          this.imageSource = this.getImage(img)
        }
        this.isUpdateLoader = false;
        this.employeeGroup.patchValue(employee);
      }
    }
    catch (err) {
      this.isUpdateLoader = false;
      console.log(err);
    }
  }

  /**
   * Update the Value of the Employee
   */

  async update() {
    let controls = this.employeeGroup.controls;
    if (this.employeeGroup.invalid) {
      Object.keys(controls).forEach(key => {
        controls[key].markAllAsTouched();
      });
      this.toastr.error("Enter the Required fields")
      return
    }
    this.isLoading = true;
    let obt = {}
    try {
      obt[this.employeeGroup.controls.email.value] = this.imageSource ? this.base64textString : null
      console.log(obt);
      if (this.imageSource) {
        localStorage.setItem(this.employeeGroup.controls.email.value, this.base64textString)
      }

      this.imageSource ? this.employeeGroup.controls.profile.setValue(this.employeeGroup.controls.email.value) : this.employeeGroup.controls.profile.setValue('')
      console.log(this.employeeGroup.value);
      let res: any = await this.service.updateDetails('employee', this.employeeGroup.value, this.paramId);
      console.log(res);
      if (res.id) {
        this.isLoading = false;
        this.toastr.success(this.paramId ? "Updated Successfully" : "Successfully added");
        this.employeeGroup.reset();
        this.imageSource = "";
        this.router.navigateByUrl('/dashboard/employee-list');
      }

    }
    catch (err) {
      this.isLoading = false;
      this.toastr.error("Failed to Add information");
    }
  }

  /**
   * Return the title
   */
  getTitle() {
    return this.paramId ? 'Update Employee Profile' : 'Add Employee Profile'
  }

  /**
   * On address changes get the locations
   * @param place 
   */
  onAddressChanged(place: any) {
    this.employeeGroup.patchValue({
      address: {
        address: place.formatted_address,
        geo: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      }
    });
  }
}
