import json
from urllib.request import urlopen, Request
from urllib.parse import quote
import pydash
import geojson
import shapely.wkt
import geojsonio

# Sparql Query
query = """PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX brt: <http://brt.basisregistraties.overheid.nl/def/top10nl#>
PREFIX bag: <http://bag.basisregistraties.overheid.nl/def/bag#>
PREFIX ns1: <http://brt.basisregistraties.overheid.nl/def/top10nl#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX br: <http://vocab.deri.ie/br#>
SELECT ?brt_obj_id ?brt_plaats_type ?plaats_name ?registration_date ?inwoners ?geometry
WHERE {
 ?brt_obj_id a brt:Plaats;               #woonkern #wijk
    rdf:type ?brt_type ;
    geo:hasGeometry/geo:asWKT ?geometry .
  OPTIONAL {?brt_obj_id brt:naamNL ?plaats_name.}
  OPTIONAL {?brt_obj_id brt:tijdstipRegistratie ?registration_date.}
  OPTIONAL {?brt_obj_id brt:aantalinwoners ?inwoners.}
  FILTER (?brt_type != brt:Plaats)
  BIND (SUBSTR(STR(?brt_type), 54) AS ?brt_plaats_type)  #http://brt.basisregistraties.overheid.nl/def/top10nl#Buurtschap
}
#LIMIT 5
#OFFSET 1200
"""

# customize
limit = 10 #amount of items to be returned
maxOffsetCount = 1 #max api calls to make

# dont customize
offset = 0
offsetCount = 0
geoJson = {
	"type": "FeatureCollection", 	
	"features": []
}

def saveToFile(json):
	print("saving...")
	with open('plaats.json', 'w') as outfile:
		json.dump(geoJson, outfile)
	print("saved to file!")


while offsetCount < maxOffsetCount:
	url = "https://data.pdok.nl/sparql?query=" + quote(query)
	try:
		with urlopen(Request(url, headers={'Accept': 'application/json'})) as url:
			data = json.loads(url.read().decode())
			print(data)
			if len(data['results']) > 0:
				for value in data['results']['bindings']:
					value = pydash.map_values(value, lambda x: x['value'])
					g1 = shapely.wkt.loads(value['geometry'])
					g2 = geojson.Feature(geometry=g1, properties=value)
					del g2['properties']['geometry']
					geoJson['features'].append(g2)
				print("incrementing offset to " + str(offset) +" ....  " + "current length of features " , len(geoJson['features']))
				offset += limit
				offsetCount += 1
				
			else:
			    #break when we run out of results...if you have a lot of results will     take A LONG TIME to run
			    break
	except Exception as inst:
		saveToFile(json)
		print(inst)


print("done")
saveToFile(json)
#write to file

