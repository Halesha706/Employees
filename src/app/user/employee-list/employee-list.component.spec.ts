import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { CommanServices } from '../../provider/comman-service/comman.service';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let commonServiceMock: any;
  let services: any;
  beforeEach(async(() => {
    commonServiceMock = jasmine.createSpyObj('CommanServices', ['getDetails']);
    commonServiceMock.getDetails.and.returnValue([])
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
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
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    services = new CommonServicesStub()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h5 tag', () => {
    const h5Ele = fixture.debugElement.query(By.css('h5'));
    expect(h5Ele.nativeElement.textContent).toBe('Employee List ');
  })

  it('should getDatail Call once ', () => {
    fixture.detectChanges();
    expect(component.getDetails()).toBeTruthy();
  })

  it('should CommonServices called the getDetails returns the Employee details ', () => {
    let info = services.getDetails('employee');
    fixture.detectChanges();
    expect(info.length).toBe(1)
  })

  it('should CommonServices called the getDetails return Empty array ', () => {
    let info = services.getDetails();
    fixture.detectChanges();
    expect(info.length).toBe(0)
  })
});

class CommonServicesStub {
  getDetails(values?: any) {
    if (values) {
      let option = {
        name: "name1",
        lastName: "lastName1",
        phone: '343434343',
        profile: "sddfds",
      }
      let user: any = [];
      user.push(option)
      return user;
    }
    else {
      return []
    }
  }
}

class ToasterServiceStub {

}



