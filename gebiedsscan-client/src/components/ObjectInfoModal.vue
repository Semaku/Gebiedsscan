<template>
  <div v-if="item && item.data && item.data.length" class="uk-modal-dialog uk-modal-body sk-modal-body">
    <button class="uk-modal-close-default uk-close uk-icon" type="button" uk-close=""></button>
      <nav  class="sk-info-modal-header">
        <div class="uk-container uk-container-expand">
          <div class="uk-navbar">
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav sk-info-modal-header-items" >
                <li class="uk-active"><a href="#">{{item.label}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
       <div class="sk-modal-content">
        <div v-if="item && item.data && item.data.length">
          <div v-if="item.label === 'Marienhage'">
             <div class="uk-container uk-margin-top">
              <h5 class="sk-color-red uk-text-bold uk-margin-top sk-preview-card-title">{{item.data[0].name}}</h5>
              <p>{{item.data[0].description}}</p>
              <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Historie</h5>
              <p>{{item.data[0].historie}}</p>
             </div>
             <div class="uk-section uk-section-xsmall">
            <div class="uk-container">
              <div v-if="item.data[0].external && item.data[0].external.length" class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-margin-top" uk-grid>
                <div v-for="article in item.data[0].external" :key="article.id">

                  <div v-if="article.resource_title" class="uk-card uk-card-default uk-box-shadow-hover-large">
                    <div v-if="article.resource_img_url" class="uk-card-media-top uk-cover-container">
                      <img :src="article.resource_img_url" alt="" uk-cover>
                      <canvas height="200"></canvas>
                    </div>
                    <div class="uk-card-body">
                      <h3 class="uk-card-title uk-margin-remove-bottom">{{article.resource_title}} <a target="_blank" :href="article.resource_img_url"><span class="sk-color-red" uk-icon="icon: link;"></span></a></h3>
                      <p v-if="article.resource_description">{{article.resource_description || 'No description'}}</p>
                      <p v-else class="uk-card-body-nieuws">Geen nieuwsberichten</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="uk-container">
                <p>Geen artikelen gevonden</p>
              </div>
            </div>
          </div>
          </div>
           <ul v-else-if="item.label === 'Bestemmingsplangebied'" class="uk-margin-top">
            <li style="font-size:13px;line-height: 1.8em;" class="uk-list" v-if="bpg.title === 'verwijzingnaarteksturl' || 
              bpg.title === 'naam' || 
              bpg.title === 'plangebied' || 
              bpg.title === 'planstatus' || 
              bpg.title === 'dossierstatus' || 
              bpg.title === 'typeplan' || 
              bpg.title === 'naamoverheid'" 
              v-for="bpg in formattedItem" :key="bpg.id">
              <strong class="uk-text-capitalize">{{bpg.title}}: </strong>
              <span v-if="bpg.type === 'text'" >{{bpg.value}}</span>
              <span v-if="bpg.type === 'link'" v-for="value in bpg.value" :key="value.id"> <br /><a :href="value"  target="_blank" > {{value}} </a> </span>
            </li>
          </ul>
          <ul v-else class="uk-margin-top">
            <li class="uk-list" style="font-size:13px;line-height: 1.8em;" v-for="item in formattedItem" :key="item.id"><b>{{item.label}}:</b> {{item.value}}</li>
          </ul>
         </div> 
       </div>
    </div>
</template>

<style>
  /* @import "../../node_modules/leaflet/dist/leaflet.css"; */
</style>

<script>
  import UIkit from 'uikit';
  import Manager from '../GeoDataManager/Manager';
  import _ from 'lodash';

  export default{
    props: {
      item: {
        required: true
      }
      
    },
    methods: {
    },
    data(){
      return {
        accordion: {
          Bag: {
            identificatiecode: 'Identificatie Code',
            oorspronkelijkBouwjaar: 'Oorspronkelijk Bouwjaar',
            status: 'Status',
            inOnderzoek: 'In Onderzoek',
            geconstateerd: 'Geconstateerd',
            aanduidingInactief: 'Aanduiding Inactief',
            fulladdress: 'fulladdress'
          },
          BRK: {
            kadastralegemeentenaam: 'Kadastrale Gemeentenaam',
            perceelnummer_rotatie: 'Perceelnummer Rotatie',
            sectie: 'Sectie',
            kadastraleGemeenteCode: 'Kadastrale Gemeentecode',
            kadastralegrootte: 'Kadastrale Grootte',
            perceelnummer: 'Perceel Nummer',
          },
          Fotos: {
              OMSCHRIJVING: 'Omschrijving',
              RICHTING: 'Richting',
              JAAR: 'Jaar'
          },
          CBS: {
              "buurtNaam ": "Buurt naam",
              "AANT_INW ": "Aantal inwoners",
              "AANT_MAN ": "Mannen (aantal)",
              "AANT_VROUW ": "Vrouwen (aantal)",
              "BEV_DICHTH ": "Bevolkingsdichtheid: aantal inwoner (per km2)",
              "P_00_14_JR ": "Personen 0 tot 15 jaar (%)",
              "P_15_24_JR ": "Personen 15 tot 24 jaar (%)",
              "P_25_44_JR ": "Personen 25 tot 45 jaar (%)",
              "P_45_64_JR ": "Personen 45 tot 65 jaar (%)",
              "P_65_EO_JR ": "Personen 65 jaar en ouder",
              "P_ONGEHUWD ": "Ongehuwd (%)",
              "P_GEHUWD ": "Gehuwd (%)",
              "P_GESCHEID ": "Gescheiden (%)",
              "P_VERWEDUW ": "Verweduwd (%)",
              "GEBOO_TOT ": "Geboorte totaal",
              "P_GEBOO ": "Geboorte relatief (per 1000 inw.)",
              "STERFT_TOT ": "Sterfte totaal",
              "P_STERFT ": "Sterfte relatief (per 1000 inw.)",
              "AANTAL_HH ": "Huishoudens totaal",
              "P_EENP_HH ": "Eenpersoonshuishoudens (%)",
              "P_HH_Z_K ": "Huishoudens zonder kinderen (%)",
              "P_HH_M_K ": "Huishoudens met kinderen (%)",
              "GEM_HH_GR ": "Gemiddelde huishoudensgrootte",
              "WONINGEN ": "Woningvoorraad",
              "WOZ ": "Gemiddelde woningwaarde (x1000 EUR)",
              "P_BEWNDW ": "Bewoonde woningen (%)",
              "P_LEEGSW ": "Leegstand woningen (%)",
              "G_GAS_TOT ": "Gemiddeld aardgasverbruik tot. (m3)",
              "G_ELEK_TOT ": "Gemiddeld elektriciteitsverbruik tot. (kWh)",
              "AV1_SUPERM ": "Grote supermarkten binnen 1 km",
              "AV3_SUPERM ": "Grote supermarkten binnen 3 km",
              "AV5_SUPERM ": "Grote supermarkten binnen 5 km",
              "AV1_CAFE ": "Aantal cafés binnen 1 km",
              "AV3_CAFE ": "Aantal cafés binnen 3 km",
              "AV5_CAFE ": "Aantal cafés binnen 5 km",
              "AV1_CAFTAR ": "Aantal cafetaria’s binnen 1 km",
              "AV3_CAFTAR ": "Aantal cafetaria’s binnen 3 km",
              "AV5_CAFTAR ": "Aantal cafetaria’s binnen 5 km",
              "AV1_RESTAU ": "Aantal restaurants binnen 1 km",
              "AV3_RESTAU ": "Aantal restaurants binnen 3 km",
              "AV5_RESTAU ": "Aantal restaurants binnen 5 km",
              "AV5_HOTEL ": "Aantal hotels binnen 5 km",
              "AV10_HOTEL ": "Aantal hotels binnen 10 km",
              "AV20_HOTEL ": "Aantal hotels binnen 20 km",
              "AV1_KDV ": "Aantal kinderdagverbijven binnen 1 km",
              "AV3_KDV ": "Aantal kinderdagverbijven binnen 3 km",
              "AV5_KDV ": "Aantal kinderdagverbijven binnen 5 km"

          },
          Bomen: {
            "OBJECTID": "Bommen ID" ,
            "Level": "Niveau" ,
            "Layer": "Laag" ,
            "Color": "Kleur" ,
            "Elevation": "Verhoging" ,
            "Angle": "Hoek"
          },
          Archeologie: {
            "NR_ARCH_GEBIED": "Nummer Archeologisch gebied" ,
            "NAAM_ARCH_GEBIED": "Naam Archeologisch gebied" ,
            "JAAR_OPGRAVING" : "Jaar Opgraving" ,
            "STATUS": "Status" ,
            "VERWACHTING": "Verwachting" ,
            "RESULTAAT": "Resultaat" ,
          },
          Sonderingen: {
            "BROID": "",
            "addinv_conditions": "Addinv conditions",
            "addinv_groundwaterlevel": "Addinv groundwaterlevel",
            "addinv_investigationdate": "Addinv investigationdate",
            "cpsurv_conepen_description": "Conepen description",
            "cpsurv_cptmethod": "Cpsurv cptmethod",
            "cpsurv_trajectory_finaldepth": "Cpsurv trajectory finaldepth"  
          },
          GrondwaterPeilbuizen: {
            "ID": "ID", 
            "NAAM": "NAAM",
            "STOFFEN": "STOFFEN",
            "OPPERVLAKT": "OPPERVLAKT",
            "VOLUME": "VOLUME",
            "BOVENKANT": "BOVENKANT",
            "ONDERKANT": "ONDERKANT"
          },
          WarmteKoudeopslag: {
            "NAAM": "Naam",
            "STRAAT": "Straat",
            "NAZCACODE": "Nazcacode",
            "KWO_STATUS": "KWO Status",
            "TYPE_ID": "KWO Type",
            "BODEMZIJDI": "Bodem",	
            "BOVENKANT": "Diepte bovenkant",
            "ONDERKANT": "Diepte onderkant",
            "CAPACITEIT": "Capaciteit",
            "M3_JAAR": "Onttrekking water (m³/jr)",
            "VERMOGEN": "Vermogen"
          },
          Rwsgeluidskaarten: {
            "ondergrens": "Ondergrens (dB)" ,
            "bovengrens": "Bovengrens (dB)" ,
            "min_max": "Min-Max (dB)"
          },
          GemeentelijkeMonumenten: {
            "CATEGORIE": "Categorie" ,
            "ADRES": "Adres" ,
            "AANDUIDIN": "Aanduiding" ,
            "NAAM": "Naam" ,
            "COMPLEX": "Complex" ,
            "BOUWJAAR": "Bouwjaar" ,
            "ARCHITECT": "Architect" ,
            "AANWIJSDATUM": "Aanwijsdatum" ,
            "OBJECT_NUMMER": "Object nummer" ,
            "LINK_PDF": "Link",
            "MONID": "MONID", 
            "F2kolum_AD": "F2kolum_AD", 
            "ADRESSEN": "ADRESSEN", 
            "MONKODE1": "MONKODE1", 
            "MONKODE1_O": "MONKODE1_O", 
            "MONKODE2": "MONKODE2", 
            "MONKODE2_O": "MONKODE2_O", 
            "GemMon_ADR": "GemMon_ADR", 
            "BOUWTKWA": "BOUWTKWA", 
            "RIJKS_MONN": "RIJKS_MONN", 
            "GEM_MONNR": "GEM_MONNR", 
            "WIJK": "WIJK", 
            "BUURT": "BUURT", 
            "LOKATIE1": "LOKATIE1", 
            "LOKATIE2": "LOKATIE2", 
            "LOKATIE3": "LOKATIE3", 
            "LOKATIE4": "LOKATIE4", 
            "VOLUME": "VOLUME", 
            "CBS_CATEGO": "CBS_CATEGO", 
            "BOUWJR_VAN": "BOUWJR_VAN", 
            "BOUWJR_TOT": "BOUWJR_TOT", 
            "MONWACHT": "MONWACHT", 
            "DDPLAATSIN": "DDPLAATSIN", 
            "DDWIJZIGIN": "DDWIJZIGIN", 
            "BESLUITJR": "BESLUITJR", 
            "BESLUITNR": "BESLUITNR", 
            "AANTEKENIN": "AANTEKENIN", 
            "REDENG_OMS": "REDENG_OMS", 
            "Monnr": "Monnr", 
            "gemnr": "gemnr"

          },
          Vergunningen: {
            "datum_verzenden": "Datum verzenden" ,
            "adres": "Adres" ,
            "zaaknummer": "Zaaknummer" ,
            "datum_binnenkomst": "Datum binnenkomst" ,
            "status_omschrijving": "Status" ,
            "type_omschrijving": "Type" ,
            "omschrijving": "Omschrijving"
          },
          Woningbouw: {
            "PROJECTNUMMER": "Projectnummer" ,
            "NAAMPROJECT": "Projectnaam" ,
            "TOTAALAANTALWONINGEN": "Aantalwoningen" ,
            "AFDELING": "Afdeling"
          },
          KVK: {
            "kvknummer": "KvK" ,
            "vestigingsnummer": "Vestigingsnummer" ,
            "businessName": "Handelsnaam" ,
            "legalFormDescription": "Rechtsvorm" ,
            "employees": "Werknemers" ,
            "street": "Straat" ,
            "houseNumber": "Hiusnummer" ,
            "houseNumberAddition": "Toev." ,
            "postalCode": "Postcode" ,
            "city": "Plaats" ,
            "website": "Website" ,
            "mainActivitySbiCode": "SBI-code" ,
            "mainActivitysbiCodeDescription": "Activiteiten" ,
            "registrationDate": "Startdatum" ,
            "deregistrationDate": "Einddatum"
          }, 
          Rce: {
            "RIJKSMONNR": "Rijksmonument nummer" ,
            "NAAM": "Naam" ,
            "TYPEMONUM": "Type monument" ,
            "CBSCATEGOR": "CBS-categorie" ,
            "OORSPRFUNC": "Oorspronkelijke functie" ,
            "SUBCATOMS": "Sub categorie" ,
            "HFDCATOMS": "Hoofd categorie" ,
            "TYPECHOBJ": "Type cultuurhistorisch object" ,
            "BEGBOUWJR": "Begin bouw jaar" ,
            "EINDBOUWJR": "Eind bouw jaar" ,
            "GEMEENTE": "Gemeente" ,
            "PROVINCIE": "Provincie" ,
            "PLAATS": "Plaats" ,
            "STRAAT": "Straat" ,
            "HUISNUMMER": "Huisnummer" ,
            "TOEVOEGING": "Toevoeging" ,
            "POSTCODE": "Postcode" ,
            "KICH_URL": "Uittreksel van het rijksmonument URL" ,
            "STATUS": "Status"
          },
          Bekendmakingen: {
            oid: 'Vergunningen ID',
            categorie: 'Categorie',
            onderwerp: 'Onderwerp',
            titel: 'Title',
            beschrijving: 'Beschrijving',
            url: 'Url',
            postcodehuisnummer: 'Postcode & huisnummer',
            plaats: 'Plaats',
            straat: 'Straat',
            datum: 'Datum',
            overheid: 'Overheid'
          }
        }
      }
    },
    computed: {
      keys() {
        if (this.item.data && this.item.data.length) {
          return Object.keys(this.item.data[0]);
        } else {
          return [];
        }
      },
      formattedItem() {
        let props = this.item.data[0];
        //only for Bestemmingsplangebied
        if (this.item.label === 'Bestemmingsplangebied') {
          return props.formattedProps;
        }
        //others
        if (this.accordion[this.item.source]) {
          return _.compact(_.keys(props).map(key => {
            if (this.accordion[this.item.source][key]) {
               if (props[key] && props[key] !== '') {
              return {
                value: props[key],
                label: this.accordion[this.item.source][key]
              }
               }
            } 
          }));
        } else {
          return _.compact(_.keys(props).map(key => {
            return {
              value: props[key],
              label: key
            }
          }));
        }
        return _.compact(_.keys(props).map(key => {
          if (this.accordion[this.item.source][key]) {
            return {
              value: props[key],
              label: this.accordion[this.item.source][key]
            }
          } 
        }));
      }
    },
    mounted()
    {

    },
    watch: {
      item: {
        handler(newItem) {
          // this.item2 = newItem;
          // this.test = 'yess?';
        }
      },
      deep: true
    }
  }

</script>