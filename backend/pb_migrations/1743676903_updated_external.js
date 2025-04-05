/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_404552097")

  // update collection data
  unmarshal({
    "name": "viewers"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_404552097")

  // update collection data
  unmarshal({
    "name": "external"
  }, collection)

  return app.save(collection)
})
