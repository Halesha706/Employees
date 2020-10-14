import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommanServices } from '../../provider/comman-service/comman.service'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any = []
  isProfileLoad: boolean;
  constructor(
    private service: CommanServices,
    private toastr: ToastrService,
  ) { }

  /**
   * Load the employee List
   */
  ngOnInit(): void {
    this.isProfileLoad = true;
    this.getDetails()
  }

  /**
   * Get the employee details
   */
  async getDetails() {
    try {
      this.employees = await this.service.getDetails('employee');
      this.isProfileLoad = false;
    }
    catch (err) {
      this.isProfileLoad = false;
      console.log(err);
    }
  }

  /**
   * Delete the Particular User
   * @param user 
   */
  async deleteUser(user) {
    try {
      let res: any = await this.service.deleteDetails('employee', user.id);
      if (res && res.id) {
        this.toastr.success("Successfully deleted");
        this.getDetails();
      }
    }
    catch (err) {
      this.toastr.error("Failed to delete")
    }
  }

}
