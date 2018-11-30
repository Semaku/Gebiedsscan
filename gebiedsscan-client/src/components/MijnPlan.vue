<template>
  <div class="uk-offcanvas-content">
    <div id="offcanvas-flip" uk-offcanvas="mode: push; flip:true; overlay: false;bg-close:false" class="sk-offcanvas-mijnplan" >
      <div class="uk-offcanvas-bar uk-box-shadow-large">
        <div v-if="currentStep === 0">
          <h3>Mijn plan</h3>
          <p>Start je eigen plan en vraag de hulp van andere intiatiefnemers, bewoners en de gemeente om jouw initatief werkelijkheid te laten worden.</p>
          <ul class="uk-list">
            <li>1: Selecteer een gebied of locatie waar je jouw plan wil realiseren.</li>
            <li>2: Maak een project aan.</li>
            <li>3: Geef informatie over jouw initiatief.</li>
            <li>4: Koppel data elementen en maak notities.</li>
            <li>5: Deel je initiatief met anderen.</li>
            <li>6: Dien je initiatief in bij de gemeente ter goedkeuring.</li>
          </ul>
          <button @click="next()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Starten</button>
          <h5 class="uk-heading-line uk-text-center"><span> Of </span></h5>
           <div class="uk-margin">
             <p>Voer gebruikercode in om verder te gaan</p>
            <input class="uk-input" type="text" v-model="user.uuid" placeholder="Ksnww3anauDESuK5BzBsGP">
          </div>
          <p v-if="notProjectsFound" class="uk-text-danger">Geen projecten gevonden voor deze gebruikercode</p>
          <button @click="getProjectsByUser(user.uuid)" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Laad projecten</button>
        </div>

        <div v-if="currentStep === 1">
          <h3 class="uk-margin-remove-bottom">Start mijn plan</h3>
          <!-- <h5 class="uk-heading-line"><span>Stap 1: Locatie kiezen</span></h5> -->

          <h5 class="uk-heading-divider uk-padding-remove-top">Stap 1: Locatie kiezen</h5>

          <p>Kies de locatie waar je jouw initatief wil starten. Je kan ook meerdere locaties toevoegen als je wil.</p>
          <p v-if="!geometryCreated" class="uk-text-danger">Selecteer gebied op de kaart voor uw project om verder te gaan...</p>
          <h5 class="uk-heading-line uk-text-center"><span>Or use snap function</span></h5>
          <ul v-if="snapData && snapData.length" class="uk-flex uk-flex-wrap sk-preview-list">
            <li class="uk-flex-auto sk-preview-item" v-for="item in snapData" :key="item.id" @click="selectSnapObject(item)">{{item.label}}</li>
          </ul>
          <hr>
          <button @click="previous()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Vorige</button>
          <button @click="next()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button uk-float-right" :disabled="!geometryCreated">Volgende</button>
        </div>

        <div v-if="currentStep === 2 || currentStep === 5">
          <div v-if="currentStep === 2">
            <h3 class="uk-padding-remove-bottom">Start mijn plan</h3>
            <h5 class="uk-heading-divider">Stap 2: Project aanmaken</h5>
          </div>
           <div v-if="currentStep === 5">
            <h3 class="uk-padding-remove-bottom">Edit mijn plan</h3>
          </div>

          <ul uk-tab >
            <li class="uk-active"><a href="#" @click="editProjectClickedTab = 'algemeen'">Algemeen</a></li>
            <li><a href="#" @click="editProjectClickedTab = 'bron'">Nieuws</a></li>
            <li><a href="#" @click="editProjectClickedTab = 'contact'">Contact</a></li>
          </ul>

          <form v-show="editProjectClickedTab === 'algemeen'" class="uk-form-horizontal">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-text">Projectnaam:</label>
              <div class="uk-form-controls">
                <input v-model="newProject.name" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Naam">
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-text">Foto Url:</label>
              <div class="uk-form-controls">
                <input v-model="newProject.hero_image" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="url">
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-textarea">Omschrijving:</label>
              <div class="uk-form-controls">
                <textarea v-model="newProject.description" class="uk-textarea uk-form-width-large" id="form-h-textarea" rows="5" placeholder="Omschrijving"></textarea>
              </div>
            </div>

             <div class="uk-margin">
              <label class="uk-form-label" for="form-h-textarea">Korte omschrijving:</label>
              <div class="uk-form-controls">
                <textarea v-model="newProject.short_description" class="uk-textarea uk-form-width-large" id="form-h-textarea" rows="3" placeholder="Korte omschrijving"></textarea>
              </div>
            </div>                        

             <div class="uk-margin">
              <label class="uk-form-label" for="form-h-textarea">Visie:</label>
              <div class="uk-form-controls">
                <textarea v-model="newProject.extra_vision" class="uk-textarea uk-form-width-large" id="form-h-textarea" rows="3" placeholder="Visie"></textarea>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-select">
                Status:
              </label>
              <div class="uk-form-controls">
                <select v-model="newProject.status" class="uk-select uk-form-width-large" id="form-h-select">
                  <option>In ontwikkeling</option>
                  <option>Wijk in ontwikkeling</option>
                  <option>Positief beoordeeld</option>
                </select>
              </div>
            </div>
            
            <div class="uk-margin">
              <span class="uk-form-label">
                Soort initiatief: <i uk-icon="icon: info; ratio: 0.7" uk-tooltip="Geef aan in welke categorie jouw plan hoort. In deze folder vind je lezen meer uitleg over de inhoud en toetsingsregels van de catergorieen."></i>
              </span>
              <div class="uk-form-controls uk-form-controls-text">
                <label><input class="uk-checkbox" type="checkbox" id="Duurzaamheid" value="Duurzaamheid" v-model="newProject.development_theme"> Duurzaamheid</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Innovatie" value="Innovatie" v-model="newProject.development_theme"> Innovatie</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Inclusiviteit" value="Inclusiviteit" v-model="newProject.development_theme"> Inclusiviteit</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Economie en werkgelegenheid" value="Economie en werkgelegenheid" v-model="newProject.development_theme"> Economie en werkgelegenheid</label><br>
              </div>
            </div>

             <div class="uk-margin">
              <span class="uk-form-label">
                Interessante gebieden: <i uk-icon="icon: info; ratio: 0.7" uk-tooltip="Wat voor soort gebieden zijn interessant voor jouw plan?"></i>
              </span>
              <div class="uk-form-controls uk-form-controls-text">
                <label><input class="uk-checkbox" type="checkbox" id="Bedrijven" value="Bedrijven" v-model="newProject.interesting_areas"> Bedrijven</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Woningen" value="Woningen" v-model="newProject.interesting_areas"> Woningen</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Recreatie" value="Recreatie" v-model="newProject.interesting_areas"> Recreatie</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Overige" value="Overige" v-model="newProject.interesting_areas"> Overige</label><br>
              </div>
            </div>

             <div class="uk-margin">
              <span class="uk-form-label">
                Wat voor soort initiatiefnemers zoek je? 
              </span>
              <div class="uk-form-controls uk-form-controls-text">
                <label><input class="uk-checkbox" type="checkbox" id="Investeerders" value="Investeerders" v-model="newProject.types_of_participants"> Investeerders</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Kopers" value="Kopers" v-model="newProject.types_of_participants"> Kopers</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Huurders" value="Huurders" v-model="newProject.types_of_participants"> Huurders</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Ondernemers" value="Ondernemers" v-model="newProject.types_of_participants"> Ondernemers</label><br>
                <label><input class="uk-checkbox" type="checkbox" id="Overige" value="Overige" v-model="newProject.types_of_participants"> Overige</label><br>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-text">Straatnaam en huisnummer</label>
              <div class="uk-form-controls">
                <input v-model="newProject.address.street_name" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="straatnaam + huisnummer">
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-text">Postcode:</label>
              <div class="uk-form-controls">
                <input v-model="newProject.address.post_code" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="postcode">
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-text">Stad:</label>
              <div class="uk-form-controls">
                <input v-model="newProject.address.city" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="plaats">
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-h-select">
                Maak dit initiatief openbaar: <i uk-icon="icon: info; ratio: 0.7" uk-tooltip="Iedereen kan jouw initiatief / plan inzien en hieraan meewerken. Geef bijvoorbeeld aan waar je naar op zoek bent qua samenwerking zodat iemand zijn of haar interesse hierin kan aangeven."></i>
              </label>
              <div class="uk-form-controls">
                <select v-model="newProject.public_initiatieve" class="uk-select uk-form-width-large" id="form-h-select">
                  <option>Ja</option>
                  <option>Nee</option>
                </select>
              </div>
            </div>
          </form>

          <div v-show="editProjectClickedTab === 'bron'" class="uk-form-horizontal">

            <div style="padding:20px;" v-for="resource in newProject.external" :key="resource.id">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-h-text">Image url</label>
                <div class="uk-form-controls">
                  <input v-model="resource.resource_img_url" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Image url">
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label" for="form-h-text">Title:</label>
                <div class="uk-form-controls">
                  <input v-model="resource.resource_title" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Title">
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label" for="form-h-text">Resource url:</label>
                <div class="uk-form-controls">
                  <input v-model="resource.resource_url" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Resource url">
                </div>
              </div>
            </div>
            <div class="uk-text-center">
              <button @click="addResource()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Bronvermeldingen toevoegen</button>
            </div>
          </div>

          <div v-show="editProjectClickedTab === 'contact'" class="uk-form-horizontal">
            <div style="padding:20px;" v-for="contact in newProject.contact" :key="contact.id">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-h-text">Email</label>
                <div class="uk-form-controls">
                  <input v-model="contact.e_mail" class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="uk-text-center">
              <button @click="addContact()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Contact toevoegen</button>
            </div>

          </div>


          <div class="uk-margin-top">
            <hr>
          </div>

          <div v-if="currentStep === 2">
            <button @click="previous()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Vorige</button>
            <button @click="next()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button uk-float-right">Volgende</button>
          </div>
          <div v-if="currentStep === 5">
            <button @click="goToOverview()" class="uk-button uk-button-secondary uk-button-small sk-fill-blue-button">Annuleren</button>
            <button @click="updateInitiative(newProject)" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Project bijwerken</button>
          </div>
        </div>

        <div v-if="currentStep === 3">
          
          <h3 class="uk-padding-remove-bottom">Project omschrijving</h3>

          <!-- <p>Voeg informatie en data toe aan jouw plan door objecten op de kaart aan te klikken en toe te voegen. Je kan ook data toevoegen vanuit het linker informatie paneel, zoals CBS data. Als je data toevoegt, zal alleen de data worden toegevoegd voor de locatie die zijn gekoppeld aan jouw plan.</p> -->
          <ul class="uk-list">
            <li>
              <p>{{newProject.description}}</p>
            </li>
            
            <li>
              <b>Soort initiatief:</b> {{newProject.development_theme.join(', ')}}
            </li>
            <li>
              <b>Publiek initiatief:</b> {{newProject.public_initiatieve}}
            </li>
            <li>
              <b>Type initiatiefnemers:</b> {{newProject.types_of_participants.join(', ')}}
            </li>
          </ul>
          
           <div class="uk-margin-top">
            <hr>
          </div>

          <button @click="previous()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Vorige</button>
          <button @click="submitInitiative()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button uk-float-right">Voeg project toe</button>
        </div>

        <div v-if="currentStep === 4">
          
          <h3 class="uk-padding-remove-bottom">Jouw projecten <button @click="goToCreateProject()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button uk-float-right">Maak project aan</button></h3>
          <h5 class="uk-heading-divider">Gebruikerscode <small>bewaar deze gebruikerscode voor toegang en bewerken</small></h5>
           <div class="uk-margin">
            <input class="uk-input uk-disabled" type="text" placeholder="Input" v-model="user.uuid">
            <a style="font-size:11px;margin-top:5px;" class="uk-float-right" href="#" @click="currentStep = 0">Andere gebruikerscode?</a>
          </div>
          
          <h5 class="uk-heading-divider">Projecten </h5>
          <p v-if="updatedProject" class="uk-text-warning">Vernieuw om wijzigingen te zien</p>
          <p v-if="notProjectsFound" class="uk-text-center">Geen projecten gevonden</p>
          <div v-for="project in user.projects" :key="project.id">
            <div class="uk-grid-small uk-grid" uk-grid="" >

              <div class="uk-width-1-4@m">
                <img v-if="project.feature.properties.hero_image && project.feature.properties.hero_image !== ''" style="height:75px;" id="image" :src="project.feature.properties.hero_image" alt="">
                <img v-else style="height:75px;" id="image" src="https://dummyimage.com/600x400/cccccc/ffffff.png&text=No+Image+Found" alt="">
              </div>
              <div class="uk-width-3-4@m">
              <div v-if="project.feature.properties.start || project.feature.properties.status || project.feature.properties.development_theme || project.feature.properties.short_description || project.feature.properties.name">
                  <ul class="sk-preview-card-description-list">
                    <li v-if="project.feature.properties.name"><span class="uk-text-bold">Naam: </span> {{project.feature.properties.name}}</li>
                    <li v-if="project.feature.properties.start"><span class="uk-text-bold">Initiatief gestart op: </span> {{project.feature.properties.start}}</li>
                    <li v-if="project.feature.properties.status"><span class="uk-text-bold">Status: </span> {{project.feature.properties.status}}</li>
                    <li v-if="project.feature.properties.development_theme && project.feature.properties.development_theme[0]"><span class="uk-text-bold">Ontwikkelingsthema's: </span> {{project.feature.properties.development_theme.join(', ')}}</li>
                    <li v-if="project.feature.properties.short_description">{{project.feature.properties.short_description}}</li>
                  </ul>
                </div>
                <div v-else class="uk-text-center">
                  <h5 style="padding-top:20px;" class="uk-text-muted uk-text-center"> Geen projectdetails beschikbaar</h5>
                </div>
                <div class="uk-margin-top uk-text-center" v-if="!wantToDeleteProject">
                  <button @click="wantToDeleteProject = project.feature.properties.id" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Verwijder</button>
                  <button @click="goToEditProject(project.feature.properties)" class="uk-button uk-button-secondary uk-button-small sk-fill-blue-button">Wijzig</button>
                  <button @click="launchProject(project.feature.properties.name)" class="uk-button uk-button-secondary uk-button-small sk-fill-blue-button ">Open</button>
                </div>
                <div class="uk-section uk-section-xsmall uk-text-center" v-if="wantToDeleteProject === project.feature.properties.id">
                  <p class="uk-text-danger">Weet je zeker dat je wilt verwijderen?</p>
                  <button @click="wantToDeleteProject = null" class="uk-button uk-button-secondary uk-button-small sk-fill-blue-button">Annuleer</button>
                  <button @click="deleteProject(project.feature.properties.id)" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Verwijder</button>
                </div>
              </div>
            </div>
            <div class="uk-margin-top">
              <hr>
            </div>
          </div>
          <!-- <button @click="previous()" class="uk-button uk-button-secondary uk-button-small sk-fill-red-button">Vorige</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" >
  $inverse-global-color-mode: false;
  .sk-offcanvas-mijnplan {
     z-index: 1003;
  }

  .uk-open > .uk-offcanvas-reveal {
    width: 600px !important;
  }

  .uk-offcanvas-bar {
    width: 600px;
    padding: 40px 40px;
    top: 55px;
  }
