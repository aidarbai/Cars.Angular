import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { Car } from 'src/app/models/car.model';
import { ResponseWithCars } from 'src/app/models/response-with-cars.model';
import { SortAndPageCarmodel } from 'src/app/models/sort-and-page-car.model';
import { CarService } from 'src/app/services/car.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit {
  response?: ResponseWithCars;
  cars: Car[] = [];

  sortOptions: SelectItem[] = [];
  sortAndPageCarModel: SortAndPageCarmodel;

  constructor(
    private carService: CarService,
    private messageService: MessageService
  ) {
    this.sortAndPageCarModel = new SortAndPageCarmodel();
  }

  ngOnInit(): void {
    this.retrieveCars();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  retrieveCars(): void {
    this.carService.getAll().subscribe((x) => {
      this.response = x;
      this.cars = this.response?.results;
    });
  }

  onSortChange($event: any) {
    let value = $event.value;

    if (value.indexOf('!') === 0) {
      this.sortAndPageCarModel.order = 'desc';
    } else {
      this.sortAndPageCarModel.order = 'asc';
    }

    this.carService.getSorted(this.sortAndPageCarModel).subscribe((x) => {
      this.response = x;
      this.cars = this.response?.results;
    });
  }

  onPageChange(event: any) {
    this.sortAndPageCarModel.pageSize = event.rows;
    this.sortAndPageCarModel.pageNumber = event.page + 1;
    this.carService.getSorted(this.sortAndPageCarModel).subscribe((data) => {
      this.response = data;
      this.cars = this.response?.results;
    });
  }
}
