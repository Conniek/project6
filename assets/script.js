const api_works = "http://localhost:5678/api/works";
const token = localStorage.getItem("jwt");


// =======================================================
// Étape 1.1 : Récupération des travaux depuis le back-end
// =======================================================
async function getWorksfromAPI() {
    // On utilise l'API Fetch pour récupérer les travaux (GET). 
    // On stocke la réponse de la requête dan une variable URLAPIwork
    const URLAPIwork = await fetch(api_works);

    // On extrait les données JSON de la réponse de la requête et les stocke dans la variable AllWorks.
    const AllWorks   = await URLAPIwork.json();

    // On commence une boucle qui parcourt chaque élément (work) dans le tableau AllWorks.
    AllWorks.forEach(work => { // work est le paramètre de la boucle 
        const image = work.imageUrl;
        const title = work.title;
        const category = work.category.name;

        //On crée le bloc figure HTML correspondant à chaque catégorie, puis on les ajoute à un élément HTML ayant l'ID "gallery". 
        document.getElementById("gallery").innerHTML += `
        <figure name="${category}">
				<img src="${image}" alt="${title}" >
				<figcaption>${title}</figcaption>
		</figure>
        `;
    });

    // On initialise un ensemble (Set) pour stocker les catégories uniques.
    const uniqueCategories = new Set();

    // On parcoure tous les travaux et ajoute chaque catégorie à l'ensemble uniqueCategories.
      AllWorks.forEach(work => {
        uniqueCategories.add(work.category.name);
    });
    // Appel de la fonction pour l'affichage des catégories.
    getCategoriesfromAPI(uniqueCategories);
}

getWorksfromAPI() // Appel de la fonction , sans ça la fonction écrite plus haut ne sera pas executé.

// ===============================================
// Étape 1.2 : Réalisation du filtre des travaux
// ==================================================


// Étape 1.2 Fonction pour Afficher les catégories
// ==================================================
async function getCategoriesfromAPI(array) {
    // Créez un bouton "Tous" par défaut.
    let allButton = document.createElement("input");
    allButton.type = "submit";
    allButton.value = "Tous";
    allButton.classList.add("bodyButton");

    // Ajoutez le bouton "Tous" à l'élément avec l'ID "filters".
    document.getElementById("filters").appendChild(allButton);

    // On commence une boucle qui parcourt chaque élément (category) dans le tableau AllCategories.
    array.forEach(category => {
        //On crée des boutons HTML correspondant à chaque catégorie, puis les ajoute à un élément HTML ayant l'ID "filters". 
       let bodyButton = `<input type="submit" value="${category}" class="bodyButton">`;
       let filterButton = document.getElementById("filters");
       filterButton.innerHTML += bodyButton; // le += est important pour ajouter toutes les catégories. 
    })

    // Appel de la fonction pour activer le filtrage par catégorie.
    filterByCategory();
}


// Étape 1.2 Fonction pour trier les travaux par catégories 
// =======================================================
async function filterByCategory() {
    // On selectionne tous les boutons de catégorie avec la classe "bodyButton".
    let CategoryButtons = document.querySelectorAll(".bodyButton"); 

    // Pour chaque bouton de catégorie, on ajoute un écouteur d'événements au clic.
    CategoryButtons.forEach(buttonCategory =>  {
        buttonCategory.addEventListener("click", function () {
            // On obtient la valeur du bouton de catégorie ("objet, appartement ou restaurant")
            const buttonCategoryValue = buttonCategory.getAttribute("value");

            // Sélectionnez tous les éléments de la galerie (figures).
            const galleryItems = document.querySelectorAll(".gallery figure"); 
            
            // Utilisez la méthode filter pour obtenir les éléments de la galerie correspondant à la catégorie sélectionnée.
            const filteredGalleryItems = Array.from(galleryItems).filter(item => {
                // Assurez-vous de comparer la catégorie de l'élément avec la catégorie sélectionnée.
                return item.getAttribute("name") === buttonCategoryValue;
            });

            // Pour chaque élément de la galerie, Afficher ou non en fonction de s'il correspond à la catégorie sélectionnée.
            galleryItems.forEach(item => {
                if (filteredGalleryItems.includes(item) || buttonCategoryValue === "Tous") {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

// ===============================================
// Étape 2.2 : Authentification de l’utilisateur => login.js
// ===============================================

// ===============================================
// Étape 2.2 : Gérer la connexion/déconnexion et l'édition avec le token JWT
// ===============================================

const login_menu = `<a href="login.html">login</a>`;
const logout_menu = `<a href="index.html?log=logout">log out</a>`;
const title_projet = document.getElementById("edit");
const edit_img = `<a href="#" id="edit_project"><img src="./assets/icons/edit.png" alt="edit" /></a>`;
const login = document.getElementById("login");

console.log(title_projet);

if (token) {
  const connected = localStorage.getItem("connected");
  if (connected) {
    login.innerHTML += logout_menu;
    login.addEventListener("click", () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("connected");
    });
    title_projet.innerHTML += edit_img;
  } else {
    login.innerHTML += login_menu;
  }
} else {
    login.innerHTML += login_menu;
}

// ======================================
// Étape 3.1 : Ajout de la fenêtre modale
// ======================================

// Récupération des éléments du DOM
const editLink = document.getElementById('edit_project');
const modal = document.getElementById('modal');
const addPhotoButton = document.getElementById('add_photo');
const mediaForm = document.getElementById('media_form');
const validateButton = document.getElementById('validate_button');
const workList = document.getElementById('work_list');

// Fonction pour afficher la fenêtre modale
function showModal() {
    modal.style.display = 'block';
    // Ici, tu peux ajouter la logique pour charger les travaux et les afficher dans la liste
    // ...

    // Écouteur d'événement pour le bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', showMediaForm);
}

// Fonction pour afficher le formulaire d'ajout de média
function showMediaForm() {
    mediaForm.classList.remove('hidden');
    validateButton.addEventListener('click', validateMediaForm);
}

// Fonction pour supprimer une photo
function deletePhoto(e) {
    if (e.target.classList.contains('delete_button')) {
        // Obtenez le parent (li) de bouton delete pour identifier la photo
        const photoItem = e.target.closest('li');
        
        // supprimer dans le back via l'api DELETE
        // ... 
        
        // Supprimez la photo du DOM
        photoItem.remove();
    }
}

// Fonction pour valider le formulaire d'ajout de média
function validateMediaForm() {
    // Logique de validation ici
    // ...

    // Si la validation réussit, tu peux  ajouter le média à la liste des travaux
    // ...

    // Pour cet exemple, masquons le formulaire après validation
    mediaForm.classList.add('hidden');
}

// Ajout d'un écouteur d'événement pour le lien "Edit"
editLink.addEventListener('click', showModal);
