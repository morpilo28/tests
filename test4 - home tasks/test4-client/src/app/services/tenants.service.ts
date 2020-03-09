import { Injectable } from '@angular/core';
import { TenantModel } from '../models/tenant-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TenantsService {
    constructor(private httpClient: HttpClient) { }

    getTenants(): Observable<TenantModel[]> {
        return this.httpClient.get<TenantModel[]>(`${environment.serverUri}/tenants`);
    }
}
