import {appLogger} from '../../../app-logger';


let _downloadElement = null as HTMLElement;


export function structureToHeaderRow(structure: object): string
{
  appLogger().trace('mapping header row', structure);
  const cols: string[] = [];
  for (const key of Object.keys(structure)) cols.push(`"${key}"`);
  return cols.join(',');
}


export function structureToRow(row: object): string
{
  appLogger().trace('processing data row', row);
  const cols: string[] = [];
  for (const key of Object.keys(row)) cols.push(`"${row[key]}"`);
  return cols.join(',');
}


export function downloadMockData(args: {
  data: Array<object>;
  structure: object;
  fileType: string;
  fileName: string;
}): void
{
  // create an element if not already done...
  if (!_downloadElement) _downloadElement = document.createElement('a');

  // these are set based on the file-type requested
  let fileType;
  let suffix;
  let text;

  switch (args.fileType)
  {
    case 'csv':
      const rows = args.data.map<string>(structureToRow);
      rows.unshift(structureToHeaderRow(args.structure));

      fileType = 'text/csv';
      suffix = '.csv';
      text = rows.join('\n');
      break;

    case 'json':
      fileType = 'text/json';
      suffix = '.json';
      text = JSON.stringify(args.data);
      break;

    default:
      throw new Error(`unknown fileType: ${args.fileType}`);
  }

  const fileName = args.fileName + suffix;
  const element = _downloadElement;
  const event = new MouseEvent('click');

  element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', fileName);

  element.dispatchEvent(event);
}

