from flask import Flask, request, Response, render_template, session
from mapping import find_relative

app = Flask(__name__)


@app.route("/relatives-calculator", methods=["POST", "GET"])
def relatives() -> Response:
    if request.method == "GET":
        return render_template("relative_calculator.html")
    relative_chain: list = request.json.get("relation-chain")
    # do something
    relative_result = find_relative(relative_chain)
    
    mandarin = relative_result[0]
    tai_han = relative_result[1]
    tai_lo = relative_result[2]


    if request.method == "POST":
        return {"status": True, "message": {"self": [[mandarin, tai_lo, tai_han]]}}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)