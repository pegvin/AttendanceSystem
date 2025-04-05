/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update field
  collection.fields.addAt(6, new Field({
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
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number1449871589",
    "max": null,
    "min": null,
    "name": "NumId",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
