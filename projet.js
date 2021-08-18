// Récupérer une référence sur le template
const elTemplateItem = document.querySelector('#template-item');
const elNouvelItem = document.querySelector('#nouvel-item');
const elListe = document.querySelector('#liste');


// Détecter la soumission du formulaire
const elForm = document.querySelector('form');

//Recuperer les valeurs par defaut de quantite et unite
const q = elTemplateItem.content.querySelector('.quantite'); 
const DEFAUT_QUANTITE = Number(q.textContent);  
const u = elTemplateItem.content.querySelector('.unite'); 
const DEFAUT_UNITE = u.selectedOptions[0].value;  //pour capturer l'attribut 'selected' de la liste

elForm.addEventListener('submit', function(e) {
  // On empêche le rechargement de la page
  e.preventDefault();
  
  // Créer un élément <li> à partir du template (cloner l'element avec cloneNode)
  const elLi = elTemplateItem.content.cloneNode(true);

  // Récupérer la valeur de l'input nouvel item
  let nomItem = elNouvelItem.value; //j'utilise let pour pouvoir reasigner une valeur à la variable

  // Supprimer les espaces en trop avant et après
  nomItem = nomItem.trim(); //on utilise la methode trim sur la chaine de caractères que nous interesse 

  //Supprimer les espaces en trop au milieu (trim supprime les espaces qu'au debut et à la fin)
   while (nomItem.indexOf("  ") !== -1) { //tant qu'il y a 2 espaces d'affilés
    //while (nomItem.includes("  ")) une autre methode; tant qu'include renvoit "true" {...
    nomItem = nomItem.replace("  ", " "); //on reemplace 
   }

   let mots = nomItem.split(' '); 
   let premierMot = mots[0]; 
   let deuxiemeMot = mots[1];
   let quantite = DEFAUT_QUANTITE; 
   let unite = DEFAUT_UNITE; 

   if(Number.isInteger(Number(premierMot))){
     quantite = Number(premierMot); 

     const UNITES = ['u.', 'kg', 'g', 'L'];
     if(UNITES.includes(deuxiemeMot) ){
       unite = deuxiemeMot; 
       nomItem = mots.slice(2).join(' '); 
     } else {
       nomItem = mots.slice(1).join(' '); 
     }
   }

   //Mettre la 1ère lettre en mayuscule
   nomItem = nomItem[0].toUpperCase() + nomItem.slice(1); 

  // Injecter cette valeur dans l'élément <li>, Sélectionner l'élément nom <p>
  const elNom = elLi.querySelector('.nom'); //on part de elLI qui est un clone du template
  const elQuantite = elLi.querySelector('.quantite'); //on part de elLI qui est un clone du template
  const elUnite = elLi.querySelector('.unite'); //on part de elLI qui est un clone du template

  elNom.textContent = nomItem;
  elQuantite.textContent = quantite; 
  elUnite.value = unite; 

  // Ajouter l'élément <li> dans la liste <ul>
  liste.append(elLi);

  // Vider le champ nouvel item
  elNouvelItem.value = "";

  // Mettre le focus immédiatement sur le champ nouvel item
  elNouvelItem.focus();
  
});

//on ajoute un gestionnaire d'evenement pour l'input pour que les validations fonctionnent (invalides)
elNouvelItem.addEventListener('input', function (e) { 
  elNouvelItem.setCustomValidity(''); 
  elNouvelItem.checkValidity(); 
 });


//on ajoute un gestionnaire d'evenements pour les elements invalides de nouvelItem
elNouvelItem.addEventListener('invalid', function (e) {  
  const nom = elNouvelItem.value; 
  if (nom.length === 0) {
    elNouvelItem.setCustomValidity("Vous devez indiquer les informations de l'item, exemple: 250g chocolat"); 
  } else if (!/[A-Za-z]{2}/.test(nom)){
    elNouvelItem.setCustomValidity("Le nom de l'item doit faire 2 lettres minimum"); 
  } else {
    elNouvelItem.setCustomValidity("Les caractères spéciaux, les accents et autres lettres spécifiques ne sont pas autorisés"); 
  }
 })

