import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalComponent, ModalService} from '../../services/modal-service/modal.service';
import {appLogger} from '../../app-logger';


@Component({
  selector: 'app-simple-modal',
  template: `
    <div class="simple-modal">
      <div class="simple-modal-body">
        <ng-content></ng-content>
      </div>
    </div>
    <div class="simple-modal-background"></div>
  `,
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements ModalComponent, OnInit, OnDestroy
{

  @Input() clickToClose = false;
  @Input() id: string;
  private readonly element: any;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(ref: ElementRef, private modalService: ModalService)
  {
    this.element = ref.nativeElement;    // grab real element from the dom
    this.element.style.display = 'none'; // force element hidden initially
  }


  open(): void
  {
    this.element.style.display = 'block';
    document.body.classList.add('simple-modal-open');
  }


  close(): void
  {
    this.element.style.display = 'none';
    document.body.classList.remove('simple-modal-open');
  }


  ngOnInit()
  {
    // ensure id attribute exists
    if (!this.id)
    {
      appLogger().error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click only if requested
    if (this.clickToClose)
    {
      this.element.addEventListener('click', e => { if (e.target.className === 'simple-modal') this.close(); });
    }

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }


  /** remove ourselves from the modal service when directive is destroyed */
  ngOnDestroy(): void
  {
    this.modalService.remove(this.id);
    this.element.remove();
  }
}
