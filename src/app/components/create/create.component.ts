import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public saveProject;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear nuevo proyecto";
    this.project = new Project('', '', '', '', 2020, '', '' );
    this.url = Global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    //Guardo los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          //Subo la imagen
          this._uploadService.makeFileRequest(Global.url + 'uploadImage/' + response.project._id, [], this.filesToUpload, 'image' )
          .then((result:any) => {
            this.saveProject = result.project;
            this.status = 'success';
            form.reset();
          });

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
