import { storageRef } from "../../element/script/init_firebase.js";

// eslint-disable-next-line no-undef
var db = firebase.firestore();
var wrapper = document.getElementById("wrapper");
var title = document.getElementById("title");
var thing = document.getElementById("thing");
var des = document.getElementById("des");

var comment = document.querySelector("sds-comment");
var overalltags = document.getElementById("overall-tags");
var overallrate = document.getElementById("overall-rate");
/*var username = document.getElementById("username");
var evals = document.getElementById("eval");
var tags = document.getElementById("tags");
var rate = document.getElementById("rate");
var submitcomment = document.getElementById("submitcomment");
var msgbox = document.getElementById("comment");

var rater;
*/

// parse url funct
function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      //console.log(sParameterName[1].replace("\\_", " "));
      return sParameterName[1];
    }
  }
  return "Parameter Not Found";
}

// check if get from url
var lookup_value = getURLParameter("lookup");
if (lookup_value != "Parameter Not Found") {
  var params = lookup_value.split("%");
  // check if the url param is a topic/id tuple
  if (params.length >= 2) {
    var topic = params[0].replace("\\_", " ")
    var id = params[1];

    // check if the id is correct
    db.collection(`${topic}`).doc("config").get().then(function (doc) {
      if (doc.exists && id === `${doc.data().id}`)
        displayComment(topic);
      else
        window.alert("No search hit!");
    });
  }
}
//else{console.log("not found")}

// onclick for submit button
document.getElementById("submit").addEventListener("click", function () {
  //display the comment
  displayComment(title.value, true);

});

//  --------------------- display function --------------------- //
function displayComment(value, throughSubmit = false) {
  //display the comment
  db.collection(`${value}`).doc("config").get().then(function (doc) {
    if (doc.exists) { // TODO why the if statement doesn't apply to the bellow
      if (throughSubmit && doc.data().isPrivate === "1") {
        window.alert("This post is not accessible through lookup");
        return;
      }

      // populate title and description
      thing.innerHTML = value;
      des.innerHTML = doc.data().des;
      // populate image
      let imageRef = storageRef.child(`images/${doc.data().image}`);
      imageRef.getDownloadURL().then(function(url) {
        var img = document.getElementById('image');
        img.setAttribute("src", url);
      }).catch(function(error) {
        console.error(error);
      });
      // set the overall rating and tags score
      calcOverallScore(value);

      var tagarray = `${doc.data().tags}`.split(",");
      if (!tagarray || (tagarray.length <= 1 && tagarray[0].length) == 0 )
        tagarray = [];
      //comment.setAttribute("max-of-rate", rater.max);
      //comment.setAttribute("topic-name", thing.textContent);
      comment.allDisabled = false; // this will initialize the comment
      if (doc.data().disableRateTag === "0") {
        comment.showRating = true;
        comment.showTags = true;
      }
      comment.updateComment(thing.textContent, `${doc.data().stars}`, tagarray);

      wrapper.style = "display: block";
      window.location.href = "#wrapper";
    }
    else {
      window.alert("No search hit!");
      //wrapper.style = "display: none";
      //window.location.href = "#title";
    }
  });
}


//  ------------------- function that get avg rating ----------------------- //
function calcOverallScore(value) {

  var ref = db.collection(`${value}`);
  let stars = [];
  let tags = {};

  // get all comment doc from the collection
  ref.get().then(snapshot => {

    // go over each doc
    snapshot.forEach(doc => {
      if (doc.id != "config") {
        // stars
        //console.log(doc.id, '=>', doc.data().checked[0]);
        stars.push(Number(doc.data().star));
        // tags
        let tgs = doc.data().checked;
        for (let i = 0; i < tgs.length; i++) {
          if (tgs[i] in tags) {
            tags[tgs[i]] += 1;
          }
          else {
            tags[tgs[i]] = 1;
          }
        }
      }
    });

    // after gor from each doc, process
    console.log(stars);
    let sum = stars.reduce((previous, current) => current += previous);
    console.log();
    // set up overall rating score
    overallrate.max = 10;
    overallrate.valueModel = Math.round(sum / stars.length).toString(); //DONE oscar   
    // the overall checked tags
    for (let tagName in tags) {
      var tag = document.createElement("button");
      tag.type = "button";
      tag.className = "btn btn-primary";
      tag.innerHTML = tagName + " ";
      var tagScore = document.createElement("span");
      tagScore.className = "badge badge-light";
      tagScore.innerHTML = tags[tagName].toString();
      tag.appendChild(tagScore);
      overalltags.appendChild(tag);
    }

  }).catch(err => {
    console.log("Error getting documents", err);
  });
}
