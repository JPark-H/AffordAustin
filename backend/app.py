from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    # return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'
    return 'Hello World'

@app.route("/test")
def test():
    return 'Test'

@app.route("/test2")
def test2():
    return 'Test2'

@app.route("/afterci")
def test2():
    return 'manihategitlab'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
