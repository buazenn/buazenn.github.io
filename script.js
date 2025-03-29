// Time and date functionality
function updateDateTime() {
  const now = new Date()

  // Update time
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const timeElement = document.getElementById("current-time")
  if (timeElement) {
    timeElement.textContent = `${hours}:${minutes}`
  }

  // Update date in Polish
  const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ]

  const day = days[now.getDay()]
  const month = months[now.getMonth()]
  const date = now.getDate()
  const year = now.getFullYear()

  const dateElement = document.getElementById("current-date")
  if (dateElement) {
    dateElement.textContent = `${day}, ${month} ${date}, ${year}`
  }
}

// Image preview functionality
function setupImagePreview() {
  const fileInput = document.getElementById("part-image-input")
  const imagePreview = document.getElementById("image-preview")

  if (fileInput && imagePreview) {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = document.createElement("img")
          img.src = e.target.result
          // Clear previous image
          imagePreview.innerHTML = ""
          imagePreview.appendChild(img)
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

// Edit mode functionality
function setupEditMode() {
  // Check if we're in edit mode by looking at URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const editMode = urlParams.get("edit")

  if (editMode === "true") {
    // Change page title to indicate edit mode
    const headerTitle = document.querySelector(".header-title")
    if (headerTitle) {
      headerTitle.textContent = "Edytuj część"
    }

    // Change confirm button text
    const confirmButton = document.querySelector(".btn-confirm")
    if (confirmButton) {
      confirmButton.textContent = "ZAPISZ ZMIANY"
    }

    // Load part data from localStorage (in a real app, this would come from a database)
    const partData = JSON.parse(localStorage.getItem("currentPart") || "{}")

    // Fill form fields with part data
    if (partData.name) {
      document.getElementById("part-name").value = partData.name
    }
    if (partData.quantity) {
      document.getElementById("part-quantity").value = partData.quantity
    }
    if (partData.location) {
      document.getElementById("part-location").value = partData.location
    }
    if (partData.notes) {
      document.getElementById("part-notes").value = partData.notes
    }

    // Set image if available
    if (partData.imageUrl) {
      const imagePreview = document.getElementById("image-preview")
      if (imagePreview) {
        imagePreview.innerHTML = `<img src="${partData.imageUrl}" alt="${partData.name}">`
      }
    }
  }
}

// Handle edit button click on browse_part page
function setupEditButton() {
  const editButton = document.querySelector(".btn-edit")
  if (editButton) {
    editButton.addEventListener("click", () => {
      // In a real app, you would get this data from your database
      const partData = {
        id: "1",
        name: document.querySelector(".name-input").value,
        quantity: document.querySelectorAll(".info-value")[0].textContent,
        location: document.querySelectorAll(".info-value")[1].textContent,
        brands: document.querySelectorAll(".info-value")[2].textContent,
        models: document.querySelectorAll(".info-value")[3].textContent,
        engines: document.querySelectorAll(".info-value")[4].textContent,
        notes: document.querySelectorAll(".info-value")[5].textContent,
        imageUrl: document.querySelector(".part-image img").src,
      }

      // Save part data to localStorage for the edit page to use
      localStorage.setItem("currentPart", JSON.stringify(partData))

      // Navigate to edit page
      window.location.href = "add_part.html?edit=true"
    })
  }
}

// Handle login form submission
function setupLoginForm() {
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Simple validation - in a real app, you would validate against a database
      if (username && password) {
        window.location.href = "dashboard.html"
      } else {
        alert("Proszę wprowadzić nazwę użytkownika i hasło.")
      }
    })
  }
}

// Handle part card clicks on dashboard
function setupPartCards() {
  const partCards = document.querySelectorAll(".part-card")
  if (partCards.length > 0) {
    partCards.forEach((card) => {
      card.addEventListener("click", function () {
        const partId = this.getAttribute("data-id")
        window.location.href = `browse_part.html?id=${partId}`
      })
    })
  }
}

// Handle form submission on add_part page
function setupAddPartForm() {
  const addPartForm = document.getElementById("add-part-form")
  if (addPartForm) {
    addPartForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real app, you would save this data to a database
      alert("Część została zapisana!")
      window.location.href = "dashboard.html"
    })
  }
}

// Handle dropdown item selection
function setupDropdowns() {
  const dropdownItems = document.querySelectorAll(".dropdown-item")
  if (dropdownItems.length > 0) {
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function () {
        const value = this.textContent
        const input = this.closest(".form-group").querySelector("input")
        if (input) {
          input.value = value
        }
      })
    })
  }
}

// Initialize all functionality when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  updateDateTime()
  // Update time every minute
  setInterval(updateDateTime, 60000)

  // Setup image preview functionality
  setupImagePreview()

  // Setup edit mode if applicable
  setupEditMode()

  // Setup edit button on browse_part page
  setupEditButton()

  // Setup login form
  setupLoginForm()

  // Setup part cards on dashboard
  setupPartCards()

  // Setup add part form
  setupAddPartForm()

  // Setup dropdowns
  setupDropdowns()
})

