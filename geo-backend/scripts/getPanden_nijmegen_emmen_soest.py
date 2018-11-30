import json
from urllib.request import urlopen, Request
import pydash
import geojson
import shapely.wkt
import geojsonio

# customize
limit = 10000 #amount of items to be returned
maxOffsetCount = 10 #max api calls to make

# dont customize
offset = 0
offsetCount = 0
geoJson = {
	"type": "FeatureCollection",
	"features": []
}
saved = False

# cities = ["Soesterberg", "Soest", "Nijmegen", "Heilig%20Landstichting", "Lent", "Schoonebeek", "Zandpol", "Weiteveen", "Nieuw-Schoonebeek", "Nieuw%20Schoonebeek", "Emmen", "Nieuw-Dordrecht", "Nieuw-Weerdinge", "Nieuw%20Weerdinge", "Nieuw-Amsterdam", "Nieuw%20Amsterdam", "Veenoord", "Emmer-Compascuum", "Emmer%20Compascuum", "Barger-Compascuum", "Nieuw%20Dordrecht", "Klazienaveen", "Erica", "Klazienaveen-Noord", "Zwartemeer", "Roswinkel"]
cities = ["Heilig%20Landstichting"]
def saveToFile():
	print("saving...")
	with open('dataTest.json', 'w') as outfile:
		json.dump(geoJson, outfile)
	print("saved to file!")


for city in cities: 
	while offsetCount < maxOffsetCount:
		print("Retrieving: " + city + ", offset: " + str(offset))
		url = "https://data.pdok.nl/sparql?query=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX%20bag%3A%20%3Chttp%3A%2F%2Fbag.basisregistraties.overheid.nl%2Fdef%2Fbag%23%3E%0APREFIX%20pdok%3A%20%3Chttp%3A%2F%2Fdata.pdok.nl%2Fdef%2Fpdok%23%3E%0APREFIX%20geosparql%3A%20%3Chttp%3A%2F%2Fwww.opengis.net%2Font%2Fgeosparql%23%3E%0ASELECT%20DISTINCT%20%3Fpand_id%0A%3Fcityname_%20%3Fpost_code%20%3Fhousenumber_%20%3Fhouseletter%0A%3Fstreetname%20%3Fstreetname_%0A%3Fpand_status%20%3Fbuild_year%0A%3Fpand_coordinates_geo%0A%0AWHERE%20%7B%0A%20%20%3Fvo%20bag%3Aidentificatiecode%20%3Fid%20%3B%0A%20%20%20%20%20%20a%20%5Brdfs%3Alabel%20%3Fvo_type%5D%20%3B%20%20%23%3Fweg%20rdfs%3Alabel%20%22Damrak%22%40nl%20.%0A%20%20%20%20%20%20bag%3Ahoofdadres%20%3Fadres%20%3B%0A%20%20%20%20%20%20bag%3Apandrelatering%20%3Fpand%20.%0A%20%20%3Fpand%20bag%3Aidentificatiecode%20%3Fpand_id%20%3B%0A%20%20%20%20%20%20%20%20bag%3Astatus%20%5Bskos%3AprefLabel%20%3Fpand_status%5D%20%3B%0A%20%20%20%20%20%20%20%20bag%3AoorspronkelijkBouwjaar%20%3Fbuild_year%20%3B%0A%20%20%20%20%20%20%20%20geosparql%3AhasGeometry%2Fgeosparql%3AasWKT%20%3Fpand_coordinates_geo%20%3B%0A%20%20%20%20%20%20%20%20geosparql%3AhasGeometry%2Fpdok%3AasWKT-RD%20%3Fpand_coordinates_pdok%20.%0A%20%20%20%20%20%20%20%20%23%23%20geosparql%3AhasGeometry%20%3Fpand_geometry%20.%20%20%23%20if%20extended%20properties%20for%20Geometry%20are%20needed%20in%20the%20future%0A%20%20%20%20%20%20%20%20%20%20%23%20address%20and%20post%20code%20related%20part%0A%20%20%3Fadres%20bag%3Ahuisnummer%20%3Fhousenumber%20%3B%0A%20%20%20%20%20%20%20%20%20bag%3AbijbehorendeOpenbareRuimte%20%3Fweg%20.%0A%20%20OPTIONAL%20%7B%3Fadres%20bag%3Ahuisletter%20%3Fhouseletter%7D%0A%20%20OPTIONAL%20%7B%3Fadres%20bag%3Apostcode%20%3Fpost_code%20.%7D%0A%20%20%3Fweg%20rdfs%3Alabel%20%3Fstreetname%20%3B%0A%20%20%20%20%20%20%20bag%3AbijbehorendeWoonplaats%20%3Fwoonplaats%20.%0A%20%20%3Fwoonplaats%20rdfs%3Alabel%20%22"+ city +"%22%40nl%20.%20%20%20%20%20%20%20%20%20%23%20change%20this%20to%20filter%20by%20the%20city%20name%0A%20%20%23BIND(CONCAT(STR(%3Fstreetname)%2C%20%22%20%22%2C%20STR(%3Fhousenumber)%2C%20%22%20%22%2C%20%22Amsterdam%22)%20AS%20%3Ffulladdress%20)%0A%20%20BIND(REPLACE(%3Fpand_status%2C%20%22%22%2C%20%22%22%20)%20AS%20%3Fpand_status_)%0A%20%20BIND(%22"+ city +"%22%20AS%20%3Fcityname_)%0A%20%20BIND(STR(%3Fstreetname)%20AS%20%3Fstreetname_)%0A%20%20BIND(STR(%3Fhousenumber)%20AS%20%3Fhousenumber_)%0A%20%20FILTER%20(%3Ftype%20!%3D%20%3Chttp%3A%2F%2Fwww.opengis.net%2Font%2Fgeosparql%23Feature%3E)%0A%20%20FILTER%20(%3Ftype%20!%3D%20bag%3AVerblijfsobject)%0A%7D%0AOFFSET%20" + str(offset)

		try:
			with urlopen(Request(url, headers={'Accept': 'application/json'})) as url:
				data = json.loads(url.read().decode())
				if len(data['results']['bindings']) > 0:
					for value in data['results']['bindings']:
						value = pydash.map_values(value, lambda x: x['value'])
						g1 = shapely.wkt.loads(value['pand_coordinates_geo'])
						g2 = geojson.Feature(geometry=g1, properties=value)
						del g2['properties']['pand_coordinates_geo']
						geoJson['features'].append(g2) 
					offset += limit
					offsetCount += 1
					print("incrementing offset to " + str(offset) +" ....  " + "current length of features " , len(geoJson['features']))
				else:
				    #break when we run out of results...if you have a lot of results will     take A LONG TIME to run
				    print("No results....")
				    break
		except Exception as inst:
			print(inst)
			print("Aborting...")
			saved = True
			saveToFile()
			break
	offset = 0
	offsetCount = 0


if not saved:
	saveToFile()
#write to file
# geojsonio.display(json.dumps(geoJson))

