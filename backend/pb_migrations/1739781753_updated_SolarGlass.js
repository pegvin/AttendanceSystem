/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select1256376349",
    "maxSelect": 1,
    "name": "glassType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "SoG",
      "ShG",
      "BIPV",
      "FG",
      "AG",
      "DG",
      "GhG",
      "WG"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // remove field
  collection.fields.removeById("select1256376349")

  return app.save(collection)
})
