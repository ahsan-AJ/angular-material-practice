import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DataService } from '../data/data.service';


@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  blogPost = {
    title: '',
    body : '',
    category: '',
    position : 0,
    date_posted : new Date()
  };
  categories = this.dataService.getCategories();

  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.blogPost.position = this.dataService.dataLength();
    this.event.emit({data: this.blogPost});
    this.dialogRef.close();
  }


}
