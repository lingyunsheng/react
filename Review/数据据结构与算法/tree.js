function Node(key) {

    this.key = key
    this.left = null
    this.right = null

}
function BinaryTree() {
    this.root = null
    this.insert=insert
}
function insert(key) {
    const newNode = new Node(key)
    const insertNode = (newNode, node) => {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }
    if (!this.root) {
        this.root = newNode
    } else {
        insertNode(this.root, newNode)
    }

}
const binaryTree = new BinaryTree()
binaryTree.insert(8)
binaryTree.insert(9)
binaryTree.insert(10)
binaryTree.insert(11)
binaryTree.insert(12)
binaryTree.insert(13)