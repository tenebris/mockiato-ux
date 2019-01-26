import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import * as moment from 'moment';

import {Service, ServiceType} from '../../../model/service/service';
import {LastModifiedDetail} from '../../../model/common/last-modified-detail';
import {appLogger} from '../../../app-logger';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {LogLevel} from '../../../services/logging/logging.service';


interface Testable
{
  test: (string) => boolean;
}


type ColumnToStringFunction = (Service) => string;

type ColumnPredicate = (string) => boolean;


interface ColumnMappingDetail
{
  name: string;
  toString: ColumnToStringFunction;
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


/**
 * Builds a {@link ColumnMappingDetail} object for the specified column name.
 * The column name should match that given in the HTML snipped defining it.
 *
 * @param column name to process
 */
function mapColumnNameToDetails(column: string): ColumnMappingDetail
{
  // we need a function to convert a given column to a string value
  let f: ColumnToStringFunction;
  switch (column)
  {
    case 'group':
      f = (t) => t.group.name;
      break;

    case 'owner':
      f = (t) => t.owner.name;
      break;

    case 'type':
      f = (t) => ServiceType[t.type];
      break;

    case 'modified-by':
      f = (t) => t.lastModified && t.lastModified.user;
      break;

    case 'when':
      f = (t) => formatDate(t.lastModified);
      break;

    default:
      f = (t) => t[column];
      break;
  }

  // return the details for this column
  return {
    name: column,
    toString: f,
  };
}


/**
 * Builds a single predicate that tests whether each column defined matches the filter string
 * @param mappingDetails for all displayed columns
 * @return a function that will check each column against a given string
 */
function buildFilterPredicate(mappingDetails: ColumnMappingDetail[]): (Service, string) => boolean
{
  return (item: Service, filter: string) => {
    if (!item) return false;  // should never be but wont ever match an empty column

    appLogger().trace('filtering with string: ', filter);

    // determine if we are using a regex and build appropriate function
    let columnMatches: ColumnPredicate;
    if (filter.startsWith('/'))
    {
      const _regex = filter.match(/\/(.*)\/([a-z]*)?/);
      appLogger().trace('filtering regex: ', _regex);

      let pattern: Testable;
      try
      {
        pattern = _regex ? new RegExp(_regex[1], _regex[2]) : new RegExp(filter.slice(1));
        pattern.test(''); // fail-fast if RegEx is invalid so that we can catch it here...
      }
      catch (e)
      {
        appLogger().trace('invalid regexp -- falling back to matching everything', _regex, e);
        pattern = {test: () => true};
      }

      columnMatches = (v) => {
        appLogger().trace('checking regexp column filter', typeof v, v, pattern);
        return v && pattern.test(v);
      };
    } else
    {
      columnMatches = (v: string) => {
        appLogger().trace('checking simple column filter', typeof v, v);
        return v && v.toLowerCase().indexOf(filter) >= 0;
      };
    }

    // TODO: refactor loop below to only check filter against constructed string instead of each column
    //  this would allow more complex regular expressions that exclude values -- currently not possible

    let result = false;
    for (const column of mappingDetails)
    {
      try
      {
        if (columnMatches(column.toString(item)))
        {
          result = true;
          break;
        }
      }
      catch (e)
      {
        appLogger().warn(`blew chunks evaluating column: '${column.name}' in filter: ignoring value
add or adjust switch case for this column to mapColumnNameToDetails function to resolve.\n`, e);
      }
    }

    return result;
  };
}


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

  dataSource: MatTableDataSource<Service>;
  columnMappingDetails: ColumnMappingDetail[] = [];
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
  {
    filterValue = filterValue.trim();
    // only lower-case the filter string if it is not a regex
    this.dataSource.filter = filterValue.startsWith('/') ? filterValue : filterValue.toLowerCase();
  }


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
    this.columnMappingDetails = this.displayedColumns.map(mapColumnNameToDetails);
    this.filterPredicate = buildFilterPredicate(this.columnMappingDetails);

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
