/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // add field
  collection.fields.addAt(5, new Field({
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_579475552")

  // remove field
  collection.fields.removeById("number408428390")

  return app.save(collection)
})
