import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import * as moment from 'moment';

import {Service, ServiceType} from '../../../model/service/service';
import {LastModifiedDetail} from '../../../model/common/last-modified-detail';
import {appLogger} from '../../../app-logger';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';


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
  selector: 'app-service-list-v2',
  templateUrl: './service-list-v2.component.html',
  styleUrls: ['./service-list-v2.component.scss']
})
export class ServiceListV2Component implements OnInit
{

  @Input() subject: Observable<Array<Service>> = undefined;
  @Input() clickThroughHandler: (Service) => void = undefined;
  @Input() displayedColumns: string[] = undefined;
  @Input() filterable = true;
  @Input() pageable = true;
  @Input() pageSizes = [5, 10, 50, 100];

  readonly filterControl = new FormControl('');
  readonly filterPredicates: Array<(Service, string) => boolean> = [];

  dataSource: MatTableDataSource<Service>;
  filterPredicate: (Service, string) => boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private changeDetectorRef: ChangeDetectorRef)
  {
    this.dataSource = new MatTableDataSource([]);
  }


  typeName(type: ServiceType): string { return ServiceType[type]; }


  applyFilter(filterValue: string)
  { this.dataSource.filter = filterValue.trim().toLowerCase(); }


  formattedDate(lastModified: LastModifiedDetail) { return formatDate(lastModified); }


  onClick(row: Service): void
  {
    if (this.clickThroughHandler) this.clickThroughHandler(row);
    else appLogger().info('ignoring click-through: not defined');
  }


  private _configureDataSource()
  {
    this.dataSource.sortingDataAccessor = sortingDataAccessor;
    if (this.filterable && this.filterPredicate) this.dataSource.filterPredicate = this.filterPredicate;
    if (this.pageable) this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit()
  {
    if (!this.displayedColumns || this.displayedColumns.length === 0)
    {
      this.displayedColumns = ['name', 'type', 'group', 'modified-by', 'when'];
      appLogger().debug('initializing with default displayed columns', this.displayedColumns);
    } else appLogger().debug('initializing with passed displayed columns', this.displayedColumns);

    // build a list of predicates for each column displayed
    // avoids filtering on hidden columns which leads to unexpected results
    for (const column of this.displayedColumns)
    {
      switch (column)
      {
        case 'name':
          this.filterPredicates.push((t, filter) => {
            return t.name.toLowerCase().indexOf(filter) >= 0;
          });
          break;

        case 'group':
          this.filterPredicates.push((t, filter) => {
            return t.group.name.toLowerCase().indexOf(filter) >= 0;
          });
          break;

        case 'type':
          this.filterPredicates.push((t, filter) => {
            return ServiceType[t.type].toLocaleLowerCase().indexOf(filter) >= 0;
          });
          break;

        case 'owner':
          this.filterPredicates.push((t, filter) => {
            return t.owner && t.owner.name.toLowerCase().indexOf(filter) >= 0;
          });
          break;

        case 'modified-by':
          this.filterPredicates.push((t, filter) => {
            return t.lastModified && t.lastModified.user.toLowerCase().indexOf(filter) >= 0;
          });
          break;

        case 'when':
          this.filterPredicates.push((t, filter) => {
            return formatDate(t.lastModified).toLowerCase().indexOf(filter) >= 0;
          });
          break;

        default:
          appLogger().warn(`unknown column referenced: ${column}`);
      }
    }

    // build a single predicate that tests the predicate for each column defined
    this.filterPredicate = (item, filter) => {
      if (!item) return false;
      for (const _test of this.filterPredicates) if (_test(item, filter)) return true;
      return false;
    };

    // initial sort is descending on the 'when' column
    // TODO: move these to input values
    this.sort.active = 'when';
    this.sort.direction = 'desc';

    // listen for changes to the underlying data and rebuild display if they occur
    this.subject.subscribe((t) => {
      appLogger().debug('detected service list update', t);
      this.dataSource = new MatTableDataSource(t);
      this._configureDataSource();

      this.filterControl.setValue('');
      this.changeDetectorRef.detectChanges();
    });
  }
}
