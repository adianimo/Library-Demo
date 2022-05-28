const jsonschema = require('jsonschema')
const { UnauthorizedError} = require("./ExpressError");
/* Sub-function using jsonschema and schema types to validate data body
Throws UnauthorizedError if invalid */
function validSchema(body, schema) {
    const validator = jsonschema.validate(body, schema);
    if (!validator.valid) {
      const errors = validator.errors.map(e => e.stack);
      throw new UnauthorizedError(errors);
    }
}

module.exports = validSchema;