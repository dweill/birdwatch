import React, { Component } from 'react';
// import ImageDrop from './ImageDrop.jsx';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';
import { Dialog, FlatButton, TextField, RaisedButton } from 'material-ui/';
import Message from 'material-ui/svg-icons/maps/add-location';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { yellow500, indigo1A237E } from 'material-ui/styles/colors';
import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'birdwatch';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/copypasta/upload';


const messageIcon = <Message color={indigo1A237E} />;

const style = {
  display: 'block',
  position: 'relative',
  height: 'absolute',
  padding: '32px',
};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, birdType: '', location: '', uploadedFile: null, uploadedFileCloudinaryUrl: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.submitText = this.submitText.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }


  handleImageUpload(file) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
      }
    });
  }

  submitText() {
    const message = { birdType: this.state.birdType, location: this.state.location, image: this.state.uploadedFileCloudinaryUrl };
    axios.post('/birds', message)
    .then((response) => {
      console.log(response, 'success');
      this.props.loadFeed();
    })
    .catch(err => console.log(err));
  }


  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    const actions = [
      <FlatButton
        key={1}
        type="reset"
        label="Reset"
        style={{ float: 'left' }}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        onClick={this.handleClose}
      />,
      <FlatButton
        key={3}
        type="submit"
        label="Submit"
        onClick={this.submitText}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={{ height: '100px', width: 'absolute', display: 'block' }} zDepth={1}>
              <div>
                <RaisedButton label="Log bird Sighting" onTouchTap={this.handleOpen} icon={messageIcon} style={style} />
                <Dialog
                  title="Log Bird Sightings"
                  modal
                  open={this.state.open}
                >
                  <form
                    action="/bird"
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.handleClose();
                    }}
                  >
                  Log the location and type of bird you have spotted.
                  <br />
                    <TextField style={{ width: '240px' }}name="text" hintText="bird type" onChange={(e, newVal) => this.setState({ birdType: newVal })} />
                    <Geosuggest
                      ref={el => this._geoSuggest = el}
                      placeholder="location"
                      initalValue="New Orleans"
                      onSuggestSelect={val => this.setState({ location: val.description })}
                      onChange={this.onChange}
                      location={new google.maps.LatLng(29.95106579999999, -90.0715323)}
                      radius="20"
                      style={{ width: '220px' }}
                    />
                    <div>
                      <form>
                        <div className="FileUpload">
                          <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*"
                            style={{ height: '40px', width: '220px', border: '2px dotted maroon', padding: '5px' }}
                          >
                            <div
                              style={{ padding: '3px', color: 'maroon', fontWeight: 'bold', fontSize: '14' }}
                            >
                          Drop an image or click to select a file to upload.</div>
                          </Dropzone>
                        </div>

                        <div className="parentBounding">
                          {this.state.uploadedFileCloudinaryUrl === '' ? null :
                          <div className="bounding">
                            <p className="imageText">{this.state.uploadedFile.name}</p>
                            <img className="birdLogImage" alt="" src={this.state.uploadedFileCloudinaryUrl} />
                          </div>}
                        </div>
                      </form>

                    </div>
                    <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                      {actions}
                    </div>
                  </form>
                </Dialog>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Comment;
