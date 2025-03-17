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
        
        // Check if property is an enum type
        if (property.type === 'string' && property.enum && Array.isArray(property.enum)) {
          makeType = 'select';
          
          // If property has a default value, it shouldn't be required
          const required = property.default ? false : (schema.required && schema.required.includes(key));
          
          // Add default value to help text if it exists
          let helpText = '';
          if (property.default) {
            helpText = `Defaults to ${property.default}. `;
          }
          helpText += property.description || '';
          
          const parameter = {
            name: key,
            label: key,
            type: makeType,
            required: required,
            help: helpText,
            options: property.enum.map(value => ({
              value: value,
              label: value
            }))
          };
          
          parameters.push(parameter);
          continue; // Skip the rest of the loop for enum types
        }
  
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
  
        // If property has a default value, it shouldn't be required
        const required = property.default ? false : (schema.required && schema.required.includes(key));
  
        // Add default value to help text if it exists
        let helpText = '';
        if (property.default) {
          helpText = `Defaults to ${property.default}. `;
        }
        helpText += property.description || '';
  
        const parameter = {
          name: key,
          label: key,
          type: makeType,
          required: required,
          help: helpText
        };
  
  
        parameters.push(parameter);
      }
    }
  
    return parameters;
  }