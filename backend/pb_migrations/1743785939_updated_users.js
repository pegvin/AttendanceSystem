/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "deleteRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "listRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "updateRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")",
    "viewRule": "id = @request.auth.id && (@request.auth.role = \"admin\" || @request.auth.role = \"teacher\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id || @request.auth.role = \"admin\" || @request.auth.role = \"teacher\"",
    "deleteRule": "id = @request.auth.id || @request.auth.role = \"admin\" || @request.auth.role = \"teacher\"",
    "listRule": "id = @request.auth.id || @request.auth.role = \"admin\" || @request.auth.role = \"teacher\"",
    "updateRule": null,
    "viewRule": "id = @request.auth.id || @request.auth.role = \"admin\" || @request.auth.role = \"teacher\""
  }, collection)

  return app.save(collection)
})
