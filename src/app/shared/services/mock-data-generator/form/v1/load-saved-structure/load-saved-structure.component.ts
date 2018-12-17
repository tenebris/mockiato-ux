import {Component, Inject, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../modal-service/modal.service';
import {FormControl, FormGroup} from '@angular/forms';
import {appLogger} from '../../../../../app-logger';

const STRUCTURE_STORAGE_PREFIX = 'mock-data.structure.';
const STRUCTURE_STORAGE_KEY_LAST_USED = 'last';

export class SavedStructure
{ // TODO: move out of component into service?

  /** determines the names of any saved structures in localStorage */
  static readNames(): string[]
  { // TODO: move out of component into service...
    const found = [];

    for (const key in localStorage)
    {
      if (!key.startsWith(STRUCTURE_STORAGE_PREFIX)) continue;
      const name = key.slice(STRUCTURE_STORAGE_PREFIX.length);
      found.push(name);
    }

    return found.sort((a, b) => {
      if (a < b) return -1;
      else if (a === b) return 0;
      else return 1;
    });
  }


  /**
   * Reads the last-used structure from local storage.
   * @return parsed object or undefined if no structure has been saved yet.
   */
  static readLast(): any
  {return SavedStructure.read(STRUCTURE_STORAGE_KEY_LAST_USED); }


  /**
   * Reads the named structure from local Storage
   * @return parsed object or undefined if named item doesn't exist
   */
  static read(name: string): any
  { // TODO: move out of component into service...
    const value = localStorage.getItem(STRUCTURE_STORAGE_PREFIX + name);
    return value ? value.startsWith('{')
                   ? JSON.parse(value)
                   : JSON.parse(this.decompressValue(value))
                 : undefined;
  }


  /** Writes the given data to the last-used key in local storage */
  static writeLast(data: any): void
  { SavedStructure.write(STRUCTURE_STORAGE_KEY_LAST_USED, data); }


  /** writes the given structure to localStorage under the specified name */
  static write(name: string, data: any): void
  { // TODO: move out of component into service...
    const jsonString = JSON.stringify(data);
    localStorage.setItem(STRUCTURE_STORAGE_PREFIX + name, this.compressValue(jsonString));
  }


  static getLastUsedKeyName() { return STRUCTURE_STORAGE_KEY_LAST_USED; }


  private static decompressValue(value: string): string
  // { return decompress(value, {inputEncoding: 'Base64'}); }
  { return value; } // TODO: replace no-op with compression library


  private static compressValue(value: string): string
  // { return LZUTF8.compress(value, {outputEncoding: 'Base64'}); }
  { return value; } // TODO: replace no-op with compression library

}


@Component({
  selector: 'app-mock-data-load-saved-form',
  templateUrl: './load-saved-structure.component.html',
  styleUrls: ['./load-saved-structure.component.scss']
})
export class LoadSavedStructureComponent implements OnInit
{
  @Input() structure: FormControl;
  @Input() form: FormGroup;

  myFormGroup: FormGroup;

  readonly _modal_id = STRUCTURE_STORAGE_PREFIX + 'modal';

  /** initialized with list of structures saved in local storage */
  namedStructures: string[];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private modalService: ModalService) {}


  showLoadSavedModal(): void { this.modalService.open(this._modal_id); }


  doLoadStructure(): void
  {
    this.structure.setValue(this.myFormGroup.get('newStructure').value);
    this.modalService.close(this._modal_id);
    this.myFormGroup.get('newStructure').setValue(undefined);
  }


  doSoftLoad(): void
  {
    const name: string = this.myFormGroup.get('savedStructureName').value;
    appLogger().debug(`soft-loading key [${name}]`);
    const value = SavedStructure.read(name);
    this.myFormGroup.get('newStructure').setValue(value);
  }


  doLoadRequested(): void
  {
    this.doSoftLoad();
    if (this.structure.value) this.showLoadSavedModal();
    else this.doLoadStructure();
  }


  ngOnInit(): void
  {
    if (!this.structure.value) this.structure.setValue(SavedStructure.readLast());
    this.namedStructures = SavedStructure.readNames();

    this.myFormGroup = new FormGroup({
      savedStructureName: new FormControl(SavedStructure.getLastUsedKeyName()),
      newStructure: new FormControl(undefined),
    });

    this.form.addControl('LoadSavedStructureComponent', this.myFormGroup);
  }

}
