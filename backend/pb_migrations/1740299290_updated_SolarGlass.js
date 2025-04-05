/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "Created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // update field
  collection.fields.addAt(2, new Field({
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
  }))

  // update field
  collection.fields.addAt(3, new Field({
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
  }))

  // update field
  collection.fields.addAt(4, new Field({
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
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json2918445923",
    "maxSize": 0,
    "name": "Data",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "regular",
      "r&d",
      "sample"
    ]
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select1256376349",
    "maxSelect": 1,
    "name": "glassType",
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
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number408428390",
    "max": null,
    "min": 1,
    "name": "burners",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json2918445923",
    "maxSize": 0,
    "name": "data",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
