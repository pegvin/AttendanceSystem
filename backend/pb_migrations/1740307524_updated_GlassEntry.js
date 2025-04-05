/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // remove field
  collection.fields.removeById("number1449871589")

  return app.save(collection)
})
