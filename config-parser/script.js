import { Generator } from "./modules/utils.mjs"

window.onload = async () => {
  const fileInput = document.querySelector("#template");
  fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if(!file)
        return console.warn("No file detected");

      const reader = new FileReader();
      reader.onload = (event) => {
          try {
            const configJson = JSON.parse(event.target.result);
            localStorage.setItem("config", JSON.stringify(configJson))

            const container = document.querySelector("#container");
            container.replaceChildren();
            container.style.display = "flex"

            const title = document.createElement("span")
            title.textContent = configJson.name;
            container.appendChild(title);
            
            // Generate HTML Body structure for configurations and tweaks
            for(const pixel of configJson.configurations) {
              const div = document.createElement("div");
              const description = document.createElement("span")
              const label = document.createElement("label");

              label.textContent = pixel.name;
              description.textContent = pixel.description;
    
              const input = document.createElement('input');
              input.type = "text";
              input.id = pixel.id;
              input.name= pixel.id;
              input.value = pixel.default;
              input.required = true;
              input.className = "input"

              div.appendChild(label);
              div.appendChild(document.createElement("br"));
              div.appendChild(description);
              div.appendChild(document.createElement("br"));
              div.appendChild(input);
              container.appendChild(div);
            }

            // Reset/Submit button at the end of the form
            const finalDiv = document.createElement("div")
            finalDiv.id = "finalDiv";
            const resetButton = document.createElement("input");
            resetButton.type = "reset";
            resetButton.id = "resetButton";
            const submitButton = document.createElement("input");
            submitButton.type = "submit";
            submitButton.value = "Download";
            submitButton.id = "submitButton";

            finalDiv.appendChild(resetButton);
            finalDiv.appendChild(submitButton);
            container.appendChild(document.createElement("br"));
            container.appendChild(finalDiv);
            
            Generator.init()
          } catch (error) {
              console.error("Invalid JSON:", error);
          }
      };
      reader.readAsText(file);
  });
}
