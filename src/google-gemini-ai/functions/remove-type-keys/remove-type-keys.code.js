function removeTypeKeys(json) {
    // Iterate over each item in the contents array
    json.contents.forEach(content => {
        // Iterate over each part in the parts array
        content.parts.forEach(part => {
            // Delete the 'type' key from each part object, if it exists
            delete part.type;
        });
    });

    return json;
}
