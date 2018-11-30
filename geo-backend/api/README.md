# semaku-geo-api
API voor de semaku-geo

## How to start
'''
npm start
'''

## How to deploy 
'''
docker-compose down
docker-compose build
docker-compose up -d
'''

## Datasources


Data Type | Source | Geometry
------ | ----- | ----
Archeologie | postGis | No
Bomen  | postGis | Yes
Bouwaanduiding | postGis | No
Bouwvlak | postGis | No
Bijtebouwen | postGis | Yes
CultuurHistorie | postGis | No
Dubbelbestemming | postGis | No  ++> Ruimtelijkeplannen
Enkelbestemming | postGis | No   ++> Ruimtelijkeplannen
Functieaanduiding | postGis | No  ++> Ruimtelijkeplannen
GebiedsAanduiding | postGis | No  
Maatvoering | postGis | No
Welstand | postGis | No
Geluid | postGis | Yes
Perceel | postGis | Yes
brtachtergrondkaart | https://geodata.nationaalgeoregister.nl/tiles/service/tms 
bgtachtergrond | https://geodata.nationaalgeoregister.nl/tiles/service/tms
dkk kadastralekaartv3 | https://geodata.nationaalgeoregister.nl/kadastralekaartv3
bag | https://bag.basisregistraties.overheid.nl/api/v1/
adress search | https://geodata.nationaalgeoregister.nl/locatieserver/

