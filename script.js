"use strict";

let wrapper = document.getElementById("api");
let closeBtn = document.querySelector(".close");
let popup = document.querySelector(".popup");
let postContent = document.querySelector(".post-content");
let postsUrl = "https://jsonplaceholder.typicode.com/posts";
let addPost = document.querySelector(".add");
let overlay = document.querySelector(".for-overlay");

fetch(postsUrl, {
  method: "GET",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (received) {
    received.forEach((element) => {
      createPosts(element);
    });
  })
  .catch(function (error) {
    console.error("Error", error);
  });

function createPosts(object) {
  let makeDivs = document.createElement("div");
  makeDivs.classList.add("posts");

  let h2Post = document.createElement("h2");
  h2Post.innerText = object.id;
  let h3Post = document.createElement("h3");
  h3Post.textContent = object.title;
  makeDivs.appendChild(h2Post);
  makeDivs.appendChild(h3Post);
  wrapper.appendChild(makeDivs);
  makeDivs.setAttribute("data-id", object.id);
  let deleteButton = document.createElement("button");
  makeDivs.appendChild(deleteButton);
  deleteButton.innerText = "Delete post";
  deleteButton.setAttribute("data-id", object.id);
  deleteButton.addEventListener("click", function (x) {
    x.stopPropagation();
    let deleteButtonId = x.target.getAttribute("data-id");
    console.log("წაშლის ღილაკის ნომერია:", deleteButtonId);
    let deleteUrl =
      "https://jsonplaceholder.typicode.com/posts/${deleteButtonId}";
    fetch("delteUrl", {
      method: "DELETE",
    }).then(() => makeDivs.remove());
  });

  makeDivs.addEventListener("click", function () {
    let divId = this.getAttribute("data-id");
    console.log(divId);
    let divIdUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;
    fetch(divIdUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postDetails) => {
        let details = document.createElement("h3");
        details.classList.add("active");
        details.innerText = postDetails.body;
        postContent.appendChild(details);
        popup.classList.add("active");
      })
      .catch((error) => console.error("Error", error));
  });
}

closeBtn.addEventListener("click", function () {
  popup.classList.remove("active");
  postContent.innerText = "";
});
addPost.addEventListener("click", function () {
  overlay.classList.toggle("active");
});
