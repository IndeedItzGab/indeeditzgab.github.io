export class Generator {
  static container = document.querySelector("#container");
  static configData = JSON.parse(localStorage.getItem("config"))
  static formData;

  static init() {
    this.container.addEventListener("reset", (e) => {
      e.preventDefault();
      this.container.replaceChildren();
      this.container.style.display = "flex"

      const title = document.createElement("span")
      title.textContent = this.configData.name;
      this.container.appendChild(title);
      
      // Generate HTML Body structure for configurations and tweaks
      for(const pixel of this.configData.configurations) {
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
        this.container.appendChild(div);
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
      this.container.appendChild(document.createElement("br"));
      this.container.appendChild(finalDiv);
    })

    this.container.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.formData = new FormData(this.container);

      console.info(this.configData);

      // Format input error checker
      if(!this.isCorrect())
        return alert("The value is wrong!!!!!!!!!!!!!!");

      // Initial JSON formatter
      const data = {
        resolution: {
          x: this.configData.resolution.x,
          y: this.configData.resolution.y
        },
        pixels: []
      }

      // Add information through array structure
      for(const d of this.configData.configurations) {
        data.pixels.push({
          location: d.location,
          channels: d.channels,
          value: this.formData.get(d.id)
        })
      }

      // Request from the image generator to generate the information from inputs
      const response = await fetch("https://config-parser-sepia.vercel.app/api/generate/index.py", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      
      // Display/Downloads the generated image after submitting
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "config.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    })
  }


  // Improvement needed, need to check the actual value inside the parentheses
  static isCorrect() {
    for(const d of this.configData.configurations) {
      const input = this.formData.get(d.id);
      const type = d.type?.split("(")[0]

      if(d.type === "float" && isNaN(parseFloat(input))) {
        return false;
      } else if(type !== "float" && type !== input?.split("(")[0]){
        console.info(d)
        return false; 
      }
    }
    return true;
  }
}