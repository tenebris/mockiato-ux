import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../modal-service/modal.service';
import {FormControl, FormGroup} from '@angular/forms';


const STRUCTURE_STORAGE_PREFIX = 'mock-data.structure.';
const STRUCTURE_STORAGE_KEY_LAST_USED = 'last';


export class SavedStructure
{ // TODO: move out of component into service...

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
  {return SavedStructure.read(STRUCTURE_STORAGE_KEY_LAST_USED);}


  /**
   * Reads the named structure from local Storage
   * @return parsed object or undefined if named item doesn't exist
   */
  static read(name: string): any
  { // TODO: move out of component into service...
    const lastSaved = localStorage.getItem(STRUCTURE_STORAGE_PREFIX + name);
    return lastSaved ? JSON.parse(lastSaved) : undefined;
  }

  /** Writes the given data to the last-used key in local storage */
  static writeLast(data: any): void { SavedStructure.write(STRUCTURE_STORAGE_KEY_LAST_USED, data); }

  /** writes the given structure to localStorage under the specified name */
  static write(name: string, data: any): void
  { // TODO: move out of component into service...
    localStorage.setItem(STRUCTURE_STORAGE_PREFIX + name, JSON.stringify(data));
  }

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


  doLoadRequested(): void
  {
    const name: string = this.myFormGroup.get('savedStructureName').value;
    const value = SavedStructure.read(name);
    this.myFormGroup.get('newStructure').setValue(value);
    if (this.structure.value) this.showLoadSavedModal();
    else this.doLoadStructure();
  }


  ngOnInit(): void
  {
    if (!this.structure.value) this.structure.setValue(SavedStructure.readLast());
    this.namedStructures = SavedStructure.readNames();

    this.myFormGroup = new FormGroup({
      savedStructureName: new FormControl(''),
      newStructure: new FormControl({}),
    });

    this.form.addControl('LoadSavedStructureComponent', this.myFormGroup);

    this.myFormGroup.get('savedStructureName').setValue('simple');
  }

}
