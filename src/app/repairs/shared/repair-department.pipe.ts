import { Pipe, PipeTransform } from '@angular/core'
import { Repair } from './repair.model';
import { Auth } from '../../core/auth.service';

@Pipe({
    name: 'repairDepartment'
})
export class RepairDepartmentPipe implements PipeTransform {
    constructor(
        private auth: Auth
    ) {

    }

    department:string = this.auth.userProfile['user_metadata']['department'];

    transform(allRepair: Repair[]) {
        if(this.department == 'Admin'){
            return allRepair;
        } else {
            return allRepair.filter(repair=>repair.department == this.department);
        }
        
    }
}