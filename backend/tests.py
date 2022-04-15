from unittest import main, TestCase
from app import app


class UnitTests(TestCase):
    def setUp(self):
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()
        self.headers = {
            "content-type": "application/vnd.api+json",
            "accept": "application/vnd.api+json",
        }

    def test_home(self):
        req = self.client.get("/", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing all housing data
    def test_housing(self):
        req = self.client.get("/api/housing", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing singular housing data
    def test_housing_single(self):
        req = self.client.get("/api/housing/1", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing pagination of housing data
    def test_housing_pages(self):
        req = self.client.get(
            "/api/housing?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    def test_housing_pages_fail(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)

    # testing all childcare data
    def test_childcare(self):
        req = self.client.get("/api/childcare", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing singular childcare data
    def test_childcare_single(self):
        req = self.client.get("/api/childcare/1", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing pagination of childcare data
    def test_childcare_pages(self):
        req = self.client.get(
            "/api/childcare?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    # testing pagination of childcare data fail
    def test_childcare_pages_fail(self):
        req = self.client.get(
            "/api/childcare?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)

    # testing all job data
    def test_jobs(self):
        req = self.client.get("/api/jobs")
        self.assertEqual(req.status_code, 200)

    # testing singular job data
    def test_jobs_single(self):
        req = self.client.get("/api/jobs/1")
        self.assertEqual(req.status_code, 200)

    # testing pagination of job data
    def test_jobs_pages(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    # testing pagination of job data fail
    def test_jobs_pages_fail(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)
    


if __name__ == "__main__":
    main()
