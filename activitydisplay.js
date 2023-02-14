const activitiescontainer = document.getElementById("activitiescontainer");
const searchbar = document.getElementById("searchbar");


// lists all activities
addEventListener('load', async() => {
  response = await fetch("./api/version");
  appversion = await response.json();
  appversion = appversion.version;

  response = await fetch(`./data/${appversion}/books.json`);
  data = await response.json();

  count = Object.keys(data);
  count.sort(function(a, b) {
      var nameA = a.toUpperCase(); // ignore upper and lowercase
      var nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  for (let i = 0; i < count.length; i++) {
      obj = count[i];
      //a
      const amain = document.createElement("a");
      amain.href = "./book?page=" + obj;
      amain.target = "_self";
      amain.className = "activity";
      // div
      const diva = document.createElement("div");
      diva.className = "activitycontent";
      // img
      const imgdiv = document.createElement("img");
      imgdiv.loading = "lazy";
      imgdiv.src = data[obj].image;
      imgdiv.alt = data[obj].display_name;
      
      //p
      const pdiv = document.createElement("p");
      pdiv.textContent = data[obj].display_name;


      activitiescontainer.appendChild(amain);
      amain.appendChild(diva);
      diva.appendChild(imgdiv);
      diva.appendChild(pdiv);
      activitiescontainer.appendChild(amain);
  }
})



function activityFilter() {
  var filter = searchbar.value.toUpperCase();
  for(i = 0; i < activitiescontainer.children.length; i++) {
    var a = activitiescontainer.children[i].getElementsByTagName("p")[0];
    if(a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      activitiescontainer.children[i].style.display = "";
    } else {
      activitiescontainer.children[i].style.display = "none";
    }
  }
    
}
searchbar.addEventListener("keyup", activityFilter);