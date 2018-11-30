/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../../../middleware/database.js');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

/* GEMEENTES  UUID
DnFbjAU3pSyh3riDaLp3DH -> utrecht
FkbxDV7Bq19pXpVUXxGQo3 -> eindhoven
U66WmdSZ1Xor9hgsBEhjyo -> masterPass
*/

exports.register = function (server, options, next) {
    function formatArray(array) {
        if (array && array.length) {
            return 'ARRAY'+JSON.stringify(array).replace(/"/g, '\'');
        } else {
            return null;
        }
    }
    function formatObject(obj) {
        return JSON.stringify(obj) || null;
    }

    function formatString(string) {
        if (string) {
            return `'${string}'`;
        } else {
            return null;
        }
    }

    function getUserUUID(uuid) {
        if (!uuid) { //else create a new one
            uuid = uidgen.generateSync();
        }
        return uuid;
    }

    function getProjectOwner(id, callback) {
        console.log(id);
        var query = `SELECT * FROM "kadaster"."projects" WHERE id = '${id}';`;
        db.query(query, function(err, result) {
            callback(result);
        });    
    }

    //example: http://localhost:3003/gebiedscan/projects
    server.route({
        method: 'GET',
        path: '/gebiedscan/projects',
        config: {
            description: 'Retrieves projects',
            tags: ['api']
        },
        handler: function (request, reply) {
            var query = `SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(feature)
            )
            FROM (
              SELECT jsonb_build_object(
                'type',       'Feature',
                'id',         id,
                'geometry',   ST_AsGeoJSON(row.wkb_geometry)::jsonb,
                'properties', to_jsonb(row) - 'id' - 'uuid_user' - 'wkb_geometry'
              ) AS feature
              FROM (SELECT * FROM kadaster.projects) row) features;`;
            db.query(query, function(err, result) {
                var featureCollection = result.rows[0].jsonb_build_object;
                featureCollection.features.map(function(feature) {
                    Object.keys(feature.properties).forEach(function(key) {
                        try {
                            feature.properties[key] = JSON.parse(feature.properties[key]);
                        } catch (error) {
                            return feature;
                        }
                        return feature;
                    });
                });

                reply({'results': result.rows[0].jsonb_build_object, 'responseCode':200});
            });     
        }
    });
    

    server.route({
        method: 'GET',
        path: '/gebiedscan/projects_by_user/{uuid}',
        config: {
            description: 'Retrieves projects',
            tags: ['api'],
            validate: {
                params: {
                    uuid: Joi.string().required().description('user_uuid')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT jsonb_build_object(
                    'type',       'Feature',
                    'id',         id,
                    'geometry',   ST_AsGeoJSON(row.wkb_geometry)::jsonb,
                    'properties', to_jsonb(row) - 'wkb_geometry'
                    ) AS feature
                    FROM (SELECT * FROM kadaster.projects WHERE uuid_user = '${request.params.uuid}') row;`;
            //if user is master then it can get all of the projects
            if (request.params.uuid === 'U66WmdSZ1Xor9hgsBEhjyo') {
                query = `SELECT jsonb_build_object(
                    'type',       'Feature',
                    'id',         id,
                    'geometry',   ST_AsGeoJSON(row.wkb_geometry)::jsonb,
                    'properties', to_jsonb(row) - 'wkb_geometry'
                    ) AS feature
                    FROM (SELECT * FROM kadaster.projects) row;`
            }
            db.query(query, function(err, result) {
                var results = result.rows;
                results.map(function({feature}) {
                    Object.keys(feature.properties).forEach(function(key) {
                        try {
                            feature.properties[key] = JSON.parse(feature.properties[key]);
                        } catch (error) {
                            return feature;
                        }
                        return feature.feature;
                    });
                });

                reply({'results': results, 'responseCode':200});
            });     
        }
    });

    server.route({
        method: 'POST',
        path: '/gebiedscan/project',
        config: {
            description: 'Inserts a project',
            tags: ['api']
        },
        handler: function (request, reply) {
            var data = request.payload;
            
            var uuid = getUserUUID(data.uuid);
            var query = `INSERT INTO "kadaster"."projects" 
            (
                name,
                description,
                short_description,
                category,
                extra_vision,
                start,
                status,
                oplevering,
                author,
                created,
                modified,
                likes_shares,
                architecten,
                nr_participans_wanted,
                interesting_areas,
                hero_image,
                pano_id,
                development_theme,
                woningtypen,
                types_of_participants,
                address,
                contact,
                external,
                wkb_geometry,
                uuid_user
            )
        VALUES 
            (
                ${formatString(data.name)},
                ${formatString(data.description)},
                ${formatString(data.short_description)},
                ${formatString(data.category)},
                ${formatString(data.extra_vision)},
                ${formatString(data.start)},
                ${formatString(data.status)},
                ${formatString(data.oplevering)},
                ${formatString(data.author)},
                ${formatString(data.created)},
                ${formatString(data.modified)},
                ${formatString(data.likes_shares)},
                ${formatString(data.architecten)},
                ${formatString(data.nr_participans_wanted)},
                ${formatArray(data.interesting_areas)},
                ${formatString(data.hero_image)},
                ${formatString(data.pano_id)},
                ${formatArray(data.development_theme)},
                ${formatArray(data.woningtypen)},
                ${formatArray(data.types_of_participants)},
                ${formatString(JSON.stringify(data.address))},
                ${formatString(JSON.stringify(data.contact))},
                ${formatString(JSON.stringify(data.external))},
                ST_GeomFromText(ST_AsText(ST_GeomFromGeoJSON('${formatObject(data.wkb_geometry)}')), 4326),
                '${uuid}'
            )`

            db.query(query, function(err, result) {
                if (result) {
                    reply({'result': {user_uuid:uuid} || err.error, 'responseCode':200});
                } else {
                    reply({error: err, 'responseCode':500});
                }
            });     
        }
    });

    server.route({
        method: 'POST',
        path: '/gebiedscan/projects',
        config: {
            description: 'Inserts projects in bulk',
            tags: ['api']
        },
        handler: function (request, reply) {
            var data = request.payload;
            var features = data.geojson.features;
            var uuid = getUserUUID(data.uuid);
            var mappings = data.fieldMappings;
            let values = [];
            var query = `INSERT INTO "kadaster"."projects" 
                (
                    name,
                    description,
                    short_description,
                    category,
                    extra_vision,
                    start, 
                    status,
                    oplevering,
                    author,
                    created,
                    modified,
                    likes_shares,
                    architecten,
                    nr_participans_wanted,
                    interesting_areas,
                    hero_image,
                    pano_id,
                    development_theme,
                    woningtypen,
                    types_of_participants,
                    address,
                    contact,
                    external,
                    wkb_geometry,
                    uuid_user
                ) VALUES `;

            features.forEach(function(feature) {
                values.push([
                    formatString(feature.properties[mappings.name]),
                    formatString(feature.properties[mappings.description]),
                    formatString(feature.properties[mappings.short_description]),
                    formatString(feature.properties[mappings.category]),
                    formatString(feature.properties[mappings.extra_vision]),
                    formatString(feature.properties[mappings.start]),
                    formatString(feature.properties[mappings.status]),
                    formatString(feature.properties[mappings.oplevering]),
                    formatString(feature.properties[mappings.author]),
                    formatString(feature.properties[mappings.created]),
                    formatString(feature.properties[mappings.modified]),
                    formatString(feature.properties[mappings.likes_shares]),
                    formatString(feature.properties[mappings.architecten]),
                    formatString(feature.properties[mappings.nr_participans_wanted]),
                    formatArray(feature.properties[mappings.interesting_areas]),
                    formatString(feature.properties[mappings.hero_image]),
                    formatString(feature.properties[mappings.pano_id]),
                    formatArray(feature.properties[mappings.development_theme]),
                    formatArray(feature.properties[mappings.woningtypen]),
                    formatArray(feature.properties[mappings.types_of_participants]),
                    formatString(JSON.stringify(feature.properties[mappings.address])),
                    formatString(JSON.stringify(feature.properties[mappings.contact])),
                    formatString(JSON.stringify(feature.properties[mappings.nr_participans_wanted])),
                    `ST_GeomFromText(ST_AsText(ST_GeomFromGeoJSON('${formatObject(feature.geometry)}')), 4326)`,
                    formatString(uuid)
                ])
            });

            values.forEach(function(feature) {
                query = query.concat('(');
                feature.forEach(function(value){
                    query = query.concat(value + ',');
                });
                query = query.substring(0,query.length-1);
                query = query.concat('),');
            });
            query = query.substring(0,query.length-1);

            db.query(query, function(err, result) {
                if (result) {
                    reply({'result': 'ok' || err.error, 'responseCode':200});
                } else {
                    reply({error: err, 'responseCode':500});
                }
            });     
        }
    });

    server.route({
        method: 'PUT',
        path: '/gebiedscan/project',
        config: {
            description: 'Updates a project',
        },
        handler: function (request, reply) {
            var data = request.payload;
            console.log('data: ', data);
            var query = `
            UPDATE "kadaster"."projects" SET
            name=${formatString(data.name)},
            description=${formatString(data.description)},
            short_description=${formatString(data.short_description)},
            category=${formatString(data.category)},
            extra_vision=${formatString(data.extra_vision)},
            start=${formatString(data.start)},
            status=${formatString(data.status)},
            oplevering=${formatString(data.oplevering)},
            author=${formatString(data.author)},
            created=${formatString(data.created)},
            modified=${formatString(data.modified)},
            likes_shares=${formatString(data.likes_shares)},
            architecten=${formatString(data.architecten)},
            nr_participans_wanted=${formatString(data.nr_participans_wanted)},
            interesting_areas=${formatArray(data.interesting_areas)},
            hero_image=${formatString(data.hero_image)},
            pano_id=${formatString(data.pano_id)},
            development_theme=${formatArray(data.development_theme)},
            woningtypen=${formatArray(data.woningtypen)},
            types_of_participants=${formatArray(data.types_of_participants)},
            address=${formatString(JSON.stringify(data.address))},
            contact=${formatString(JSON.stringify(data.contact))},
            external=${formatString(JSON.stringify(data.external))}
            WHERE id = ${data.id}`

            console.log('query: ', query);
            db.query(query, function(err, result) {
                console.log('result: ', result);
                console.log('err: ', err);
                if (result) {
                    reply({'result': 'project successfuly updated' || err.error, 'responseCode':200});
                } else {
                    reply({error: err, 'responseCode':500});
                }
            });     
        }
    });

    server.route({
        method: 'DELETE',
        path: '/gebiedscan/project/{id}',
        config: {
            description: 'Deletes a project',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().required().description('id')
                }
            }
        },
        handler: function (request, reply) {
            /*
                getProjectOwner(request.params.id, function(owner) {
                    //we should extend this so only owners of the project and the gemeentes in which the project is contained can delete the project. 
                    //Master user should be able to delete a project as well
                    console.log(owner.rows);
                });
            */
            var query = `DELETE FROM kadaster.projects WHERE id = ${request.params.id}`;

            db.query(query, function(err, result) {
                if (result && result.rows.length) {
                    reply({'result': 'project successfuly deleted', 'responseCode':200});
                } else {
                    reply({error: err || 'No projects with that id', 'responseCode':500});
                }
            });     
        }
    });

    server.route({
        method: 'POST',
        path: '/gebiedscan/likeProject/{id}',
        config: {
            description: 'Adds a like to a project',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().required().description('id')
                }
            }
        },
        handler: function (request, reply) {
            var query = `UPDATE kadaster.projects SET likes = likes + 1 WHERE id = ${request.params.id}`;
            db.query(query, function(err, result) {
                if (result) {
                    reply({'result': 'project successfuly liked', 'responseCode':200});
                } else {
                    reply({error: err, 'responseCode':500});
                }
            });     
        }
    });

    next();

};

exports.register.attributes = {
    name: 'projects',
    version: '0.0.1'
};
