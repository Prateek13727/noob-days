import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications, {notify} from 'react-notify-toast';
import DirectoryWorkspace from './directoryWorkspace';
import { createDirectory, updatePWD} from '../actions/index';

class DirectoryExplorer extends React.Component {
  constructor(props) {
    super(props)
    this.treeData = []
    this.textInput = React.createRef();
  }

  componentWillMount() {
    const { createDirectory } = this.props
    createDirectory({
      key: this.generateDirectoryKey(),
      _parentKey: null,
      isLeaf: false,
      name: "Root"
    })
  }

  onCreate(){
    const { createDirectory, directories, pwd } = this.props
    const name = this.textInput.current.value;
    if (!this.validateDirectoryName(name)) {
      let color = { background: '#0E1717', text: "#FFFFFF" };
      notify.show('Please enter a valid directory name and try again', 'error', 1000, color);
      return
    }
    if (!this.validateRootDirectory(pwd)) {
      let color = { background: '#0E1717', text: "#FFFFFF" };
      notify.show('Cannot create directory at root level.\n Please expand root directory and try again', 'error', 1000, color);
      return
    }
    const _parentKey = pwd.split("/").pop();
    if (!this.validateDuplicateDirectory(name, _parentKey)) {
      let color = { background: '#0E1717', text: "#FFFFFF" };
      notify.show('Cannot create duplicate directory at same level.\n Please rename directory and try again', 'error', 1000, color);
      return
    }
    const key = this.generateDirectoryKey();
    createDirectory({
      key,
      _parentKey,
      isLeaf: false,
      name
    })
    this.updateDirectoryPath(key)
  }

  updateDirectoryPath(key) {
    const { updatePWD, pwd } = this.props;
    const keys = pwd.split("/")
    keys.push(key.toString())
    updatePWD(keys.join("/"))
  }

  validateDirectoryName(name) {
    if (!name) {
      return false;
    }
    if(!(/^[a-zA-Z0-9]*$/.test(name))) {
      return false
    }
    return true
  }

  validateRootDirectory(pwd) {
    if (!pwd) {
      return false
    }
    return true
  }

  validateDuplicateDirectory(name, parentKey) {
    const names = this.getAllDirectoryNamesByParentId(parentKey)
    console.log(names);
    if(names && names.indexOf(name) !== -1) {
      return false;
    }
    return true;
  }

  getAllDirectoryNamesByParentId(parentKey) {
    const { directories } = this.props;
    const names = [];
    Object.keys(directories).forEach((key) => {
      if (directories[key]._parentKey === parentKey) {
        names.push(directories[key].name)
      }
    })
    return names
  }

  buildReactTreeData(rowData) {
      // final tree element
      const reactTree = [];
      Object.keys(rowData).forEach((index) => {
          if (rowData[index] && rowData[index]._parentKey) {
              // push the child node in [parentNode].children element
              const parent = rowData[index]._parentKey;
              if (rowData[parent] && rowData[parent].children) {
                  rowData[parent].children.push(rowData[index]);
              } else {
                  rowData[parent].children = [rowData[index]];
              }
          } else if (rowData[index] && !rowData[index]._parentKey) {
              /*
               * if node has no _parentKey, it is root node will
               * be pushed to reactTree. Children nodes are filled with reference
               */
              reactTree.push(rowData[index]);
          }
      });
      return reactTree;
  }

  getCurrentDirectoryPath() {
    const { directories, pwd } = this.props;
    return pwd.split("/").map( key => directories[key] ? directories[key].name : "" ).join("/")
  }

  generateDirectoryKey() {
    return Math.random();
  }
  render() {
    const { directories } = this.props
    const currentDirPath = this.getCurrentDirectoryPath()
    this.treeData = this.buildReactTreeData(JSON.parse(JSON.stringify(directories)))
    return <div className="buffer container">
      <div className="row top-buffer">
        <div className="col-no-pad col-md-4">
          <input type="text" className="directory__pwd" value={currentDirPath}/>
        </div>
        <div className="col-no-pad col-md-2 ">
          <input ref={this.textInput} type="text" className="directory__name-input" placeholder="type folder name"/>
        </div>
        <div className="col-md-1 padding-right-sm">
          <button className="create__button" onClick={this.onCreate.bind(this)}>Create</button>
        </div>
      </div>
      <div className="row top-buffer">
        <div className="col-md-7">
            <DirectoryWorkspace treeData={this.treeData} directories={directories}/>
        </div>
      </div>
      <Notifications />
    </div>
  }
}

function mapActionsToProps(dispatch) {
  // the createDirectory is called the result  is passed to all the reducers
  return bindActionCreators({ createDirectory, updatePWD }, dispatch);
}

function mapStateToProps({directories, pwd}) {
  // whatever is returned from here will show up as props in the component
  return {
    directories,
    pwd
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DirectoryExplorer);
