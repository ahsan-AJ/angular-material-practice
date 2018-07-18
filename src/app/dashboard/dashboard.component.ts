import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post } from '../Post';
import {DataSource} from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dataService: DataService, public auth: AuthService, public dialog: MatDialog) { }
  displayedColumns = ['date-posted', 'title', 'category', 'delete']; // displayedColumns ONLY
  dataSource = new PostDataSource(this.dataService);

  deletePost(id) {
    if (this.auth.isAuthenticated()) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('login before update');
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width : '600px',
      data : 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }


}

export class PostDataSource extends DataSource<any> {

  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    console.log('connect called');
    return this.dataService.getData();
  }

  disconnect() {}
}
