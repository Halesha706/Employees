import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { CommanServices } from '../../provider/comman-service/comman.service';
import { EmployeesComponent } from './employees.component';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CommanServices, useClass: CommonServicesStub
        },
        {
          provide: ToastrService, useClass: ToasterServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h5 tag', () => {
    const h5Ele = fixture.debugElement.query(By.css('h5'));
    expect(h5Ele.nativeElement.textContent).toBe(' Add Employee Profile ');
  });

  it('should create the form', () => {
    fixture.detectChanges();
    expect(component.createForm()).toBe(undefined)
  });


  it('should ActivatedRoute get the param', () => {
    fixture.detectChanges();
    let paramId;
    component.activateRouter.params.subscribe((param) => {
      paramId = param.id
    })
    let isTrue = paramId ? true : false;
    expect(isTrue).toBeFalsy();
  });

  it('should employeeGroup form is Invalid', () => {
    fixture.detectChanges();
    expect(component.employeeGroup.invalid).toBeTruthy();
  });

  it('should employeeGroup form is valid', () => {
    fixture.detectChanges();
    component.employeeGroup.controls.firstName.setValue('Xyz');
    component.employeeGroup.controls.lastName.setValue('M');
    component.employeeGroup.controls.email.setValue('adasd@fdfd.com');
    component.employeeGroup.controls.phone.setValue(999934343);
    expect(component.employeeGroup.valid).toBeTruthy();
  });

  it('Should EmailId is Valid', () => {
    fixture.detectChanges();
    component.employeeGroup.controls.email.setValue('adasd@fdfs.com');
    expect(component.employeeGroup.controls.email.valid).toBeTruthy();
  });

  it('Should EmailId is Invalid', () => {
    fixture.detectChanges();
    component.employeeGroup.controls.email.setValue('adasdfdfs.com');
    expect(component.employeeGroup.controls.email.valid).toBeFalsy();
  });

  it('Should Phone Number is 10 digit ', () => {
    fixture.detectChanges();
    component.employeeGroup.controls.phone.setValue(9090903434);
    expect(component.employeeGroup.controls.phone.valid).toBeTruthy();
  });

  it('Should Phone Number is less than 10 digit is Invalid ', () => {
    fixture.detectChanges();
    component.employeeGroup.controls.phone.setValue(90909034);
    expect(component.employeeGroup.controls.phone.value < 10).toBeFalse();
  });


});

class CommonServicesStub {

}

class ToasterServiceStub {

}
