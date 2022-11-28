 
// Import our custom CSS
//import '../scss/styles.scss'
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
 
// Import all of Bootstrap's JS


const searchBtn=document.getElementById("search-btn");
const searchInput=document.getElementById("search-input");
const loadMore=document.getElementById("load-more");
const spinner=document.getElementById("spinner");
const toggleLinks=document.getElementById("navbarNav");
const toggleBtn=document.getElementById("toggle-btn");
const profileLinks=document.getElementById("profile-links");
const profileLinks2=document.getElementById("profile-links2");
const profileLinksBtn=document.getElementById("profile-links-btn");
const profileLinksBtn2=document.getElementById("profile-links-btn2");

/* const toggleLinks=document.getElementById("toggle-links");

const userButton=document.getElementById("user-button");
const userMenu=document.getElementById("user-menu");




userButton.addEventListener('click',()=>{
  if(userMenu.classList.contains("d-none"))
{
  userMenu.classList.remove("d-none");

}    else 
userMenu.classList.add("d-none");
})

*/
 searchBtn.addEventListener('click',()=>{
    if(searchInput.classList.contains("d-none"))
{
  searchInput.classList.remove("d-none");
  searchInput.focus();

}    else 
    searchInput.classList.add("d-none");
}) 

/* loadMore.addEventListener('click',()=>{
  if(spinner.classList.contains("d-none"))
{
  spinner.classList.remove("d-none");
  loadMore.classList.add("d-none");
  setTimeout(
    ()=>{
      spinner.classList.add("d-none");
  loadMore.classList.remove("d-none");
    }, 2000)

  

}    else 
spinner.classList.add("d-none");
}) */


/* toggleBtn.addEventListener('click',()=>{
  if(toggleLinks.classList.contains("show"))
{
  toggleLinks.classList.remove("show");

}    else 
toggleLinks.classList.add("show");
})  */

profileLinksBtn.addEventListener('click',()=>{
  if(profileLinks.classList.contains("show"))
{
  profileLinks.classList.remove("show");

}    else 
profileLinks.classList.add("show");
})
profileLinksBtn2.addEventListener('click',()=>{
  if(profileLinks2.classList.contains("show"))
{
  profileLinks2.classList.remove("show");

}    else 
profileLinks2.classList.add("show");
}) 