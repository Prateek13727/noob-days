import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tree, { TreeNode } from 'rc-tree';
import { updatePWD, createDirectory } from '../actions/index';

class DirectoryWorkspace  extends React.Component {
  constructor(props) {
    super(props)
  }

  onExpand(expandedKeys, { expanded, node, nativeEvent }) {
    const { updatePWD, directories } = this.props;
    const orderedKeys = this.getCurrentDirectoryPathKeys(expandedKeys)
    updatePWD(orderedKeys.join("/"))
  }

  renderTreeNodes(list) {
    return list.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} >{this.renderTreeNodes(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}/>
    });
  }

  getCurrentDirectoryPathKeys(expandedKeys) {
    const { directories } = this.props;
    const expandedKeysCopy = Array.from(expandedKeys);
    if (expandedKeysCopy.length > 2) {
      const currentKey = expandedKeysCopy.pop()
      const lastExpandedKey = expandedKeysCopy.pop()
      if (directories[currentKey]._parentKey === lastExpandedKey) {
          expandedKeysCopy.push(lastExpandedKey, currentKey)
      } else {
          expandedKeysCopy.push(currentKey)
          return this.getCurrentDirectoryPathKeys(expandedKeysCopy)
      }
    }
    return expandedKeysCopy
  }

  render() {
      const { treeData } = this.props;
      return <div>
          <Tree
            className={Object.keys(treeData).length ? "directory-workspace": ""}
            onExpand={this.onExpand.bind(this)}
          >
          { this.renderTreeNodes(treeData) }
          </Tree>
      </div>
  }
}

function mapActionsToProps(dispatch) {
  // the createDirectory is called the result  is passed to all the reducers
  return bindActionCreators({ updatePWD }, dispatch);
}

export default connect(null, mapActionsToProps)(DirectoryWorkspace);
