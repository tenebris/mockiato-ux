import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../model/service';

@Component({
  selector: 'app-service-list',
  template: `
    <table class="table service-list card card-strong">
      <tbody>
      <tr *ngFor="let service of services" (click)="selectService(service)">
        <td class="service-title">{{service.name}}</td>
      </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent
{

  @Input()
  services: Service[];

  @Output('service')
  serviceEmitter = new EventEmitter<Service>();

  selectService(service: Service)
  {
    this.serviceEmitter.emit(service);
  }


}
