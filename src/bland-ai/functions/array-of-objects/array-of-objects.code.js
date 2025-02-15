function arrayOfObjects(input) {

    var output = input.map(obj => [obj.question, obj.expected_answer]);

    return output;
}