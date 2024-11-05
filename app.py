from flask import Flask, request, Response, render_template, session

app = Flask(__name__)

@app.route("/relatives-calculator", methods=["POST", "GET"])
def relatives() -> Response:
    if request.method == "GET":
        return render_template("relative_calculator.html")
    relative_chain: list = request.json.get("relation-chain")
    # do something
    return {"status": True, "message": {"self": [["<中文>", "<台羅>", "<台語>"]]}}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)