/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');
const dummyData = require('../../dummy-data.js');

exports.register = function (server, options, next)

{
    server.route({
        method: 'GET',
        path: '/perceel/{id}/garage',
        config: {
            description: 'Haal alle informatie op rond de casus "Garage"',
            notes: 'Garage info',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string()
                        .required()
                        .description('Kadastrale aanduiding')
                }
            }
        },
        handler: function (request, reply) {
            const id = decodeURIComponent(request.params.id).toUpperCase();
            let data = {
                limits: {
                    "maxGootHoogte": {
                        "value": 3,
                        "description": "Maximale goothoogte in meter"
                    },
                    "maxNokHoogte": {
                        "value": 5,
                        "description": "Maximale nokhoogte in meter"
                    },
                    "maxDakhelling": {
                        "value": 52,
                        "description": "Indien schuin dak; maximale hellingshoek in graden"
                    },
                    "maxAantalVerdiepingen": {
                        "value": 2,
                        "description": "Maximaal aantal verdiepingen"
                    }
                },
                functies: {}
            }; // Initiier object met vast/dummy waarden

            function enkelbestemmingenQuery(callback) {
                let query = `SELECT naam, ST_AsGeoJSON(ST_Union(ST_MakeValid(ST_ForceSFS(p.geom))),3) AS begrenzing FROM soest.fid_perceel p
                             JOIN soest.fid_laag_enkelbestemming e on p.fid = e.fid
                             WHERE p.pcvl_prcl_object_akr = '${id}'                             
                             GROUP BY naam`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {
                        data.functies.enkelbestemmingen = utils.objectifyGeometryString(result.rows);
                    }
                    callback();
                });
            }

            function functieaanduidingenQuery(callback) {

                let query = `SELECT naam, ST_AsGeoJSON(ST_Union(ST_MakeValid(ST_ForceSFS(p.geom))),3) AS begrenzing FROM soest.fid_perceel p
                             JOIN soest.fid_laag_functieaanduiding e on p.fid = e.fid
                             WHERE p.pcvl_prcl_object_akr = '${id}'                             
                             GROUP BY naam`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {
                        data.functies.functieaanduidingen = utils.objectifyGeometryString(result.rows);
                    }                   
                    callback();
                });
            }

            function maatvoeringLimitsQuery(callback) {
                let query = `SELECT
                            (regexp_matches(m.maatvoering, '.+bouwhoogte \\(m\\)\\"=\\"([0-9]+).+goothoogte \\(m\\)\\"=\\"([0-9]+)\\"'))[1] AS maxNokHoogte,
                            (regexp_matches(m.maatvoering, '.+bouwhoogte \\(m\\)\\"=\\"([0-9]+).+goothoogte \\(m\\)\\"=\\"([0-9]+)\\"'))[2] AS maxGootHoogte
                            FROM soest.fid_perceel p, soest.fid_laag_maatvoering m
                            WHERE p.pcvl_prcl_object_akr = '${id}'
                            AND p.fid = m.fid
                            ORDER BY ST_Area(p.geom) DESC
                            LIMIT 1`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {

                        data.limits.bouwvlak = result.rows;
                    } 
                    callback();
                });
            }

            function archeologieQuery(callback) {
                let query = `SELECT thema, naam, ST_AsGeoJSON(ST_Union(ST_MakeValid(ST_ForceSFS(geom))),3) AS begrenzing FROM soest.fid_perceel p
                             JOIN soest.fid_laag_archeologie a on p.fid = a.fid
                             WHERE p.pcvl_prcl_object_akr = '${id}'                             
                             GROUP BY thema, naam`;                             

                    db.query(query, function (err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.archeologie = utils.objectifyGeometryString(result.rows);
                        }
                        callback();
                    });
                
            }

            function afvalQuery(callback) {

       //         if (id == "SOE00C 04792G0000") {
       //             console.log(afval)
       //             data.afval = afval;
       //         }
                callback();
            }

            function bijTeBouwenQuery(callback) {               
                let query= `SELECT        bebouwingsgebied, bij_te_bouwen, bijbouwcategorie, komgebied, ST_AsGeoJSON(ST_Difference(
                                                ST_SetSRID(geom, 28992),
                                                (SELECT ST_Union(ST_MakeValid(ST_ForceSFS(p.geom))) AS begrenzing  
                                                from soest.fid_perceel p
                                                LEFT JOIN soest.fid_laag_bomen_p b on p.fid = b.fid
                                                LEFT join soest.fid_laag_bomen_v v on p.fid = v.fid
                                                WHERE p.pcvl_prcl_object_akr = '${id}'
                                                AND (b.naam IS NOT NULL OR v.naam IS NOT NULL))),3) AS begrenzing 
                            FROM soest.bijtebouwen
                            WHERE pcvl_prcl_object_akr = '${id}'`

                    db.query(query, function (err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.bijTeBouwen = utils.objectifyGeometryString(result.rows);
                        }
                        callback();
                    });
            }

            function cultuurhistorieQuery(callback) {
                let query = `select  c.thema, c.naam, ST_AsGeoJSON(ST_Union(ST_ForceSFS(geom)),3) AS begrenzing from soest.fid_perceel p
                JOIN soest.fid_laag_cultuurhistorie c ON p.fid = c.fid
                WHERE p.pcvl_prcl_object_akr = '${id}'
                AND thema = 'monumenten'                
                AND naam NOT IN ('Bedrijventerrein', 'Blok- tot strookvormige veenontginningen met halfopen structuur', 'Centrumgebied', 'Eng', 'Engrandontginningen', 'Functionalistische open verkaveling (CIAM)', 'Gemiddeld', 'Historische kern met huispercelen', 'Historische linten', 'Hollandveenontginningen, met halfopen structuur', 'Hollandveenontginningen, met open structuur', 'Hoofdgroenstructuur', 'Hoog', 'Instituten', 'Jonge buitenplaats', 'Jonge heidebebossing met heiderelicten', 'Jonge planmatige heidebebossing', 'Jonge veenontginningen met veenkoloniale kenmerken', 'Keuterontginningen', 'Laag', 'Landgoederen en buitenplaatsen', 'Langgerekte laagte', 'Militair landschap', 'Nat-droge veenkampen met veenkoloniale kenmerken', 'Neorationalisme', 'Onregelmatig verkaveld beekdal met open structuur', 'Oude buitenplaats', 'Oude dorpskern', 'Regelmatige kampontginningen', 'Regelmatige straatontginningen', 'Regelmatige straatontginningen, nu militair vliegveld', 'Regelmatige veldontginning', 'Stratenverkaveling', 'Stuifzand', 'Stuifzandbebossing', 'Thematische stedenbouw', 'Traditionalistische ensembles (Delftse School)', 'Veenontginningen met bosopstanden', 'Villaverkaveling', 'Woonerven', 'Zeer hoog')
                GROUP BY c.thema, c.naam`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {
                        data.monumenten = utils.objectifyGeometryString(result.rows);
                    }
                    callback();
                });
            }

            function bomenQuery(callback) {
                let query = `SELECT
                                COALESCE(b.naam, v.naam) AS naam,
                                COALESCE(b.categorie, v.categorie) AS categorie,
                                COALESCE(b.verwijzingnaartekst, v.verwijzingnaartekst) AS verwijzingnaartekst,
                                ST_AsGeoJSON(ST_Union(ST_MakeValid(ST_ForceSFS(p.geom))),3) AS begrenzing  from soest.fid_perceel p
                                LEFT JOIN soest.fid_laag_bomen_p b on p.fid = b.fid
                                LEFT join soest.fid_laag_bomen_v v on p.fid = v.fid
                                WHERE p.pcvl_prcl_object_akr = '${id}'
                                AND (b.naam IS NOT NULL
                                OR v.naam IS NOT NULL)
                                GROUP BY b.naam, v.naam, b.categorie, v.categorie, b.verwijzingnaartekst, v.verwijzingnaartekst`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {
                        data.bomen = utils.objectifyGeometryString(result.rows);
                    }
                    callback();
                });
            }

            function geluidQuery(callback) {
                let query = `SELECT g.naam, ST_AsGeoJSON(ST_Union(ST_MakeValid(ST_ForceSFS(g.geom))),3) AS begrenzing
                             FROM soest.percelen p, soest.geluid g
                             WHERE p.pcvl_prcl_object_akr = '${id}'
                             AND ST_Distance(p.geom, g.geom) < 6
                             AND g.naam != 'Thema Geluid'
                             group by g.naam`;

                db.query(query, function (err, result) {
                    if (Object.keys(result.rows).length !== 0) {
                        data.geluid = utils.objectifyGeometryString(result.rows);
                    }
                    callback();
                });
            }


            //This functions will be executed at the same time
            async.parallel([
                enkelbestemmingenQuery,
                functieaanduidingenQuery,
                maatvoeringLimitsQuery,
                archeologieQuery,
                afvalQuery,
                geluidQuery,
                bijTeBouwenQuery,
                cultuurhistorieQuery,
                bomenQuery
            ], function (err, result) {
                //This code will be executed after all previous queries are done (the order doesn't matter).
                //For example you can do another query that depends of the result of all the previous queries.
                //console.log(data);
                reply(data);
            });
        }
    }); 

    next();
};

exports.register.attributes = {
    name: 'bijgebouw-route',
    version: '0.0.1'
};