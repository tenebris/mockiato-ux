import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import * as moment from 'moment';

import {ServiceStore} from '../../../shared/model/service/service-store';
import {Service, ServiceType} from '../../../shared/model/service/service';
import {LastModifiedDetail} from '../../../shared/model/common/last-modified-detail';
import {appLogger} from '../../../shared/app-logger';


function filterPredicate(t: Service, filter: string): boolean
{
  return t && t.name.toLowerCase().indexOf(filter) >= 0
         || t.group.name.toLowerCase().indexOf(filter) >= 0
         || ServiceType[t.type].toLocaleLowerCase().indexOf(filter) >= 0
         || (t.owner && t.owner.name.toLowerCase().indexOf(filter) >= 0)
         || (t.lastModified && t.lastModified.user.toLowerCase().indexOf(filter) >= 0)
         || formatDate(t.lastModified).toLowerCase().indexOf(filter) >= 0;
}


function sortingDataAccessor(item: Service, property: string)
{
  let value;
  switch (property)
  {
    case 'owner':
      value = item.owner ? item.owner.name : undefined;
      break;

    case 'when':
      value = item.lastModified ? item.lastModified.timestamp : undefined;
      break;

    case 'modified-by':
      value = item.lastModified ? item.lastModified.user : undefined;
      break;

    case 'group':
      value = item.group.name;
      break;

    default:
      value = item[property];
  }
  appLogger().trace('sort accessor', property, value, item);
  return value;
}


function formatDate(detail: LastModifiedDetail): string
{ return detail ? moment(detail.timestamp).format('lll [GMT]Z') : ''; }


@Component({
  selector: 'app-browse-system-v2',
  templateUrl: './browse-system-v2.component.html',
  styleUrls: ['./browse-system-v2.component.scss']
})
export class BrowseSystemV2Component implements OnInit
{
  readonly displayedColumns: string[] = ['name', 'type', 'group', 'modified-by', 'when'];
  readonly filterControl = new FormControl('');
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private router: Router, private route: ActivatedRoute,
              private serviceStore: ServiceStore, private changeDetectorRef: ChangeDetectorRef)
  {
    this.dataSource = new MatTableDataSource([]);
  }


  doRefreshServices() { this.serviceStore.publishLargeDummyDataSet(); }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  applyFilter(filterValue: string)
  { this.dataSource.filter = filterValue.trim().toLowerCase(); }


  formattedDate(lastModified: LastModifiedDetail) { return formatDate(lastModified); }


  onClick(target: Service)
  {
    appLogger().debug('click event', target);
    this._navigateToServiceDetail(target);
  }


  private _navigateToServiceDetail(target: Service): void
  {
    appLogger().debug(`selected ${target.name}:_id=${target._id}`);
    this.router.navigate(['service', target._id], {relativeTo: this.route});
  }


  private _configureDataSource()
  {
    this.dataSource.sortingDataAccessor = sortingDataAccessor;
    this.dataSource.filterPredicate = filterPredicate;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit()
  {
    this.sort.active = 'when';
    this.sort.direction = 'desc';

    this.serviceStore.services.subscribe((t) => {
      appLogger().debug('detected service list update', t);
      this.dataSource = new MatTableDataSource(t);
      this._configureDataSource();

      this.filterControl.setValue('');
      this.changeDetectorRef.detectChanges();
    });
  }
}
