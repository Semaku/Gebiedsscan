import json
from urllib.request import urlopen, Request
import pydash
import geojson
import shapely.wkt


offset = 0
limit = 1
all_items = []
url = "https://data.pdok.nl/sparql?query=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX%20bag%3A%20%3Chttp%3A%2F%2Fbag.basisregistraties.overheid.nl%2Fdef%2Fbag%23%3E%0APREFIX%20pdok%3A%20%3Chttp%3A%2F%2Fdata.pdok.nl%2Fdef%2Fpdok%23%3E%0APREFIX%20geosparql%3A%20%3Chttp%3A%2F%2Fwww.opengis.net%2Font%2Fgeosparql%23%3E%0A%0ASELECT%20DISTINCT%20%3Fpand_id%20%23%3Fvo%20%3Fid%20%3Fvo_type%0A%23%3Fadres%0A%3Fcityname_%20%3Fpost_code%20%3Fhousenumber_%20%23%3Fweg%0A%3Fstreetname%20%3Fstreetname_%20%23%3Ffulladdress%20%23fulladdress%20is%20not%20really%20needed%0A%23%3Fpand%0A%23%3Fpand_id%0A%3Fpand_status%20%3Fbuild_year%0A%23%3Fpand_geometry%0A%3Fpand_coordinates_geo%20%23%3Fpand_coordinates_pdok%0A%0AWHERE%20%7B%0A%20%20%3Fvo%20bag%3Aidentificatiecode%20%3Fid%20%3B%0A%20%20%20%20%20%20a%20%5Brdfs%3Alabel%20%3Fvo_type%5D%20%3B%20%20%23%3Fweg%20rdfs%3Alabel%20%22Damrak%22%40nl%20.%0A%0A%20%20%20%20%20%20bag%3Ahoofdadres%20%3Fadres%20%3B%0A%20%20%20%20%20%20bag%3Apandrelatering%20%3Fpand%20.%0A%0A%20%20%3Fpand%20bag%3Aidentificatiecode%20%3Fpand_id%20%3B%0A%20%20%20%20%20%20%20%20bag%3Astatus%20%5Bskos%3AprefLabel%20%3Fpand_status%5D%20%3B%0A%20%20%20%20%20%20%20%20bag%3AoorspronkelijkBouwjaar%20%3Fbuild_year%20%3B%0A%20%20%20%20%20%20%20%20geosparql%3AhasGeometry%2Fgeosparql%3AasWKT%20%3Fpand_coordinates_geo%20%3B%0A%20%20%20%20%20%20%20%20geosparql%3AhasGeometry%2Fpdok%3AasWKT-RD%20%3Fpand_coordinates_pdok%20.%0A%20%20%20%20%20%20%20%20%23%23%20geosparql%3AhasGeometry%20%3Fpand_geometry%20.%20%20%23%20if%20extended%20properties%20for%20Geometry%20are%20needed%20in%20the%20future%0A%0A%20%20%23%23%3Fpand_geometry%20a%20geosparql%3AGeometry%20%3B%0A%20%20%23%23%20%20%20%20%20%20geosparql%3AasWKT%20%3Fpand_coordinates_geosparql%20%3B%0A%20%20%23%23%20%20%20%20%20%20pdok%3AasWKT-RD%20%3Fpand_coordinates_pdok%20.%0A%0A%20%20%23%20address%20and%20post%20code%20related%20part%0A%20%20%3Fadres%20bag%3Ahuisnummer%20%3Fhousenumber%20%3B%0A%20%20%20%20%20%20%20%20%20bag%3AbijbehorendeOpenbareRuimte%20%3Fweg%20.%0A%0A%20%20%23%3Fweg%20rdfs%3Alabel%20%22Kalfjeslaan%22%40nl%20.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%23%20change%20this%20to%20filter%20on%20a%20street%20name%0A%0A%20%20OPTIONAL%20%7B%3Fadres%20bag%3Apostcode%20%3Fpost_code%20.%7D%0A%0A%20%20%3Fweg%20rdfs%3Alabel%20%3Fstreetname%20%3B%0A%20%20%20%20%20%20%20bag%3AbijbehorendeWoonplaats%20%3Fwoonplaats%20.%0A%0A%20%20%3Fwoonplaats%20rdfs%3Alabel%20%22Amsterdam%22%40nl%20.%20%20%20%20%20%20%20%20%20%23%20change%20this%20to%20filter%20by%20the%20city%20name%0A%0A%0A%20%20%23BIND(CONCAT(STR(%3Fstreetname)%2C%20%22%20%22%2C%20STR(%3Fhousenumber)%2C%20%22%20%22%2C%20STR(%3Fcityname))%20AS%20%3Ffulladdress%20)%0A%20%20BIND(CONCAT(STR(%3Fstreetname)%2C%20%22%20%22%2C%20STR(%3Fhousenumber)%2C%20%22%20%22%2C%20%22Amsterdam%22)%20AS%20%3Ffulladdress%20)%0A%20%20BIND(REPLACE(%3Fpand_status%2C%20%22%22%2C%20%22%22%20)%20AS%20%3Fpand_status_)%0A%0A%20%20BIND(%22Amsterdam%22%20AS%20%3Fcityname_)%0A%20%20BIND(STR(%3Fstreetname)%20AS%20%3Fstreetname_)%0A%20%20BIND(STR(%3Fhousenumber)%20AS%20%3Fhousenumber_)%0A%0A%20%20%23FILTER%20(LANG(%3Fcityname)%20%3D%20%22nl%22%20)%0A%20%20%23FILTER%20(STR(%3Fcityname)%20%3D%20%22Amsterdam%22)%20%20%20%20%20%23%20Amsterdam%0A%20%20%23FILTER%20(STR(%3Fstreetname)%20%3D%20%22Damrak%22)%20%20%20%23%20Jodenbreestraat%0A%20%20%23FILTER%20(%3Fpost_code%20%3D%20%225643KL%22)%20%20%20%20%20%20%20%20%20%20%20%20%23%205643KL%0A%0A%20%20FILTER%20(%3Ftype%20!%3D%20%3Chttp%3A%2F%2Fwww.opengis.net%2Font%2Fgeosparql%23Feature%3E)%0A%20%20FILTER%20(%3Ftype%20!%3D%20bag%3AVerblijfsobject)%0A%0A%0A%7D%0A%23GROUP%20BY%20%3Fvo%0ALIMIT%20%0A"+ str(limit) +"%0AOFFSET%20%20"+ str(offset) +"%20%20%23%2020000%20etc.%20etc."

