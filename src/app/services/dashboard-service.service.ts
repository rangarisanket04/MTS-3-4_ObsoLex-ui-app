import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardwareData } from '../model/HardwareData';

interface LifecycleResponse {
  hardwareData: any[];
  totalRecords: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private newsBaseUrl = 'http://localhost:8080/api/news'; 
  private lifeCycleBaseUrl = 'http://localhost:8080/api/lifeCycle';

  constructor(private http: HttpClient) {}

  getDashboardData(hardwareName: string, limit: number = 20): Observable<HardwareData[]> {
    const params = new HttpParams()
      .set('hardwareName', hardwareName)
      .set('limit', limit.toString());

    return this.http.get<HardwareData[]>(`${this.newsBaseUrl}/latest`, { params });
  }

  getDeviceLifecycleData(): Observable<LifecycleResponse> {
    return this.http.get<LifecycleResponse>(`${this.lifeCycleBaseUrl}/device-lifecycle/all`);
  }

  scanDevice(hardwareNames: string[]): Observable<number> {
    let params = new HttpParams();
    hardwareNames.forEach(name => {
      params = params.append('hardwareNames', name);
    });
  
    return this.http.post<number>(`${this.newsBaseUrl}/scan`, {}, { params });
  }

  getLatestNews(hardwareName: string, limit: number): Observable<HardwareData[]> {
    const url = `${this.newsBaseUrl}/latest?hardwareName=${encodeURIComponent(hardwareName)}&limit=${limit}`;
    return this.http.get<HardwareData[]>(url);
  }
}

