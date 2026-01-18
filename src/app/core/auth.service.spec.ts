import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, AuthResponse } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should call login endpoint', () => {
    const payload = { email: 'test@example.com', password: '123456' };
    const mockRes: AuthResponse = { token: 'abc', email: 'test@example.com' };

    service.login(payload).subscribe(res => {
      expect(res.token).toBe('abc');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRes);
  });

  it('should call register endpoint', () => {
    const payload = { name: 'Test', email: 'test@example.com', password: '123456' };
    const mockRes: AuthResponse = { token: 'abc', email: 'test@example.com' };

    service.register(payload).subscribe(res => {
      expect(res.token).toBe('abc');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRes);
  });
});
