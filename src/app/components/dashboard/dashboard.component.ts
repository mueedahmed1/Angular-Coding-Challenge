import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { interval, Subscription } from 'rxjs';
import { APIResponse, Stash } from 'src/app/interfaces/apiresponse.interface';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  stashArr: Array<Stash> = [];
  nextChangeId!: string;
  pageNumber: number = 1;
  search: string = '';
  dataSubscription$!: Subscription;
  intervalSubscription$!: Subscription;
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  constructor(private spinner: NgxSpinnerService, private service: APIService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getData();
  }

  timerfunc(){
    this.intervalSubscription$ = interval(30000)
    .subscribe((val) => { this.getData(this.nextChangeId) });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 2000,
    });
  }

  getData(id?: string){
    this.spinner.show();
    
    if(id){
     this.dataSubscription$ = this.service.getItems(id).subscribe(
        (res: APIResponse) => {
          this.stashArr = res['stashes'];
          this.nextChangeId = res['next_change_id'];
          this.spinner.hide();
          this.openSnackBar('Oops! Something went wrong in retrieving data.')

        },
        (err) => {
          this.spinner.hide();
          this.openSnackBar('Oops! Something went wrong in retrieving data.')

        }
      )

    }else{

      this.dataSubscription$ = this.service.getItems().subscribe(
        (res: APIResponse) => {
          this.stashArr = res['stashes'];
          this.nextChangeId = res['next_change_id'];
          this.spinner.hide();

        },
        (err) => {
          this.spinner.hide();
          this.openSnackBar('Oops! Something went wrong in retrieving data.')

        }
      )

    }
  }

  toggleFunction(event: MatSlideToggleChange){
   
    if(event.source.checked){
      this.timerfunc();
    }else{
      this.intervalSubscription$.unsubscribe();
    }
    
  }

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
    this.intervalSubscription$.unsubscribe();
}

}
