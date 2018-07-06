import React,{ Component } from 'react';
import { Field, reduxForm, Fields } from 'redux-form';
import { connect } from 'react-redux';
import Files from 'react-files';
import Papa from 'papaparse';
import { doRequest, addWidget, toggleWidgetState, updateFormData } from '../actions/index';
import Notifications, {notify} from 'react-notify-toast';

class FormComponent extends React.Component {
  
  renderInputFields(fields) {
    const { isDisabled } = this.props;
    const { names } = fields;
    return(
      <div className='row form-group'>
          Number: <input
            className="form-control"
            type="number"
            disabled={isDisabled}
            {...fields[names[0]].input}
          />
          Url: <input
            className="form-control"
            type="text"
            disabled={isDisabled}
            {...fields[names[1]].input}
          />
      </div>
    )
  }

  renderWidgetList() {
    const { widgetCount } = this.props;
    const fields = [];
    let i = 0;
    while ( i < widgetCount ) {
      fields.push(<Fields disabled names={[ `number${i}`, `url${i}` ]} component={this.renderInputFields.bind(this)}/>);
      i++;
    }
    return fields;
  }

  processFormData(values) {
    const { updateFormData } = this.props;
    const { widgetCount } = this.props;
    const dataMap = {};
    let i = 0;
    while(i < widgetCount) {
      const number = parseInt(values[`number${i}`]);
      const url = values[`url${i}`];
      if(number && typeof(number) == 'number') {
          dataMap[i] = [number, url];
      }
      i++;
    }
    updateFormData(dataMap, this.invokeAPIRequest.bind(this))
  }

  parseCSV() {
    const self = this;
    Papa.parse(this.file, {
      complete: function(results) {
        self.processCSV(results);
      }
    });
  }

  processCSV(results) {
    const { updateFormData } = this.props;
    const dataMap = {};
    const { data = {} } = results;
      Object.keys(data).forEach((key, i) => {
        const number = parseInt(data[key][0].trim())
        if(number && typeof(number) == 'number') {
          const url = data[key][1].trim();
          dataMap[i] = [number, url];
        }
      })
    updateFormData(dataMap, this.invokeAPIRequest.bind(this));
  }

  invokeAPIRequest() {
    const { formData } = this.props;
    const { doRequest } = this.props;
    Object.keys(formData).forEach((key) => {
      doRequest(formData[parseInt(key)][0], formData[parseInt(key)][1]);
    })
  }

  onFilesChange(files) {
    this.file = files[0];
    let color = { background: '#0E1717', text: "#008000" };
    notify.show('File Uploaded', 'success', 1000, color);
  }

  onToggle(event) {
    const state = event.target.checked;
    if (state) {
        this.props.toggleWidgetState(true);
    } else {
        this.props.toggleWidgetState(false);
    }
  }

  onSubmit(values) {
    const { isDisabled } = this.props;
    let data = {};
    if (isDisabled) {
      if(!this.file) {
        let color = { background: '#0E1717', text: "#FFFFFF" };
        notify.show('Please select a .csv file and try again', 'error', 1000, color);
        return
      }
      this.parseCSV();
    } else {
      this.processFormData(values);
    }
  }

  render() {
    const { handleSubmit, widgetCount, addWidget , isDisabled} = this.props;
    const uploadBtnClass = isDisabled ? "btn btn-secondary" : "btn btn-secondary disabled";
    return <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {this.renderWidgetList()}
        <div className="row form-group">
          <button className="btn btn-secondary" onClick={() => { addWidget(widgetCount) }}>Add Fields</button>
        </div>
        <div className="row form-check">
          <input className="col-md-2 form-check-input" type='checkbox' onClick={this.onToggle.bind(this)} />
          <label className="col-md-2 form-check-label">Upload from CSV</label>
          <div className=" col-md-2 files">
            <Files
              className='files-dropzone'
              onChange={this.onFilesChange.bind(this)}
              accepts={['.csv']}
              multiple={false}
              clickable
            >
            <a className={uploadBtnClass}>Upload File</a>
            </Files>
          </div>
        </div>
        <div className="row form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <Notifications />
    </div>
      }
}

function mapStateToProps({ widgetCount, isDisabled, formData }) {
  return {
    widgetCount,
    isDisabled,
    formData
  }
}

export default reduxForm({
  form: 'newReduxForm'
})(connect( mapStateToProps, { doRequest, addWidget, toggleWidgetState, updateFormData })(FormComponent));
