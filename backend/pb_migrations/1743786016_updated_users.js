/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "viewRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")"
  }, collection)

  return app.save(collection)
})
