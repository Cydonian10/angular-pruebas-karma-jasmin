import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, IUser } from 'src/app/models/general.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) {}

  create(dto: CreateUserDTO) {
    return this.http.post<IUser>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<IUser[]>(this.apiUrl);
  }
}
