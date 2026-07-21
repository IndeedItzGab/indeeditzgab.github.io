import projects from "./projects.js"

document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.querySelector("#work-frame");
  const contributionContainer = document.querySelector("#contribution-frame");

  // For self-made products
  for(const project of projects.projects) {
    loadProject(project, projectContainer);
  }

  // Projects that I have contributions with
  for(const contribution of projects.contributions) {
    loadProject(contribution, contributionContainer);
  }
})

function loadProject(project, projectContainer) {
  const container = document.createElement("button");
  container.onclick = () => {
    window.location.href=project.link;
  }

  const title = document.createElement("p");
  title.className = "title";
  title.textContent =  project.title;

  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";
  const thumbnailImage = document.createElement("img");
  thumbnailImage.src = project.images.thumbnail;

  const icon = document.createElement("img");
  icon.className = "icon";
  icon.src = project.images.icon;

  const languagesContainer = document.createElement("div");
  languagesContainer.className = "languages";

  for(const language of project.languages) {
    const l = document.createElement("p");
    l.textContent = language;
    languagesContainer.appendChild(l);
  }

  thumbnail.appendChild(thumbnailImage)
  container.appendChild(thumbnail);
  container.appendChild(icon);
  container.appendChild(title);
  container.appendChild(languagesContainer);
  projectContainer.appendChild(container);
}