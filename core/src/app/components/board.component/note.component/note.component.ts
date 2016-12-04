import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']

})
export class NoteComponent {

    @Input() note: any;

    @Output() notify = new EventEmitter<string>();

    @Input() currentList: string;





    private deleteItem() {

        this.notify.emit(this.note.$key);
    }
}
