import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ClassroomsService {
  constructor(
    private http: Http,
    private storage: Storage,
    private connection: ConnectionService
  ){}

  getClassrooms(teacherId: number, unityId: number){
    if(this.connection.isOnline){
      return this.getOnlineClassrooms(teacherId, unityId)
    }else{
      return this.getOfflineClassrooms(unityId)
    }
  }

  private getOnlineClassrooms(teacherId: number, unityId: number){
    const url = "http://***REMOVED***/api/v1/teacher_classrooms.json";
    const request = this.http.get(url, { params: { teacher_id: teacherId, unity_id: unityId } } );
    return request.map((response: Response) => {
      return {
        data: response.json(),
        unityId: unityId
      }
    });
  }
  private getOfflineClassrooms(unityId: number){
    return new Observable((observer) => {
      this.storage.get('classrooms').then((classrooms) => {
        classrooms.forEach((classroom) => {
          if(classroom.unityId == unityId){
            observer.next(classroom)
            observer.complete()
          }
        })
      })
    })
  }
}