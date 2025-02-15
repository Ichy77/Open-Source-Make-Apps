function removeEmptyColorPalette(parameters) {
    // Create a copy of the parameters to avoid modifying the original
    let params = JSON.parse(JSON.stringify(parameters));

    // Check if color_palette exists and is empty or only has preSetOrCustom
    if (params.color_palette) {
        if (Object.keys(params.color_palette).length === 0 || 
            (Object.keys(params.color_palette).length === 1 && 'preSetOrCustom' in params.color_palette)) {
            delete params.color_palette;
        } else {
            // Remove preSetOrCustom parameter if it exists
            delete params.color_palette.preSetOrCustom;
        }
    }

    return params;
}
