/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.collectionName = \"admins\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "CreatedOn",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "select2363381545",
        "maxSelect": 1,
        "name": "EntryType",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "Regular",
          "R&D",
          "Sample"
        ]
      },
      {
        "hidden": false,
        "id": "select1256376349",
        "maxSelect": 1,
        "name": "GlassType",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "SoG",
          "ShG",
          "BIPV-G",
          "FG",
          "AG",
          "DG",
          "GhG",
          "WG"
        ]
      },
      {
        "hidden": false,
        "id": "number408428390",
        "max": null,
        "min": 1,
        "name": "Burners",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json2918445923",
        "maxSize": 0,
        "name": "Data",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "number1449871589",
        "max": null,
        "min": 0,
        "name": "NumId",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_579475552",
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "name": "GlassEntry",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  });

  return app.save(collection);
})
