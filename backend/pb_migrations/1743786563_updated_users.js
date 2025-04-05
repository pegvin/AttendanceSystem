/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "deleteRule": "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "listRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "(@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "deleteRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "listRule": "id = @request.auth.id",
    "updateRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "viewRule": "id = @request.auth.id"
  }, collection)

  return app.save(collection)
})
