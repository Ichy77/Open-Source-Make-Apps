function transformToMappableParameters(properties) {
    let mappableParameters = [];

    for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
            const prop = properties[key];
            let parameter = {
                name: key,
                label: prop.title || key,
                required: prop.frontend_metadata?.required || false
            };
            if (prop.description) {
                parameter.help = prop.description
            }

            switch (prop.type) {
                case 'string':
                    if (prop.enum) {
                        parameter.type = 'select';
                        parameter.options = prop.enum.map(value => ({ label: value, value }));
                    } else {
                        parameter.type = 'text';
                    }
                    if (prop.metadata && prop.metadata.accepted_file_types) {
                        parameter.help = parameter.help + " Accepted File Types: " + prop.metadata.accepted_file_types
                    }
                    break;
                case 'number':
                    parameter.type = 'number';
                    break;
                case 'boolean':
                    parameter.type = 'boolean';
                    break;
                case 'array':
                    if (prop.items && prop.items.type === 'string') {
                        parameter.type = 'array';
                        parameter.spec = {
                            "type": "text",
                            "label": (prop.title || key) + " item"
                        }
                    } else if (prop.items && prop.items.type === 'object') {
                        if (prop.metadata && prop.metadata.content_type === 'table') {
                            parameter.type = "array";
                            parameter.spec = prop.metadata.headers.map(header => ({
                                "name": header,
                                "type": "text",
                                "label": header
                            }));
                        }
                    } else {
                        parameter.type = "array";
                        parameter.spec = {
                            "type": "any",
                            "label": (prop.title || key) + " item"
                        }
                    }
                    break;
                case 'object':
                    parameter.type = 'any';
                    break;
                default:
                    parameter.type = 'any';
                    break;
            }

            mappableParameters.push(parameter);
        }
    }
    return mappableParameters;
}