# poly = "POLYGON ((5.712895298170003 51.418670380242006,5.713325664312021 51.418566534979966,5.713750395492593 51.4183881641464,5.713683304431636 51.418314625236491,5.713920929078446 51.418197029842496,5.71435246790753 51.418593901962524,5.714366838115383 51.418607111046235,5.714358910360506 51.418612202952005,5.714669046033359 51.41920263898399,5.714602759279577 51.419216910556514,5.71397880305966 51.419351200534045,5.713781069132116 51.419384878234077,5.713659831603282 51.419388534691478,5.713374048940177 51.419370871834083,5.713268171260597 51.419355275947353,5.71305813258647 51.418908718000019,5.713007098024893 51.418800222639703,5.712955402126085 51.418739953742524,5.712895298170003 51.418670380242006))"
# g1 = shapely.wkt.loads(poly)
# g2 = geojson.Feature(geometry=g1)
# print(g2)

with urlopen(Request(url, headers={'Accept': 'application/json'})) as url:
	data = json.loads(url.read().decode())
	for value in data['results']['bindings']:
		value = pydash.map_values(value, lambda x: x['value'])
		g1 = shapely.wkt.loads(value['pand_coordinates_geo'])
		g2 = geojson.Feature(geometry=g1, properties=value)
		del g2['properties']['pand_coordinates_geo']
		all_items.append(g2)
	print(all_items)

  # with open('data.json', 'w') as outfile:
  #   json.dump(all_items, outfile)

