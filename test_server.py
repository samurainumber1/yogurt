import pytest

from server import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_admin_account_exists(client):
    response = client.post('/api/login', json={'username': 'Admin', 'password': 'hRd9ZfES'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert data['user']['role'] == 'admin'


def test_register_and_login_flow(client):
    response = client.post('/api/register', json={'username': 'alice', 'password': 'Pass123!'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True

    response = client.post('/api/login', json={'username': 'alice', 'password': 'Pass123!'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['user']['username'] == 'alice'
