function transformInput(input) {
    // Initialize the output object by copying all properties from the input
    var output = {...input};

    // Loop through the text_prompts array
    for(var i = 0; i < input.text_prompts.length; i++) {
        // Add the text and weight properties to the output object
        output["text_prompts[" + i + "][text]"] = input.text_prompts[i].text;
        output["text_prompts[" + i + "][weight]"] = input.text_prompts[i].weight;
    }

    // Delete the original text_prompts property from the output
    delete output.text_prompts;

    return output;
}