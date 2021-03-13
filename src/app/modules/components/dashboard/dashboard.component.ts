import { LoginService } from 'src/app/core/services/login.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { merge, startWith, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core'
import {PageEvent} from '@angular/material/paginator';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Stocks } from 'src/app/models/Stocks';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'Stock Id',
    'Stock Name',
    'Current Price',
    'Last Updated'
  ];
  user: String='';
  public dataSource :MatTableDataSource<Stocks>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addStockForm: FormGroup;
  searchStockForm : FormGroup;
  isLoadingResults = false;
  recordCount : any;
  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private LoginService: LoginService
  ) {
    this.addStockForm = new FormGroup({
      stockName: new FormControl('',[Validators.required]),
      currentPrice: new FormControl('', [Validators.required,Validators.min(1),Validators.max(1000000)])
    });

    this.searchStockForm = new FormGroup({
      stockId: new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000000)])
    });
    const matcher = new MyErrorStateMatcher();
  }

  get f() {
    return this.addStockForm.controls;
  }

  get g() {
    return this.searchStockForm.controls;
  }


  ngOnInit(): void {

    this.LoginService.currentUserValue.subscribe(
      user=> this.user=user
    )
    this.isLoadingResults = true;
    this.dashboardService
    .getstockDetails()
    .subscribe(
      (data) => {
        console.log(data)
        this.isLoadingResults = false;
        if (data.length > 0) {
          this.recordCount=data.length;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        } else {
          this.toastr.warning('No Records found');
        }
      },
      (error) => {
        this.isLoadingResults = false;
        this.toastr.error(
          'An Internal error has occured. Please contact System Administrator'
        );
      }
    );

  }

  ngAfterViewInit() {

  }

  addStock() {
    if (this.addStockForm.invalid) {
      return;
  }
    this.isLoadingResults = true;
    this.dashboardService.addStockDetails(this.f.stockName.value, this.f.currentPrice.value)
    .subscribe(
      (data) => {
        this.isLoadingResults = false;
        this.toastr.success('Stock Added successfully');
        this.ngOnInit();
  },
  (error) => {
    this.isLoadingResults = false;
    this.toastr.error(
      'An Internal error has occured. Please contact System Administrator'
    );
  });

  }

  searchStockById()
  {
    if(this.searchStockForm.invalid)
    {
      this.toastr.error(
        'Please enter valid Stock Id'
      );
      return
    }
    this.dashboardService.getStockDetailsById(this.g.stockId.value)
    .subscribe(
      (data) => {
        console.log(data)
        this.isLoadingResults = false;
        if (data!=null) {
          this.recordCount=data.length;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator=this.paginator;
        } else {
          this.toastr.warning('No Records found');
        }
      },
      (error) => {
        this.isLoadingResults = false;
        if(error.status===404){
          this.toastr.warning(
            'Stock Id not found'
          );
        }
        else{
        this.toastr.error(
          'An Internal error has occured. Please contact System Administrator'
        );
        }
      })
    }



  reset() {
    this.addStockForm.reset();
  }

  resetSearch()
  {
    this.searchStockForm.reset();
    this.ngOnInit();
  }
}
