import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/projects';
import { Global } from '../services/global';

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'El servicio funciona correctamente';
    }
}