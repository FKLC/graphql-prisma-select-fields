const { visit } = require('graphql')

module.exports = (document) => {
    const tree = {};
    const branch = [tree];
    visit(document, {
      Field: {
        enter(node) {
          const newBranch = {}
          branch[branch.length - 1][node.name.value] = newBranch
          branch.push(newBranch);
        },
        leave(node) {
          branch.pop()
        }
      }
    })

    const isEmpty = (obj) => { for(const k in obj) { return false; } return true; }
    const recursiveConverter = (tree) => {
      if (isEmpty(tree)) {
        return true
      }
      else {
        for(const k in tree) {
          const val = recursiveConverter(tree[k])
          tree[k] = val === true ? val : { select: val }
        }
        return tree
      }
    }
    return recursiveConverter(tree)
}