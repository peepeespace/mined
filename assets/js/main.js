import "../css/main.css";
import Axios from "axios";
import qs from "qs";

const blogApiURL = "http://localhost:8888/api/blog";
const logo = document.getElementsByClassName("navlogo")[0];

logo.addEventListener("click", (e) => {
  window.location = "/";
});

const blogForm = document.getElementById("blog-form");
const titleInput = document.getElementById("title-input");
const subtitleInput = document.getElementById("subtitle-input");
const contentInput = document.getElementById("content-input");
const blogContentSectionn = document.getElementsByClassName("blog-content")[0];

blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let title = titleInput.value;
  let subtitle = subtitleInput.value;
  let content = contentInput.value;
  let blogEntryHTML = `
 <div class="blog-entry">
   <div class="title">${title}</div>
   <div class="subtitle">${subtitle}</div>
   <div class="content">${content}</div>
 </div>
 `;
  blogContentSectionn.insertAdjacentHTML("beforeend", blogEntryHTML);

  let sendData = qs.stringify({ title, subtitle, content });
  Axios.post(blogApiURL, sendData);
});

window.addEventListener("load", async (e) => {
  let blogData = await Axios.get(blogApiURL);
  blogData = blogData.data;
  for (let data in blogData) {
    let blog = blogData[data];
    let blogEntryHTML = `
    <div class="blog-entry">
      <div class="title">${blog.title}</div>
      <div class="subtitle">${blog.subtitle}</div>
      <div class="content">${blog.content}</div>
    </div>
    `;
    console.log(blogEntryHTML);
    blogContentSectionn.insertAdjacentHTML("beforeend", blogEntryHTML);
  }
});
