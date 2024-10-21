import org.springframework.stereotype.Service;

import java.util.Stack;

@Service
public class RuleService {

    public Node createRule(String ruleString) {
        Stack<Node> nodeStack = new Stack<>();
        Stack<String> operatorStack = new Stack<>();

        String[] tokens = ruleString.split(" ");

        for (String token : tokens) {
            if (token.equals("AND") || token.equals("OR")) {
                operatorStack.push(token);
            } else if (token.equals("(") || token.equals(")")) {
                // Handle parentheses
            } else {
                Node operand = new Node("operand", null, null, token);
                nodeStack.push(operand);
            }

            if (operatorStack.size() > 0 && nodeStack.size() > 1) {
                Node right = nodeStack.pop();
                Node left = nodeStack.pop();
                String operator = operatorStack.pop();
                Node operatorNode = new Node("operator", left, right, operator);
                nodeStack.push(operatorNode);
            }
        }
        return nodeStack.pop();
    }

    public boolean evaluateRule(Node ast, Map<String, Object> data) {
        if (ast.getType().equals("operand")) {
            String[] tokens = ast.getValue().split(" ");
            String key = tokens[0];
            String operator = tokens[1];
            int value = Integer.parseInt(tokens[2]);

            int dataValue = (int) data.get(key);

            switch (operator) {
                case ">": return dataValue > value;
                case "<": return dataValue < value;
                case "==": return dataValue == value;
                default: throw new IllegalArgumentException("Invalid operator");
            }
        } else if (ast.getType().equals("operator")) {
            if (ast.getValue().equals("AND")) {
                return evaluateRule(ast.getLeft(), data) && evaluateRule(ast.getRight(), data);
            } else if (ast.getValue().equals("OR")) {
                return evaluateRule(ast.getLeft(), data) || evaluateRule(ast.getRight(), data);
            }
        }
        return false;
    }
}

