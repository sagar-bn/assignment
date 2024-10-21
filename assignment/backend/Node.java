public class Node {
    private String type;  // "operator" or "operand"
    private Node left;    // left child node
    private Node right;   // right child node
    private String value; // value for operand nodes (e.g., "age > 30")

    public Node(String type, Node left, Node right, String value) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }

    // Getters and setters
}
