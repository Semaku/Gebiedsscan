import json
from urllib.request import urlopen, Request
import pydash
import geojson
import shapely.wkt
import geojsonio

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
	with open('data3.json', 'w') as outfile:
		json.dump(geoJson, outfile)
	print("saved to file!")


while offsetCount < maxOffsetCount:
	url = "https://data.pdok.nl/sparql?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20brt%3A%20%3Chttp%3A%2F%2Fbrt.basisregistraties.overheid.nl%2Fdef%2Ftop10nl%23%3E%0APREFIX%20bag%3A%20%3Chttp%3A%2F%2Fbag.basisregistraties.overheid.nl%2Fdef%2Fbag%23%3E%0APREFIX%20ns1%3A%20%3Chttp%3A%2F%2Fbrt.basisregistraties.overheid.nl%2Fdef%2Ftop10nl%23%3E%0APREFIX%20geo%3A%20%3Chttp%3A%2F%2Fwww.opengis.net%2Font%2Fgeosparql%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20br%3A%20%3Chttp%3A%2F%2Fvocab.deri.ie%2Fbr%23%3E%0A%0ASELECT%20%3Fbrt_obj_id%20%3Fbrt_type%20%3Fbrt_sort_name%20%3Ffunct_gebied_name%20%3Fregistration_date%20%3Fgeometry%0A%0AWHERE%20%7B%0A%20%3Fbrt_obj_id%20a%20brt%3AFunctioneelGebied%3B%09%09%09%23Campus%3B%20%23Sluizencomplex%0A%20%20%20%20rdf%3Atype%20%3Fbrt_type%20%3B%0A%20%20%20%20brt%3AnaamNL%20%3Ffunct_gebied_name%20%3B%0A%20%20%20%20geo%3AhasGeometry%2Fgeo%3AasWKT%20%3Fgeometry%20.%0A%0A%20%20OPTIONAL%20%7B%3Fbrt_obj_id%20brt%3AtijdstipRegistratie%20%3Fregistration_date.%7D%0A%20%20OPTIONAL%20%7B%3Fbrt_obj_id%20brt%3Asoortnaam%20%3Fbrt_sort_name.%7D%0A%0A%20%20FILTER%20(%3Fbrt_type%20!%3D%20brt%3AFunctioneelGebied)%0A%7D%0A%23LIMIT%20200%0A%23OFFSET%201200"
	try:
		with urlopen(Request(url, headers={'Accept': 'application/json'})) as url:
			data = json.loads(url.read().decode())
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

