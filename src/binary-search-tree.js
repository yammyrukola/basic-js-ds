const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = _add(this.root(), data);
    return this;
    
    function _add(node, data) {
      if (!node) return new Node(data);

      if (node.data === data) {
        return node;
      } else {
        if (data < node.data) {
          node.left = _add(node.left, data)
        } else {
          node.right = _add(node.right, data)
        }
      }
      return node;
    }
  }

  has(data) {
    return _has(this.root(), data);

    function _has(node, data) {
      if (!node) return false;
      if (data === node.data) return true;
      return data < node.data 
        ? _has(node.left, data) 
        : _has(node.right, data);
    }
  }

  find(data) {
    return _find(this.root(), data);
    
    function _find(node, data) {
      if (!node) return null;
      if (node.data === data) return node;      
      return data < node.data
        ? _find(node.left, data)
        : _find(node.right, data);
    }
  }

  remove(data) {
    this._root = _remove(this.root(), data);

    function _remove(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = _remove(node.left, data);
        return node;_remove
      }
      if (data > node.data) {
        node.right = _remove(node.right, data);
        return node;
      }
      if (data === node.data) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // complex case (2 children)
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = _remove(node.right, minFromRight.data)
        return node;
      }
    }
  }

  min() {
    return _min(this.root());

    function _min(node) {
      if (!node) return null;
      if (!node.left) return node.data;
      return _min(node.left);
    }
  }

  max() {
    return _max(this.root());

    function _max(node) {
      if (!node) return null;
      if (!node.right) return node.data;
      return _max(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};