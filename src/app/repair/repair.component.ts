import { Component, OnInit } from '@angular/core';
import { Repair } from '../repair';
import { RepairService } from '../repair.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {
  summitted = false;
  newRepair = new Repair('','','','--- กรุณาเลือก ---','','','','','','','');

  ngOnInit() { 
    this.getAllRepair(); 
  }
  constructor(private repairService: RepairService) { }
  repairs = [];
  equipmentTypes = [];

  onSubmit(){
    this.createRepair(this.newRepair);
    this.getAllRepair();
  }

  cancle(){
    this.newRepair = new Repair('','','','--- กรุณาเลือก ---','','','','','','','');
  }

  changeRepairType(type:string){
    this.newRepair.repairType = type;
    switch(type){
      case 'คอมพิวเตอร์':
        this.getAllEquipmentType('IT');
      break;
      case 'สาธารณูปโภค':
        this.getAllEquipmentType('Public');
      break;
      default:
        this.equipmentTypes = [];
      break;
    }
  }

  getAllRepair(){
    this.repairService.getRepairAPI()
    .subscribe(
      data => this.repairs = data,
      error => console.log()
    );
  }

  getAllEquipmentType(type:string){
     this.repairService.getEquipmentTypeAPI(type)
    .subscribe(
      data => this.equipmentTypes = data,
      error => console.log()
    );   
  }

  createRepair(repair : Repair){
    this.repairService.createRepair(repair).subscribe(
      data => {
        this.getAllRepair();
      }
    );
  }

  

}
