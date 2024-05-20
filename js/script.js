var siteName = document.getElementById("userSite");
var siteLink = document.getElementById("userLink");
var sites = [];

// Chaek If There Is Data To Display
if (localStorage.getItem("sitesContainer")) {
  sites = JSON.parse(localStorage.getItem("sitesContainer"));
  displaySite();
}

// Error Message
var errorBox = `
<div class="box-info h-100 w-100 position-absolute top-50 translate-middle-y d-flex justify-content-center align-items-center">
  <div class="error-box bg-white p-4 rounded-2 shadow-lg">
    <header class="error-header w-100 d-flex justify-content-between align-items-center mb-4">
      <div class="error-circles d-flex">
        <span class="rounded-circle me-2" style="background-color: #f15f5d;"></span>
        <span class="rounded-circle me-2" style="background-color: #febe2e;"></span>
        <span class="rounded-circle me-2" style="background-color: #4db748;"></span>
      </div>
      <div>
        <i onclick="closeError()" class="fa-solid fa-xmark close"></i>
      </div>
    </header>
    <p class="m-0 pb-2">Site Name or Url is not valid, Please follow the rules below :</p>
    <ul class="alerts list-unstyled m-0">
      <li>
        <i class="fa-solid fa-circle-right p-2"></i>
        Site name must contain at least 3 characters
      </li>
      <li>
        <i class="fa-solid fa-circle-right p-2"></i>
        Site URL must be a valid one
      </li>
    </ul>
  </div>
</div>
`;
function closeError() {
  var errorContainer = document.getElementById("errorContainer");
  errorContainer.innerHTML = null;
}

// Validate URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Add Site
function addSite() {
  var site = {
    name: siteName.value,
    link: siteLink.value,
  };

  if (site.name.length > 3 && isValidURL(site.link)) {
    // If Site Is Valid Then Push Site in Array And Local Storage
    sites.push(site);
    localStorage.setItem("sitesContainer", JSON.stringify(sites));
    // Display After Pushing Site
    displaySite();
    // Clear Input Fields
    siteName.value = null;
    siteLink.value = null;
    // Every Thing Is Okay So There Is No Need To Error Message
    closeError();
  } else {
    // If Site Is Invalid Then Pop Up Error Message
    document.getElementById("errorContainer").innerHTML = errorBox;
  }
}

// Display Sites
function displaySite() {
  var siteBox = "";

  // Preparing Rows Containing Items
  for (var i = 0; i < sites.length; i++) {
    siteBox += `
      <tr>
        <td>${i + 1}</td>
        <td>${sites[i].name}</td>
        <td>
          <a href="${sites[i].link}" target="_blank">
            <button class="btn btn-visit">
              <i class="fa-solid fa-eye pe-2"></i>
              Visit
            </button>
          </a>
        </td>
        <td>
          <button onclick="deleteSite(${i})" class="btn btn-delete">
            <i class="fa-solid fa-trash-can pe-2"></i>
            Delete
          </button>
        </td>
      </tr>
      `;
  }
  document.getElementById("tableContent").innerHTML = siteBox;
}

// Delete Site
function deleteSite(deletedIndex) {
  // Deleting Site From Array And Local Storage
  sites.splice(deletedIndex, 1);
  localStorage.setItem("sitesContainer", JSON.stringify(sites));
  // Display Sites After Deleting
  displaySite();
}

// For Live Checks
function nameSiteCheck() {
  var siteName = document.getElementById("userSite").value;
  var inputElement = document.getElementById("userSite");

  if (siteName.length < 3 && siteName.length !== 0) {
    inputElement.classList.add("form-control-invalid");
  } else if (siteName.length >= 3) {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.add("form-control-valid");
  } else {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  }
}
function linkSiteCheck() {
  var siteLink = document.getElementById("userLink").value;
  var inputElement = document.getElementById("userLink");

  if (siteLink === "") {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  } else if (isValidURL(siteLink)) {
    inputElement.classList.add("form-control-valid");
    inputElement.classList.remove("form-control-invalid");
  } else {
    inputElement.classList.add("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  }
}
