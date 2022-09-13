import supertest from 'supertest';
import { app } from '../../services/app';

// @ts-ignore
it('returns 201 on successfull signup', async () => {
  return supertest(app).post('/api/users/signup').expect(201);
});
