var apod = document.getElementById("apod-image");
var title = document.getElementById("apod-title");
var explaanistion = document.getElementById("apod-explanation");
var data = document.getElementById("apod-date");
var copy = document.getElementById("apod-copyright");
var imgData=document.getElementById("apod-date-info")

async function getApod() {
    try {
        var response = await fetch(
"https://api.nasa.gov/planetary/apod?api_key=f35lSZ76ksW46gWc4gdhDHJinzAFIpt2TveJmEd3");

        var responseData = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch APOD");
        }

        console.log(responseData);

        apod.src = responseData.hdurl;
        title.innerHTML = responseData.title;
        explaanistion.innerHTML = responseData.explanation;
        data.innerHTML = responseData.date.split("-").reverse().join("/");
         imgData.innerHTML=responseData.date.split("-").reverse().join("/");
        

    } catch (error) {
        console.log(error);
    }
}

getApod();


var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");

for (var i = 0; i < navLinks.length; i++) {

    navLinks[i].addEventListener("click", function() {

        var sectionId = this.getAttribute("data-section");

        for (var j = 0; j < sections.length; j++) {
            sections[j].classList.add("hidden");
        }

        var selectedSection = document.getElementById(sectionId);

        if (selectedSection) {
            selectedSection.classList.remove("hidden");
        }

    });

}



var launchesGrid = document.getElementById("launches-grid");

async function getLaunches() {

    try {

        var response = await fetch(
            "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=9"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch launches");
        }

        var responseData = await response.json();
                console.log(responseData);


        var launches = responseData.results;


        for (var i = 0; i < launches.length; i++) {

            var launch = launches[i];

            var image = "";

            if (launch.image) {
                image = launch.image.image_url;
            }

            var name = launch.name;

            var company = "";

            if (launch.launch_service_provider) {
                company = launch.launch_service_provider.name;
            }

            var date = launch.net;

            var time = launch.net;

            var location = "";

            if (launch.pad && launch.pad.location) {
                location = launch.pad.location.name;
            }

            
                launchesGrid.innerHTML += `
    <div
        class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
    >
        <div
            class="relative h-48 bg-slate-900/50 flex items-center justify-center"
        >
            <img
                src="${image}"
                alt="${name}"
                class="w-full h-full object-cover"
            >

            <div class="absolute top-3 right-3">
                <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                >
                    Upcoming
                </span>
            </div>
        </div>

        <div class="p-5">
            <div class="mb-3">
                <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                >
                    ${name}
                </h4>

                <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${company}
                </p>
            </div>

            <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${date}</span>
                </div>

                <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${time} UTC</span>
                </div>

                <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${name}</span>
                </div>

                <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${location}</span>
                </div>
            </div>

            <div
                class="flex items-center gap-2 pt-4 border-t border-slate-700"
            >
                <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                >
                    Details
                </button>

                <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    </div>
`;

            
        }

    } catch (error) {

        console.log(error);

    }
}

getLaunches();


//////////////////////////////////////////////
var planetData;

async function getPlanet() {
    try {
        var response = await fetch(
            "https://solar-system-opendata-proxy.vercel.app/api/planets"
        );

         planetData = await response.json();
        console.log(planetData.bodies);

    } catch (error) {
        console.log(error);
    }
}

getPlanet();

var planetCard=document.querySelectorAll(".planet-card");
for (var i=0;i<planetCard.length;i++){
    planetCard[i].addEventListener("click",function(){
        var planetId=this.getAttribute("data-planet-id");
        for(var j=0;j<planetData.bodies.length;j++){
            if(planetData.bodies[j].englishName.toLowerCase()===planetId){
                var selectedplanet=planetData.bodies[j];
                document.getElementById("planet-detail-name").textContent=selectedplanet.englishName;
                document.getElementById("planet-detail-description").textContent=selectedplanet.description;
                document.getElementById("planet-detail-image").src=this.querySelector("img").src;
                document.getElementById("planet-distance").textContent=selectedplanet.semimajorAxis;
                document.getElementById("planet-radius").textContent=selectedplanet.equaRadius;
                document.getElementById("planet-mass").textContent=selectedplanet.mass.massValue;
                document.getElementById("planet-density").textContent=selectedplanet.density;
                  document.getElementById("planet-orbital-period").textContent=selectedplanet.sideralOrbit;
                   document.getElementById("planet-rotation").textContent=selectedplanet.sideralRotation;
                   document.getElementById("planet-moons").textContent=selectedplanet.moons?selectedplanet.moons.length:0;
                   document.getElementById("planet-gravity").textContent=selectedplanet.gravity;
                   document.getElementById("planet-volume").textContent=selectedplanet.vol.volValue;
                  document.getElementById("planet-discoverer").textContent =
    selectedplanet.discoveredBy ? selectedplanet.discoveredBy : "Known since antiquity";
document.getElementById("planet-discovery-date").textContent =selectedplanet.discoveryDate ? selectedplanet.discoveryDate : "Ancient times";
                   document.getElementById("planet-body-type").textContent=selectedplanet.bodyType;

                   



            }
        }
    })
}