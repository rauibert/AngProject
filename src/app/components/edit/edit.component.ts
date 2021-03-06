import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public saveProject;

  constructor(
    private _projectService : ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar proyecto";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    //Guardo los datos
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project){
          if(this.filesToUpload){
             //Subo la imagen
            this._uploadService.makeFileRequest(Global.url + 'uploadImage/' + response.project._id, [], this.filesToUpload, 'image' )
            .then((result:any) => {
              this.saveProject = result.project;
              this.status = 'success';
            });
          }else{
            this.saveProject = response.project;
            this.status = 'success';
          }

        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
