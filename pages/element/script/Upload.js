/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of rater originally from: 
 * 
 * https://element.eleme.io/#/en-US/component/upload
 * 
 * Orinal Code written in Vue.js:
 * 
 * https://github.com/ElemeFE/element/blob/dev/packages/upload/src/upload.vue
 * 
 */

/**
 * Cloning contents from a &lt;template&gt; element is more performant
 * than using innerHTML because it avoids addtional HTML parse costs.
 */

import {storageRef} from "./init_firebase.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    .demo-block .upload-demo {
      width: 360px;
    }
    div {
      display: block;
    }
    .el-upload {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      outline: none;
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .el-button--small {
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
    }
    button, input, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    button {
      border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
      border-style: solid;
      border-width: 1px;
      padding: 1px 7px 2px;
    }
    button {
      align-items: flex-start;
      text-align: center;
      cursor: default;
      color: buttontext;
      background-color: buttonface;
      box-sizing: border-box;
      padding: 2px 6px 3px;
      border-width: 2px;
      border-style: outset;
      border-color: buttonface;
      border-image: initial;
    }
    button {
      text-rendering: auto;
      color: initial;
      letter-spacing: normal;
      word-spacing: normal;
      text-transform: none;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      margin: 0em;
      font: 400 11px system-ui;
    }
    .el-button--primary:focus, .el-button--primary:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    .el-button--primary.is-active, .el-button--primary:active {
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
    }
    .el-upload__input {
      display: none;
    }
    input {
      cursor: pointer;
    }
    button, input, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;
    }
    input[type="file" i] {
      align-items: baseline;
      color: inherit;
      text-align: start !important;
    }
    input[type="file" i] {
      -webkit-appearance: initial;
      background-color: initial;
      cursor: default;
      padding: initial;
      border: initial;
    }
    input {
      -webkit-appearance: textfield;
      background-color: white;
      -webkit-rtl-ordering: logical;
      cursor: text;
      padding: 1px;
      border-width: 2px;
      border-style: inset;
      border-color: initial;
      border-image: initial;
    }
    input {
      text-rendering: auto;
      color: initial;
      letter-spacing: normal;
      word-spacing: normal;
      text-transform: none;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      margin: 0em;
      font: 400 11px system-ui;
    }
    .el-upload-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
    .el-upload-list__item.is-success:active, .el-upload-list__item.is-success:not(.focusing):focus {
      outline-width: 0;
    }
    .el-upload-list__item:hover {
      background-color: #f5f7fa;
    }
    .el-upload-list__item:hover .el-icon-close {
      display: block;
    }
    .el-upload-list__item:hover .el-upload-list__item-status-label {
      display: none !important;
    }
    .el-upload-list__item:first-child {
      margin-top: 10px;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
    .el-upload-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .el-upload-list__item-name {
      color: #606266;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      transition: color .3s;
      white-space: nowrap;
    }
    a {
      color: #409eff;
      text-decoration: none;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    .el-upload-list__item-name [class^=el-icon] {
      height: 100%;
      margin-right: 7px;
      color: #909399;
      line-height: inherit;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      webkit-font-smoothing: antialiased;
      moz-osx-font-smoothing: grayscale;
    }
    .el-upload-list__item-name {
      color: #606266;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      transition: color .3s;
      white-space: nowrap;
    }
    i {
      font-style: italic;
    }
    .el-icon-document:before {
      content: "\\e785";
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: block;
    }
    .el-upload-list__item.is-success:active .el-icon-close-tip, .el-upload-list__item.is-success:focus .el-upload-list__item-status-label, .el-upload-list__item.is-success:hover .el-upload-list__item-status-label, .el-upload-list__item.is-success:not(.focusing):focus .el-icon-close-tip {
      display: none;
    }
    .el-upload-list__item-status-label {
      position: absolute;
      right: 5px;
      top: 0;
      line-height: inherit;
      display: none;
    }
    label {
      cursor: default;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    .el-upload-list__item .el-icon-upload-success {
      color: #67c23a;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      webkit-font-smoothing: antialiased;
      moz-osx-font-smoothing: grayscale;
    }
    i {
      font-style: italic;
    }
    .el-upload-list__item .el-icon-close {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: .75;
      color: #606266;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .el-upload-list__item .el-icon-close-tip {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      cursor: pointer;
      opacity: 1;
      color: #409eff;
    }
    .el-upload-list__item.is-success .el-upload-list__item-name:focus, .el-upload-list__item.is-success .el-upload-list__item-name:hover {
      color: #409eff;
      cursor: pointer;
    }
    .el-icon-circle-check:before {
      content: "\\e720";
    }
    .el-icon-close:before {
      content: "\\e6db";
    }
    .el-upload-list__item .el-icon-close:hover {
      opacity: 1;
    }
    .el-upload-list__item:hover .el-icon-close {
      display: inline-block;
    }
  </style>
  
  <div class="demo-block upload-demo">
    <div tabindex="0" class="el-upload el-upload--text">
      <button type="button" class="el-button el-button--primary el-button--small">
        <!---->
        <!---->
        <span>Click to upload</span>
      </button>
      <input type="file" name="file" multiple class="el-upload__input">
    </div>
    <ul class="el-upload-list el-upload-list--text">
      
    </ul>
  </div>
`;

const listTemplate = document.createElement("template");
listTemplate.innerHTML = `
      <li tabindex="0" class="el-upload-list__item is-success">
        <!---->
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i><!-- file name goes here -->
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-circle-check"></i>
        </label>
        <i class="el-icon-close"></i>
        <!--
        <i class="el-icon-close-tip">按 delete 键可删除</i>
        -->
        <!---->
      </li>
`;

let selectedFile;

/**
 * Upload is a custom element that creates a web component.
 * It can be used by the tag <sds-upload>
 */
export class Upload extends HTMLElement {
  /**
     * The element's constructor is run anytime a new instance is created.
     * Instances are created by parsing HTML, or calling
     * document.createElement("7ds-rate")
     * The construtor is a good place to create shadow DOM, though you should
     * avoid touching any attributes or light DOM children as they may not
     * be available yet.
     */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
     * `connectedCallback()` is called when the element is inserted into the DOM.
     * It's a good place to set the initial attribute values and install event listeners.
     */
  connectedCallback() {
    const shadow = this.shadowRoot;
    //TODO4
    var wrapper = shadow.querySelector("div");
    shadow.appendChild(wrapper);
    //var img = shadow.querySelector("label");
    //var imageholder = shadow.querySelector("imageholder");
    //shadow.querySelector(".file-select").addEventListener("change", this.handleFileUploadChange);
    //shadow.querySelector(".file-submit").addEventListener("click", this.handleFileUploadSubmit);


    // add click event listener
    
    var button = this.shadowRoot.querySelector("button.el-button");
    button.addEventListener("click", this.onButtonClick);

    var input = this.shadowRoot.querySelector("input.el-upload__input");

    input.addEventListener("change", this.handleFileUpload);

    const deleteButton = this.shadowRoot.querySelector(".el-icon-close");
    deleteButton.addEventListener("click", this.onDelButClick);

    //input.addEventListener("change", this.handleFileUploadChange2);
  }

  handleFileUpload(event) {
    console.log(event.target.files);
    var upload = event.target.getRootNode().host;
    var selectedFile = event.target.files[0];

    if (!selectedFile)
      return;

    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
      window.alert("Upload failed, please try again");
    }, () => {
      // Do something once upload is complete
      console.log("success");

      upload.addFileListItem(selectedFile.name);
    });
        imageRef.getDownloadURL().then(function(url) {
      // Get the download URL for image
      // This can be inserted into an <img> tag
      //var img = document.createElement("img");
      //img.setAttribute("src", url);
      //document.body.appendChild(img);
      
      //var img = this.shadowRoot.querySelector('imageholder');
      //var img = upload.shadowRoot.querySelector('imageholder');
      imageholder.setAttribute("src", url);
    }).catch(function(error) {
      console.error(error);
    });
  }

  addFileListItem(fileName) {
    var upload = this;
    var list = upload.shadowRoot.querySelector("ul.el-upload-list");
    list.appendChild(listTemplate.content.cloneNode(true));

    // add item to list
    var listItems = upload.shadowRoot.querySelectorAll("ul.el-upload-list li");
    var lastItem = listItems[listItems.length - 1];
    lastItem.querySelector("a.el-upload-list__item-name").innerHTML += fileName;
    
    // add click listener to the cancel icon
    lastItem.querySelector("i.el-icon-close").addEventListener("click", function() {
      // delete from list
      list.removeChild(lastItem);

      // delete from firebase
      var desertRef = storageRef.child(`images/${fileName}`); // create a reference to the file to delete
      desertRef.delete().then(function() {
        // File deleted successfully
        console.log("deleted " + fileName);
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
    });
  }
  
  /**
   * `onBoxClick()` is called when any checkbox is clicked
   * It will correctly toggle the checkbox
   * @param {Event} event - the click event
   */
  onButtonClick(event) {
    // cannot use this as the this in event listener is the target
    var button = event.target.getRootNode().host;
    var input = button.shadowRoot.querySelector("input.el-upload__input");
    input.click();

    /*selectedFile = input.value;//event.target.files[0];
    console.log(selectedFile);
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log("success");
    });*/
    
  }
  
  /**
   * `handleFileUploadChange` deals with file selection. NOTE: still trying to figure out how to include it within the class below
   * @param {*} e 
   */
  handleFileUploadChange(e) {
    selectedFile = e.target.files[0];
  }

  handleFileUploadChange2(event){
    selectedFile = event.target.files[0];
    
  }
  /** 
   * `handleFileUploadSubmit` handles when the user clicks the submit button - it uploads the image to firebase and displays it 
   * @listens {click} listens for the user click on the submit button
   * @throws {error} when upload is unsucessfil
   * @throws {error} when displaying the image is unsucessful
  */
  handleFileUploadSubmit(event) {
    var upload = event.target.getRootNode().host; //this needs to be done since this is an event
    if (upload.disabled)
      return;

    var imageholder = upload.shadowRoot.querySelector("img.imageholder");
    
    let imageRef = storageRef.child(`images/${selectedFile.name}`);
    const uploadTask = imageRef.put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log("successfully loaded image to firebase");
    });
  
    //var upload = e.target.getRootNode().host
    //display image. It gets the uploaded image's url 
    imageRef.getDownloadURL().then(function(url) {
      // Get the download URL for image
      // This can be inserted into an <img> tag
      //var img = document.createElement("img");
      //img.setAttribute("src", url);
      //document.body.appendChild(img);
      
      //var img = this.shadowRoot.querySelector('imageholder');
      //var img = upload.shadowRoot.querySelector('imageholder');
      imageholder.setAttribute("src", url);
    }).catch(function(error) {
      console.error(error);
    });
  }

  onDelButClick(event){
    //TODO
    console.log("hello");
  }

  /**
   * `onBoxClick()` is called when any checkbox is clicked
   * It will correctly toggle the checkbox
   * @param {Event} event - the click event
   */
  onButtonClick(event) {
    // cannot use this as the this in event listener is the target
    var button = event.target.getRootNode().host;
    var input = button.shadowRoot.querySelector("input");
    input.click();

    /*selectedFile = input.value;//event.target.files[0];
    console.log(selectedFile);
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log("success");
    });*/
    
  }


  




  /**
    * `observedAttributes()` returns an array of attributes whose changes will
    * be handled in `attributeChangedCallback()`
    * @return {string[]} array of attributes whose changes will be handled 
    */
  static get observedAttributes() {
    return [ "hide-file-list"
    ]; //TODO1
  }
  

  /**
    * `attributeChangedCallback()` is called when any of the attributes in the
    * returned array of `observedAttributes()` are changed. It's a good place to 
    * handle side effects
    * @param {string} name - the name of the changed attribute
    * @param {string} oldValue - the old value of the attribute
    * @param {string} newValue - the new value of the attribute
    */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
    switch (name) {
    case "hide-file-list":
      this.shadowRoot.querySelector("ul.el-upload-list").style.display
        = this.hideFileList ? "none" : "";
      break;
    }
  }

  /** @type {boolean} */
  set hideFileList(value) {
    const showList = Boolean(value);
    if (showList)
      this.setAttribute("hide-file-list", "");
    else
      this.removeAttribute("hide-file-list");
  }

  /** @type {boolean} */
  get hideFileList() {
    return this.hasAttribute("hide-file-list");
  }

  /** @type {string} */
  set disabledVoidIcon(value) {
    this.setAttribute("disabled-void-icon", value);
  }

  /** @type {string} */
  get disabledVoidIcon() {
    return this.getAttribute("disabled-void-icon") || "\\2605";
  }

  //TODO2
}

customElements.define("sds-upload", Upload);

