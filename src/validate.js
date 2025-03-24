import Ajv from 'ajv';

import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  required: ["businessName", "gstin", "directors", "creditScore", "loanAmount"],
  properties: {
    businessName: { type: "string", minLength: 3 },
    gstin: { type: "string", pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$" },
    directors: {
      type: "array",
      minItems: 1,
        items: {
          type: "object",
          required: ["name", "panNo", "tags"],
          properties: {
            name: { "type": "string" },
            panNo: { 
              type: "string", 
              pattern: "^[A-Z]{5}[0-9]{4}[A-Z]$" 
            },
            tags: {
              type: "array",
              minItems: 1,
              items: {
                type: "string",
                required: ["role"],
                properties: ["role", 'authorizedSignatory']
              }
            }
          }
        }
      },    
    creditScore: { type: "number"},
    loanAmount: { type: "number", minimum: 50000, maximum: 500000 },
  },
};

const validate = ajv.compile(schema);

export const validateSchema = (data) => {
  const valid = validate(data);
  return valid ? { valid: true } : { valid: false, errors: validate.errors };
}

