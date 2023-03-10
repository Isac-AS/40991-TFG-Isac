import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pipeline, ShortStrategy } from 'src/app/models/pipeline.model';
import { PipelineAPIService } from 'src/app/services/pipepile-api.service';
import { EntryDeletionDialogComponent } from '../entry-deletion-dialog/entry-deletion-dialog.component';

@Component({
  selector: 'app-pipeline-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent {

  pipelineList: Pipeline[] = [];
  displayedColumns: string[] = ['selected', 'name', 'description', 'created_by', 'last_modified_by', 'strategies', 'delete']
  dataSource: MatTableDataSource<Pipeline>;

  selectedPipeline: Pipeline = {
    name: 'Ninguno',
    description: '',
    strategies: [{
      id: -1,
      name: ''
    }],

    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private pipelineAPI: PipelineAPIService,
    public dialog: MatDialog,
  ) { 
    this.dataSource = new MatTableDataSource(this.pipelineList);
    this.fetchPipelines();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchPipelines() {
    this.pipelineAPI.getAllPipelines().subscribe({
      next: (pipelines) => {
        console.log(pipelines)
        this.pipelineList = pipelines;
        this.dataSource = new MatTableDataSource(this.pipelineList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  // User deletion
  openUserDeletionDialog(pipeline_id: number) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deletePipeline(pipeline_id)
        }
        console.log(result)
      }
    )
  }

  deletePipeline(pipeline_id: number) {
    this.pipelineAPI.deletePipeline(pipeline_id).subscribe(
      (response) => {
        console.log(response)
        this.fetchPipelines();
      }
    )
  }

}
