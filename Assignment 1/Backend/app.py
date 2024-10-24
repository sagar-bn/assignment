from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mock function to create a rule
def create_rule(rule_string):
    return {"rule": rule_string}

# Mock function to combine rules
def combine_rules(rule_nodes):
    return " AND ".join([rule["rule"] for rule in rule_nodes])

# Mock function to evaluate rules
def evaluate_rule_on_data(rule_node, data):
    if "data" in data:
        return "Rule matches the data"
    return "No match"

# Home route to check if the server is running
@app.route('/')
def home():
    return "Flask server is running!"

# Route to create a rule
@app.route('/create_rule', methods=['POST'])
def create_rule_route():
    data = request.get_json()
    rule_string = data.get('rule', '')
    
    if not rule_string:
        return jsonify({"error": "Rule string is missing"}), 400
    
    rule_node = create_rule(rule_string)
    return jsonify({"rule_node": rule_node}), 200

# Route to combine multiple rules
@app.route('/combine_rules', methods=['POST'])
def combine_rules_route():
    data = request.get_json()
    rule_nodes = data.get('rules', [])
    
    if not rule_nodes:
        return jsonify({"error": "No rules provided"}), 400
    
    combined_rule = combine_rules(rule_nodes)
    return jsonify({"combined_rule": combined_rule}), 200

# Route to evaluate rule on data
@app.route('/evaluate_rule', methods=['POST'])
def evaluate_rule_route():
    data = request.get_json()
    rule_node = data.get('rule_node', {})
    input_data = data.get('data', {})
    
    if not rule_node or not input_data:
        return jsonify({"error": "Rule or data is missing"}), 400
    
    result = evaluate_rule_on_data(rule_node, input_data)
    return jsonify({"evaluation_result": result}), 200

if __name__ == '__main__':
    app.run(debug=True)
