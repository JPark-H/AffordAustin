from unittest import main, TestCase
from app import app


class UnitTests(TestCase):
    def setUp(self):
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def test_home(self):
        test_client = app.test_client()
        req = test_client.get("/")
        self.assertEqual(req.status_code, 200)

    def test_housing(self):
        test_client = app.test_client()
        req = test_client.get("/Housing")
        self.assertEqual(req.status_code, 200)

    def test_childcare(self):
        test_client = app.test_client()
        req = test_client.get("/ChildCare")
        self.assertEqual(req.status_code, 200)

    # def test_jobs(self):
    #     test_client = app.test_client()
    #     req = test_client.get("/Jobs")
    #     self.assertEqual(req.status_code, 200)


if __name__ == "__main__":
    main()
