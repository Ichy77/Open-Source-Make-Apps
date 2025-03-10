function generateTableInterface(tableName, apiDocumentation) {
    const schema = apiDocumentation.definitions[tableName];

    if (!schema || !schema.properties) {
      console.warn(`Schema not found for table: ${tableName}`);
      return [];
    }
  
    const interfaceFields = [];
    for (const key in schema.properties) {
      if (schema.properties.hasOwnProperty(key)) {
        const property = schema.properties[key];
        let type = property.type;
  
        // Map types to more generic interface types (text, number, boolean)
        switch (type) {
          case 'string':
            type = 'text';
            break;
          case 'integer':
            type = 'number';
            break;
          case 'boolean':
            type = 'boolean';
            break;
          default:
            type = 'text'; // Default to text if the type is unknown
        }
  
        interfaceFields.push({
          name: key,
          type: type,
          label: key // Use key as label, or customize as needed
        });
      }
    }
  
    return interfaceFields;
  }