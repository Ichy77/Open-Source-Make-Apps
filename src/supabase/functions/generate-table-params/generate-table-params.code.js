function generateTableParams(tableName, apiDocumentation) {
    const schema = apiDocumentation.definitions[tableName];

    if (!schema || !schema.properties) {
      console.warn(`Schema not found for table: ${tableName}`);
      return [];
    }
  
    const parameters = [];
    for (const key in schema.properties) {
      if (schema.properties.hasOwnProperty(key)) {
        const property = schema.properties[key];
        let supabaseType = property.type; // the type from the supabase schema
        let makeType;
        
  
        // Map Supabase types to Make.com types
        switch (property.format) {
          case 'date':
            makeType = 'date';
            break;
        case 'time without time zone':
        case 'time with time zone':
            makeType = 'time';
            break;
          case 'timestamp without time zone':
          case 'timestamp with time zone':
            makeType = 'text';
            break;
          case 'bigint':
          case 'smallint':
          case 'integer':
            makeType = 'integer';
            break;
          case 'double precision':
          case 'real':
          case 'numeric':
            makeType = 'number';
            break;
          case 'bytea':
            makeType = 'buffer';
            break;
          case 'boolean':
            makeType = 'boolean';
            break;
          default:
            makeType = 'text'; // Default to text if the type is unknown
        }
  
        const required = schema.required && schema.required.includes(key);
  
        const parameter = {
          name: key,
          label: key,
          type: makeType,
          required: required,
          help: property.description || ''
        };
  
  
        parameters.push(parameter);
      }
    }
  
    return parameters;
  }