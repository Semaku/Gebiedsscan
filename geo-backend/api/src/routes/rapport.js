/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');


exports.register = function (server, options, next)

{

    server.route({
        method: 'GET',
        path: '/perceel/{id}/rapport',
        config: {
            description: 'Haal alle informatie nodig een een omgevingsrapport op te stellen',
            notes: 'Rapport info',
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
            let data = { bouwen: {}, afval: {}, geluid: {}, ruimte: {}, functies: {}, welstand: {}, bomen: {}, archeologie: {}, erfgoed: {}};  // Initiier object met vast/dummy waarden
            

            function enkelbestemmingenQuery(callback) {

                let query = `SELECT naam, verwijzingnaarteksturl AS verwijzingnaartekst
                            FROM soest.fid_perceel p
                            JOIN soest.fid_laag_enkelbestemming e ON p.fid = e.fid
                            WHERE p.pcvl_prcl_object_akr = '${id}'
                            AND ST_Area(p.geom) > 5
                            GROUP BY bestemmingshoofdgroep, naam, plangebied, prefix, verwijzingnaarteksturl, e.pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.ruimte.enkelbestemmingen = result.rows;
                            }
                        callback();
                    });
                }

            function functieaanduidingenQuery(callback) {

                let query = `SELECT naam FROM soest.fid_laag_functieaanduiding
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY aanduiding, naam, plangebied, prefix, verwijzingnaarteksturl, pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.functies.functieaanduidingen = result.rows;
                            }
                        callback();
                    });
                }
            function bouwvlakQuery(callback) {

                let query = `SELECT naam FROM soest.fid_laag_bouwvlak
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY naam, plangebied, prefix, pcvl_prcl_object_akr`;
                    
//                   if (id == "SOE00C 04792G0000"){
//                       var documenten = [];
//                       documenten.push({ "naam" : "Bouwtekening", "verwijzingnaartekst": "static/bouwen/Bouwtekening_Kerkstraat 83 A.pdf" });
//                       documenten.push({ "naam" : "Situatieschets", "verwijzingnaartekst" : "static/bouwen/Situatietekening_Kerkstraat 83 A.pdf" });
//                       documenten.push({ "naam" : "Bouwvergunning", "verwijzingnaartekst":"static/bouwen/Vergunning_Kerkstraat 83 A.pdf" });
//                        documenten.push({ "naam" : "Eigendomsgegevens", "verwijzingnaartekst":"static/bouwen/Eigendomsgegevens_Kerkstraat 83a Soest.pdf" });
                        
//                        data.bouwen.documenten = documenten;                    
//                    }
                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.bouwen.bouwvlak = result.rows;                            
                            }
                        callback();
                    });
                }

            function bouwaanduidingQuery(callback) {

                let query = `SELECT naam FROM soest.fid_laag_bouwaanduiding
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY naam, plangebied, prefix, pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.bouwen.bouwaanduiding = result.rows;
                            }
                        callback();
                    });
                }

            function maatvoeringQuery(callback) {

                let query = `SELECT maatvoering AS naam FROM soest.fid_laag_maatvoering
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY aanduiding, maatvoering, symboolcode, naam, plangebied, prefix, pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.bouwen.maatvoering = result.rows;
                            }
                        callback();
                    });
                }

            function welstandQuery(callback) {

                let query = `SELECT regexp_replace(naam, '^.+_', '') AS naam,
                            'static/welstand/gk_' || naam || '.pdf' AS verwijzingnaargebiedskarakteristiek,
                                CASE WHEN welstandsniveau = 2 THEN './static/welstand/bkp_' || naam || '.pdf'
                                     ELSE NULL
                                END AS verwijzingnaarbeeldkwaliteitplan,
                            'static/welstand/welstandsregels_niveau_' || welstandsniveau::text || '.html' AS verwijzingnaarwelstandsregels
                             FROM soest.fid_laag_welstand
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY naam, welstandsniveau, plangebied, prefix, pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.welstand = result.rows;
                            }
                        callback();
                    });
                }

            function bomenQuery(callback) {

                let query = `SELECT naam, categorie, 'static/bomen/' || verwijzingnaartekst AS verwijzingnaartekst
                             FROM soest.fid_laag_bomen_p
                             WHERE pcvl_prcl_object_akr = '${id}'
                             UNION
                             SELECT naam, categorie, 'static/bomen/' || verwijzingnaartekst AS verwijzingnaartekst
                             FROM soest.fid_laag_bomen_v
                             WHERE pcvl_prcl_object_akr = '${id}'`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.bomen = result.rows;
                            }
                        callback();
                    });
                }

            function archeologieQuery(callback) {

                let query = `SELECT naam,  'static/archeologie/' || tekstreferentie_sv_verwijzingnaartekst AS verwijzingnaartekst
                FROM soest.fid_laag_archeologie
                WHERE pcvl_prcl_object_akr = '${id}'
                GROUP BY naam, pcvl_prcl_object_akr, plangebied, prefix,tekstreferentie_sv_verwijzingnaartekst, thema, typeplanobject`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.archeologie = result.rows;
                            }
                        callback();
                    });
                }

            function cultuurhistorieQuery(callback) {

                let query = `SELECT naam, 'static/cultuurhistorie/' || tekstreferentie_sv_verwijzingnaartekst AS verwijzingnaartekst
                             FROM soest.fid_laag_cultuurhistorie
                             WHERE pcvl_prcl_object_akr = '${id}'
                             AND naam NOT IN ('Bedrijventerrein', 'Blok- tot strookvormige veenontginningen met halfopen structuur', 'Centrumgebied', 'Eng', 'Engrandontginningen', 'Functionalistische open verkaveling (CIAM)', 'Gemiddeld', 'Historische kern met huispercelen', 'Historische linten', 'Hollandveenontginningen, met halfopen structuur', 'Hollandveenontginningen, met open structuur', 'Hoofdgroenstructuur', 'Hoog', 'Instituten', 'Jonge buitenplaats', 'Jonge heidebebossing met heiderelicten', 'Jonge planmatige heidebebossing', 'Jonge veenontginningen met veenkoloniale kenmerken', 'Keuterontginningen', 'Laag', 'Landgoederen en buitenplaatsen', 'Langgerekte laagte', 'Militair landschap', 'Nat-droge veenkampen met veenkoloniale kenmerken', 'Neorationalisme', 'Onregelmatig verkaveld beekdal met open structuur', 'Oude buitenplaats', 'Oude dorpskern', 'Regelmatige kampontginningen', 'Regelmatige straatontginningen', 'Regelmatige straatontginningen, nu militair vliegveld', 'Regelmatige veldontginning', 'Stratenverkaveling', 'Stuifzand', 'Stuifzandbebossing', 'Thematische stedenbouw', 'Traditionalistische ensembles (Delftse School)', 'Veenontginningen met bosopstanden', 'Villaverkaveling', 'Woonerven', 'Zeer hoog')
                             GROUP BY naam, tekstreferentie_sv_verwijzingnaartekst, prefix, pcvl_prcl_object_akr`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.erfgoed.cultuurhistorie = result.rows;
                            }
                        callback();
                    });
                }

            function dubbelbestemmingenQuery(callback) {

                let query = `SELECT naam, verwijzingnaarteksturl AS verwijzingnaartekst
                             FROM soest.fid_laag_dubbelbestemming
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY bestemmingshoofdgroep, naam, pcvl_prcl_object_akr, plangebied, prefix, verwijzingnaarteksturl`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.ruimte.dubbelbestemmingen = result.rows;
                            }
                        callback();
                    });
                }

            function gebiedsaanduidingenQuery(callback) {

                let query = `SELECT naam, verwijzingnaarteksturl AS verwijzingnaartekst
                             FROM soest.fid_laag_gebiedsaanduiding
                             WHERE pcvl_prcl_object_akr = '${id}'
                             GROUP BY naam, pcvl_prcl_object_akr, prefix, artikelnummer, gebiedsaanduidinggroep, plangebied, verwijzingnaarteksturl`;

                    db.query(query, function(err, result) {
                        if (Object.keys(result.rows).length !== 0) {
                            data.ruimte.gebiedsaanduidingen = result.rows;
                            }
                        callback();
                    });
                }
            function geluidQuery(callback) {
//                if (id == "SOE00C 04792G0000"){
//                        var geluid = [];
//                        geluid.push({ "naam" : "B&W Besluit", "verwijzingnaartekst": "static/geluid/Hgw Kerkstraat 83A.pdf" });                        
//                        data.geluid = geluid;                    
//                    }
                callback();
                }


            function afvalQuery(callback) {
//                if (id == "SOE00C 04792G0000"){
//                        var asbestbronnen = [];
                        // asbestbronnen.push({ "naam" : "Asbestbronnen", "verwijzingnaartekst": "static/afval/Asbestbronnen-SOE00C%2004792G0000.htm" });                        
//                        data.afval.asbestbronnen = asbestbronnen;                    
//                    }
                callback();
                }

            async.parallel([
                enkelbestemmingenQuery,
                functieaanduidingenQuery,
                bouwvlakQuery,
                bouwaanduidingQuery,
                maatvoeringQuery,
                welstandQuery,
                bomenQuery,
                archeologieQuery,
                cultuurhistorieQuery,
                dubbelbestemmingenQuery,
                gebiedsaanduidingenQuery,
                geluidQuery,
                afvalQuery
            ], function (err, result) {

                 reply(data);
             });

            }
        });

    next();

};

exports.register.attributes = {
    name: 'rapport-route',
    version: '0.0.1'

};
