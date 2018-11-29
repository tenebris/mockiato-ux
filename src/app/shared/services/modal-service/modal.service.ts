import {Injectable} from '@angular/core';

export interface ModalComponent
{
  id: string;

  open(id: string): void;
  close(id: string): void;
}

@Injectable({providedIn: 'root'})
export class ModalService
{

  private modals: ModalComponent[] = [];


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { }


  /**
   * Adds the modal specified to the list of known modals.
   *
   * @param modal to add
   */
  add(modal: ModalComponent)
  { this.modals.push(modal); }


  /**
   * Removes the modal specified from the list of known modals.
   *
   * @param id of modal in dom
   */
  remove(id: string)
  { this.modals = this.modals.filter(x => x.id !== id); }


  /**
   * Opens the specified modal dialog.
   *
   * @param id of modal in dom
   */
  open(id: string)
  {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }


  /**
   * Closes the specified modal dialog.
   *
   * @param id of modal in dom
   */
  close(id: string)
  {
    // close modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
