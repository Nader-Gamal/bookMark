var siteName = document.getElementById("title");
var siteLink = document.getElementById("link");
var allLinks = [];

// Retrieve and display links from local storage
allLinks = JSON.parse(localStorage.getItem('Links')) || [];
displayLinks();

function mainFunction() {
  getLinks();
  displayLinks();
  clearData();
  displayLinks();
}
function emptyFields(){
  
}

function getLinks() {
var siteNameCheck = /^[a-z,A-Z,0-9]{3,40}$/;
var siteLineCheck = /^https:\/\/www.[a-z,A,Z,0-9]{2,100}.com$/


  if ((siteName.value === '') && (siteLink.value === '')) {
    document.getElementById("noLincksModal").style.display="block"
    document.getElementById("siteNameValid").style.display='none';
    document.getElementById("siteLinkValid").style.display='none';
  } 
  else if (siteName.value === '' || !siteNameCheck.test((siteName.value))) {
    document.getElementById("siteNameValid").style.display='block';
    document.getElementById("noLincksModal").style.display="none"
    document.getElementById("siteLinkValid").style.display='none';
  } else if (siteLink.value === '' || !siteLineCheck.test((siteLink.value))) {
    document.getElementById("siteLinkValid").style.display='block';
    document.getElementById("noLincksModal").style.display="none"
    document.getElementById("siteNameValid").style.display='none';
  } else {
    var Links = {
      name: siteName.value,
      link: siteLink.value
    };
    document.getElementById("siteNameValid").style.display='none';
    document.getElementById("siteLinkValid").style.display='none';
    document.getElementById("noLincksModal").style.display="none"
    allLinks.push(Links);

    localStorage.setItem('Links', JSON.stringify(allLinks));
    console.log(Links);
  }
}



function clearData() {
  siteName.value = "";
  siteLink.value = "";
}

function displayLinks() {
  if (allLinks.length != 0) {
    document.getElementById("noLinks").style.display='none';
    document.getElementById("linkList").style.visibility='visible'

  }
  else{
    document.getElementById("noLinks").style.display='block';
    document.getElementById("linkList").style.visibility='hidden';
    function emptyCLick(){
    }
    
  } 
  var displayLinks = "";
  for (var i = 0; i < allLinks.length; i++) {
    displayLinks += `
      <tr>
        <th class="text-center icon">${i + 1}</th>
        <td class="text-center">${allLinks[i].name}</td>
        <td class="text-center"><button class="btn btn-outline-dark vist" onclick="updateProduct(${i})"><a href="${allLinks[i].link}" target="_blank"><i class="fa-solid fa-eye me-3 icon"></i>Visit</a></button></td>
        <td class="text-center"><button class="btn btn-outline-danger" onclick="deleteLinks(${i})"><i class="fa-solid fa-trash me-3 icon"></i>Delete</button></td>
      </tr>`;
  }
  document.getElementById("data").innerHTML = displayLinks;
}

function deleteLinks(index) {
  allLinks.splice(index, 1);
  localStorage.setItem('Links', JSON.stringify(allLinks));
  displayLinks();
}
