import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  car?: Car;
  images: string[] = [];
  responsiveOptions: any;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCar(this.route.snapshot.params['id']);
  }

  getCar(id: number): void {
    this.carService.getById(id).subscribe((data) => {
      this.car = data;
      this.images = this.car.photoUrls;
    });
  }
}