</style>

<script>
  import UIkit from 'uikit';
  import axios from 'axios';
  import Vue from 'vue';
  import _ from 'lodash';
  import config from '../../config'
  
  export default{
    data() {
      return {
        updatedProject: false,
        wantToDeleteProject: null,
        notProjectsFound: false,
        user: {
          uuid: null, 
          projects: []
        },
        steps: ['intro', 'selectlocation', 'createproject', 'overview', 'launch'],
        currentStep: 0,
        drawingControlsAdded: false,
        drawnLayers: null,
        geoJsonLayer: null, //new polygon (project)
        newProject: {
          name: '',
          description: '',
          short_description: '',
          category: 'private_initiatief',
          contact: [{e_mail: ''}],
          uuid: null,
          address: {
            city: '',
            post_code: '',
            street_name: ''
          },
          extra_vision: '',
          start: null,
          status: null,
          oplevering: null,
          author: null,
          hero_image: '',
          likes_shares: 0,
          architecten: '',
          nr_participans_wanted: 0,
          interesting_areas: [],
          hero_image: '',
          pano_id: '',
          development_theme: [],
          woningtypen: [],
          external: [{
            resource_img_url: '',
            resource_title: '',
            resource_url: ''
          }],
          types_of_participants: [],
          wkb_geometry: {}
        },
        newProjectSchema: {},
        editingProject: null,
        snapData: null,
        selectedSnapObject: null,
        editProjectClickedTab: 'algemeen'
      }
    },
    props: {
      manager: Object,
      bus: {
        type: Object
      }
    },
    methods: {
      addResource() {
        this.newProject.external.push({
            resource_img_url: '',
            resource_title: '',
            resource_url: ''
          })
      },
      addContact() {
        this.newProject.contact.push({
            e_mail: ''
          })
      },
      addDrawingComponents() {
        this.manager.add([
          "BRK", "Bag"
        ]);
        this.geoJsonLayer = this.manager.addDrawingComponents();
        this.drawingControlsAdded = true;
        
        this.geoJsonLayer.addEventListener('click', (e) => {
          this.geoJsonLayer.pm.toggleEdit();
        });

        this.manager.map.on('pm:cut', (e) => {
          this.newProject.wkb_geometry = e.resultingLayers[0].toGeoJSON().features[0].geometry
        });
              
        this.manager.map.on('pm:create', (e) => {
          this.manager.map.removeLayer(e.layer);
          this.geoJsonLayer.clearLayers();
          this.geoJsonLayer.addData(e.layer.toGeoJSON());
          this.newProject.wkb_geometry = e.layer.toGeoJSON().geometry;
        });

        this.manager.map.on('pm:remove', (e) => {
          this.newProject.wkb_geometry = {};
        });
      },
      removeDrawingComponents() {
        this.manager.removeDrawingComponents();
        // this.manager._hideLayer("Bag");
        // this.manager._hideLayer("BRK");
        this.drawingControlsAdded = false;
      },
      removeDrawnLayer() {
        if (this.geoJsonLayer) {
          this.geoJsonLayer.remove();   
        }
      },
      next() {
        if (this.currentStep < this.steps.length-1)
          this.currentStep++;
        this.loadStep();
      },
      previous() {
        if (this.currentStep > 0)
          this.currentStep--;
        this.loadStep();
      },
      loadStep() {
        if (this.currentStep > 0 && !this.drawingControlsAdded) {
          this.addDrawingComponents();
        } 
        if (this.currentStep === 1 && !this.newProject.wkb_geometry) {
          this.newProject = _.cloneDeep(this.newProjectSchema);
        }
        if (this.currentStep !== 1) {
          this.removeDrawingComponents()
        }
        
      },
      submitInitiative() {
        this.newProject.uuid = this.user.uuid;
        axios.post(config.baseUrl + '/gebiedscan/project', this.newProject).then(({data}) => {
          if (data.result.user_uuid) {
            this.user.uuid = data.result.user_uuid;
          }
          this.geoJsonLayer.clearLayers();
          this.newProject = _.cloneDeep(this.newProjectSchema);
          Vue.localStorage.set('user_uuid', this.user.uuid)
          this.getProjectsByUser(data.result.user_uuid);
          UIkit.notification("project toegevoegd", {status: 'success', pos: 'top-right'});
          this.next();
        })
      },
      updateInitiative() {
        axios.put(config.baseUrl + '/gebiedscan/project', this.newProject).then(({data}) => {
          this.getProjectsByUser(this.user.uuid);
          UIkit.notification("Update succesvol", {status: 'success', pos: 'top-right'});
          this.currentStep = 4;
          this.updatedProject = true;
        })
      },
      getProjectsByUser(uuid) {
        if (!uuid) {return;}
        axios.get(config.baseUrl + '/gebiedscan/projects_by_user/'+ uuid).then(({data}) => {
          if (data.results.length) {
            this.user.projects = data.results;
            this.currentStep = 4;
            this.notProjectsFound = false;
          } else {
            this.user.projects = [];
            this.notProjectsFound = true;
          }
        })
      },
      goToCreateProject() {
        this.currentStep = 1;
        this.addDrawingComponents();
      },
      goToEditProject(project) {
        this.currentStep = 5;

        Object.keys(project).forEach((key)=> {
          
          if (project[key]) {
            try {
              this.newProject[key] = JSON.parse(project[key]);
            } catch (error) {
              this.newProject[key] = project[key];
            }
          }
        })
      },
      goToOverview() {
        this.currentStep = 4;
      },
      launchProject(name) {
        UIkit.offcanvas('#offcanvas-flip').hide();
         this.$router.push({
          name: 'explore',
          params: {
            subroute: 'bekijken', searchtype: 'element', query: name
          }
        });
      },
      deleteProject(id) {
         axios.delete('https://kadaster-api.test.semaku.com/gebiedscan/project/'+id).then(({data}) => {
          UIkit.notification("Succesvol verwijderd", {status: 'success', pos: 'top-right'});
          this.getProjectsByUser(this.user.uuid);
          this.wantToDeleteProject = false;
        })
      },
      selectSnapObject(item) {
        this.geoJsonLayer.clearLayers();
        this.geoJsonLayer.addData(item.layer.toGeoJSON());
        this.newProject.wkb_geometry = item.layer.toGeoJSON().features[0].geometry;
      }
    },
    computed: {
      geometryCreated() {
        return this.newProject.wkb_geometry.coordinates ? true : false;
      }
    },
    mounted() {
      this.user.uuid = Vue.localStorage.get('user_uuid');
      this.newProjectSchema = _.cloneDeep(this.newProject);
      if (this.user.uuid) this.currentStep = 4; this.getProjectsByUser(this.user.uuid); 

      this.bus.$on('infoUnderPoint', (results) => {
        this.snapData = results;
      })

      if (this.$route.params.subroute === 'mijnplan') {
        // this.manager._hideLayer("ElementsLayer");
        UIkit.offcanvas('#offcanvas-flip').show();
      } else {
        UIkit.offcanvas('#offcanvas-flip').hide();
      }

      UIkit.util.on('#offcanvas-flip', 'hide', () => {
        this.$router.push({
          name: 'explore',
          params: {
            subroute: 'bekijken'
          }
        });

      });
    },
    watch: {
      $route()
      {
        if (this.$route.params.subroute !== 'mijnplan') {
          UIkit.offcanvas('#offcanvas-flip').hide();
          this.removeDrawingComponents();
          this.removeDrawnLayer();
          this.drawingControlsAdded = false;

        } else {
          this.loadStep();
          // this.manager._hideLayer("ElementsLayer");
        }

      },
      manager(manager) {
        this.manager = manager;
      }
    }
  }
</script>