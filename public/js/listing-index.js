// ===== Submit Filter (Desktop) =====
function submitFilter(category) {
  document.getElementById("categoryInput").value = category;
  document.getElementById("filterForm").submit();
}

// ===== Submit Filter (Mobile Drawer) =====
function submitFilterFromDrawer(category) {
  document.getElementById("categoryInput").value = category;
  closeDrawer();
  document.getElementById("filterForm").submit();
}

// ===== Scroll Filters =====
function scrollFilters(direction) {
  const wrapper = document.getElementById("filtersWrapper");
  const scrollAmount = 200;
  if (direction === "left") {
    wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

// ===== Drawer Open/Close =====
const mobileFilterBtn = document.getElementById("mobileFilterBtn");
const filterDrawer = document.getElementById("filterDrawer");
const filterDrawerOverlay = document.getElementById("filterDrawerOverlay");
const filterDrawerClose = document.getElementById("filterDrawerClose");

function openDrawer() {
  filterDrawer.style.display = "block";
  filterDrawerOverlay.style.display = "block";
  setTimeout(() => {
    filterDrawer.classList.add("open");
    filterDrawerOverlay.classList.add("show");
  }, 10);
}

function closeDrawer() {
  filterDrawer.classList.remove("open");
  filterDrawerOverlay.classList.remove("show");
  setTimeout(() => {
    filterDrawer.style.display = "none";
    filterDrawerOverlay.style.display = "none";
  }, 300);
}

mobileFilterBtn.addEventListener("click", openDrawer);
filterDrawerClose.addEventListener("click", closeDrawer);
filterDrawerOverlay.addEventListener("click", closeDrawer);

// ===== Tax Toggle Switch =====
function toggleTaxInfo() {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (let tax of taxInfo) {
    if (tax.style.display !== "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
}

let taxSwitch = document.getElementById("switchCheckDefault");
let taxSwitchDrawer = document.getElementById("switchCheckDefaultDrawer");

taxSwitch.addEventListener("click", toggleTaxInfo);
taxSwitchDrawer.addEventListener("click", toggleTaxInfo);

// ===== Highlight Active Filter =====
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get("category") || "";

  document.querySelectorAll("#filtersWrapper .filter").forEach((filter) => {
    filter.classList.remove("active");
    const filterValue = filter.getAttribute("onclick").match(/'([^']*)'/)[1];
    if (filterValue === currentCategory) {
      filter.classList.add("active");
    }
  });
});
