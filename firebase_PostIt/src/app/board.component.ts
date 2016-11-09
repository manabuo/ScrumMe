import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { FirebaseListObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { FirebaseService } from './database/firebase.service';


@Component({
    selector: 'list',
    templateUrl: './board.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FirebaseService]

})
export class BoardComponent implements OnInit {

    title: string;
    todos: PostIt[];
    cosos: FirebaseListObservable<any>;


    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {

        dragulaService.drag.subscribe((value) => {
            console.log(`drag: ${value[0]}`);
            this.onDrag(value.slice(1));
        });
        dragulaService.dropModel.subscribe((value) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });



        dragulaService.over.subscribe((value) => {
            console.log(`over: ${value[0]}`);
            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {
            console.log(`out: ${value[0]}`);
            this.onOut(value.slice(1));
        });

        
    }

    private onDrag(args) {
        let [e, el] = args;


    }

    private onDrop(args) {
        let [e, el] = args;
        alert(e);
        alert(el);
    }

    private onOver(args) {
        let [e, el, container] = args;
    }

    private onOut(args) {
        let [e, el, container] = args;
    }



    deleteItemToDo(key: string) {
        this.firebaseService.delete(key, "/todo");
    }

    deleteItemInProgress(key: string) {
        this.firebaseService.delete(key, "/inprogress");
    }


    ngOnInit() {


        this.firebaseService.getCollection("/todo").subscribe(
            (items) => this.todos = items
        );




        this.title = "Lista de tareas";
        this.cosos = this.firebaseService.getCollection('/inprogress');
    }

}